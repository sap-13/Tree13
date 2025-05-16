module.exports = function(collections) {
  // In Eleventy 3.0, we need to use collections.getAll() first
  const allItems = collections.getAll ? collections.getAll() : [];
  
  // Then filter for posts
  let blogposts = allItems.filter(item => {
    return item.data.tags && item.data.tags.includes('post');
  });
  
  // Create the search index
  return blogposts.map(post => {
    return {
      title: post.data.title,
      url: post.url,
      content: post.templateContent?.replace(/<[^>]*>/g, '') || '', // Strip HTML tags with null check
      tags: post.data.tags ? post.data.tags.filter(tag => tag !== 'post') : [], // Filter out the 'post' tag
      date: post.date.toISOString().slice(0, 10)
    };
  });
}; 