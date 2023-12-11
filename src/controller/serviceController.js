const { insertPost } = require('../services/postService');

// Controller pra lidar com a criação novo post
const createPostController = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = Number(req.user.id);

  try {
    const newPost = await insertPost({ 
      title, 
      content,
      categoryIds,
      userId,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error('Error in createPostController:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPostController,
};
