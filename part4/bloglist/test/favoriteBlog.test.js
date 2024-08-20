const { test, describe } = require("node:test");
const assert = require("node:assert");

const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("most liked blog", () => {
  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 2,
    },
  ];

  test("most liked blog", () => {
    assert.deepStrictEqual(favoriteBlog(blogs), {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
