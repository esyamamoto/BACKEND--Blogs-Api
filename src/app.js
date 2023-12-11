const express = require('express');
const { validateLogin } = require('./middlewares/validateLogin');
const { loginController } = require('./controller/loginController');
const { validateUser } = require('./middlewares/validateUser');
const { 
  userController, 
  userControllerFind, 
  userControllerFindById } = require('./controller/userController');
const { tokenOK } = require('./middlewares/validateToken');
const { categoryController, controllerCategoryFind } = require('./controller/categoryController');
const { postOK } = require('./middlewares/validatePost');
const { postController } = require('./controller/postController');

const app = express();

app.use(express.json());

app.post('/login', validateLogin, loginController);

app.post('/user', validateUser, userController);

app.get('/user', tokenOK, userControllerFind);

app.get('/user/:id', tokenOK, userControllerFindById);

app.post('/categories', tokenOK, categoryController);

app.get('/categories', tokenOK, controllerCategoryFind);

app.post('/post', tokenOK, postOK, postController);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
