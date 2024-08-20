const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  let mostLikedBlog = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > mostLikedBlog.likes) {
      mostLikedBlog = blog;
    }
  });

  return mostLikedBlog;
};

const authorWithMostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  let blogsByAuthor = Object.groupBy(blogs, ({ author }) => author);

  let mostBlogsAuthor = Object.values(blogsByAuthor)[0];

  for (const [key, value] of Object.entries(blogsByAuthor)) {
    if (mostBlogsAuthor.length < blogsByAuthor[key].length)
      mostBlogsAuthor = blogsByAuthor[key];
  }

  return { author: mostBlogsAuthor[0].author, blogs: mostBlogsAuthor.length };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
};
