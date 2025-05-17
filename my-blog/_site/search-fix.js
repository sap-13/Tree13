// Fix for search functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Search fix script running...');
  
  // Fix the search index path
  try {
    // Create a simple fetch request to the correct search index path
    fetch('/Tree13/searchIndex.json')
      .then(response => {
        console.log('Search index fetch response:', response.status);
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to load search index from main path');
          // Try direct path as fallback
          return fetch('searchIndex.json');
        }
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          console.log('Search data loaded successfully:', data.length, 'items');
          
          // Store the data in a global variable
          window.searchData = data;
          
          // Update the UI to show search is ready
          const noResults = document.getElementById('no-results');
          if (noResults) {
            noResults.textContent = 'Type to search...';
          }
          
          // Hook up the search input
          const searchInput = document.getElementById('search-input');
          if (searchInput) {
            searchInput.addEventListener('input', performSearch);
          }
          
          // Extract all unique tags
          const allTags = [...new Set(data.flatMap(post => post.tags || []))];
          console.log('Available tags:', allTags);
          
          // Add tag buttons
          const tagFiltersContainer = document.getElementById('tag-filters');
          if (tagFiltersContainer) {
            allTags.forEach(tag => {
              const tagBtn = document.createElement('button');
              tagBtn.className = 'px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition inline-flex items-center text-xs';
              tagBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                ${tag}
              `;
              tagBtn.addEventListener('click', function() {
                this.classList.toggle('bg-blue-600');
                this.classList.toggle('bg-gray-800');
                performSearch();
              });
              tagFiltersContainer.appendChild(tagBtn);
            });
          }
        }
      })
      .catch(err => {
        console.error('Error loading search index:', err);
      });
  } catch (e) {
    console.error('Error in search fix script:', e);
  }
  
  // Simple search function
  function performSearch() {
    try {
      const searchInput = document.getElementById('search-input');
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      const resultsContainer = document.getElementById('results-container');
      const noResults = document.getElementById('no-results');
      const tagFilters = document.querySelectorAll('#tag-filters .bg-blue-600');
      const selectedTags = Array.from(tagFilters).map(el => el.textContent.trim());
      
      if (!window.searchData || !resultsContainer) {
        console.error('Search data or results container not available');
        return;
      }
      
      // Filter the search data
      let results = window.searchData;
      
      // Filter by tags if any selected
      if (selectedTags.length > 0) {
        results = results.filter(item => {
          return item.tags && selectedTags.some(tag => 
            item.tags.some(itemTag => itemTag.toLowerCase() === tag.toLowerCase())
          );
        });
      }
      
      // Filter by query if entered
      if (query) {
        results = results.filter(item => {
          return item.title.toLowerCase().includes(query) || 
                 item.content.toLowerCase().includes(query);
        });
      }
      
      // Show results
      if (results.length === 0) {
        if (noResults) {
          noResults.textContent = 'No results found';
          noResults.style.display = 'block';
        }
        if (resultsContainer) {
          resultsContainer.innerHTML = '';
        }
      } else {
        if (noResults) {
          noResults.style.display = 'none';
        }
        
        // Build results HTML
        let resultsHTML = '';
        results.forEach(result => {
          resultsHTML += `
            <article class="mb-8 pb-8 border-b border-gray-800">
              <h2 class="text-2xl font-bold mb-3">
                <a href="${result.url}" class="text-blue-400 hover:text-blue-300 transition">
                  ${result.title}
                </a>
              </h2>
              <div class="text-gray-400 text-sm mb-3">
                ${result.date}
              </div>
              <p class="text-gray-300 mb-4">
                ${result.excerpt || result.content.substring(0, 150) + '...'}
              </p>
              <div>
                ${result.tags && result.tags.length > 0 ? 
                  result.tags.map(tag => 
                    `<span class="inline-block bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs mr-2">${tag}</span>`
                  ).join('') : ''}
              </div>
            </article>
          `;
        });
        
        if (resultsContainer) {
          resultsContainer.innerHTML = resultsHTML;
        }
      }
    } catch (e) {
      console.error('Error in performSearch:', e);
    }
  }
  
  // Initialize
  window.performSearch = performSearch;
}); 