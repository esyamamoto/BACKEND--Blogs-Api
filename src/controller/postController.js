const { insertPost } = require('../services/postService');

const postController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = Number(req.user.id);
  const post = await insertPost({ 
    title, 
    content,
    categoryIds,
    userId,
  });
  return res.status(201).json(post);
};

module.exports = {
  postController,
};
