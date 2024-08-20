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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogsByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  let mostBlogsAuthor = { author: null, blogs: 0 };

  for (const [author, blogs] of Object.entries(blogsByAuthor)) {
    if (blogs > mostBlogsAuthor.blogs) {
      mostBlogsAuthor = { author, blogs };
    }
  }

  return mostBlogsAuthor;
};

const mostLikes = (blogs) => {
  const likesByAuthor = {};

  blogs.forEach((blog) => {
    if (likesByAuthor[blog.author]) {
      likesByAuthor[blog.author] += blog.likes;
    } else {
      likesByAuthor[blog.author] = blog.likes;
    }
  });

  let maxLikes = 0;
  let mostLikedAuthor = null;

  for (const author in likesByAuthor) {
    if (likesByAuthor[author] > maxLikes) {
      maxLikes = likesByAuthor[author];
      mostLikedAuthor = author;
    }
  }

  return {
    author: mostLikedAuthor,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
