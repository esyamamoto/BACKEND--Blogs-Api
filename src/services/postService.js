const { Sequelize } = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const createSAvePostService = ({ title, content, categoryIds, userId }) => {
  const post = BlogPost
    .create(
      { 
        title, 
        content, 
        categoryIds, 
        userId,
      },
    );
  return post;
};  
  
// novo post com suas categorias associadas
const insertPost = async ({ title, content, categoryIds, userId }) => {
  const result = await sequelize.transaction(async (data) => {
    const newPost = await BlogPost.create(
      {
        title,
        content,
        userId,
        updated: new Date(),
        published: new Date() }, 
      { transaction: data },
    );
          
    const postId = newPost.id;
          
    await Promise.all(categoryIds.map(async (categoryId) => {
      await PostCategory.create({ postId, categoryId }, { transaction: data }); 
    }));
          
    return newPost;
  });
        
  return result;
};
const postServiceAll = () => BlogPost.findAll();
      
const postServiceByCategoryId = (id) => BlogPost.findOne(id);
      
module.exports = {
  postServiceAll,
  postServiceByCategoryId,
  createSAvePostService,
  insertPost,
};
