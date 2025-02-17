const blogsRouter = require("express").Router();
const Blog = require("../models/blogs.js");
const logger = require("../utils/logger.js")

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((notes) => {
    response.json(notes);
  });
});

blogsRouter.post("/", (request, response, next) => {
  const body = request.body;

  //logger.info(body.content)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  newBlog
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
