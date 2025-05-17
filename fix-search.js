// Script to modify search-related files

const fs = require('fs');
const path = require('path');

// Path to search index
const searchIndexPath = path.join(__dirname, 'my-blog', '_site', 'searchIndex.json');
// Path to search page
const searchPagePath = path.join(__dirname, 'my-blog', '_site', 'search', 'index.html');

// Fix search index
console.log('Fixing search index...');
try {
  const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
  
  // Make sure all URLs in the search index have the /Tree13/ prefix
  searchIndex.forEach(item => {
    if (item.url && !item.url.startsWith('/Tree13/')) {
      item.url = '/Tree13' + item.url;
      console.log(`Fixed URL: ${item.url}`);
    }
  });
  
  // Write the fixed search index back
  fs.writeFileSync(searchIndexPath, JSON.stringify(searchIndex, null, 2));
  console.log('Search index fixed successfully');
} catch (err) {
  console.error('Error fixing search index:', err);
}

// Fix search page
console.log('Fixing search page...');
try {
  let searchPageContent = fs.readFileSync(searchPagePath, 'utf8');
  
  // Update the searchIndexPath in the JavaScript to use the correct path
  searchPageContent = searchPageContent.replace(
    /searchIndexPath = '\/Tree13\/searchIndex\.json';/g, 
    "searchIndexPath = '/Tree13/searchIndex.json';"
  );
  
  // Replace any remaining instances of /Tree13/my-blog/_site/ with just /Tree13/
  searchPageContent = searchPageContent.replace(/\/Tree13\/my-blog\/_site\//g, '/Tree13/');
  
  // Write the fixed search page back
  fs.writeFileSync(searchPagePath, searchPageContent);
  console.log('Search page fixed successfully');
} catch (err) {
  console.error('Error fixing search page:', err);
}

console.log('All search fixes applied'); 