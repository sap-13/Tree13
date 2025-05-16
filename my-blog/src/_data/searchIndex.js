module.exports = function(collection) {
  // Get all blog posts - updated for Eleventy 3.0
  let blogposts = collection.filter(item => {
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