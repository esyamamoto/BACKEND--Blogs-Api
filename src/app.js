const express = require('express');
const { validateLogin } = require('./middlewares/validateLogin');
const { loginController } = require('./controller/loginController');
const { validateUser } = require('./middlewares/validateUser');
const { userController } = require('./controller/userController');

const app = express();

app.use(express.json());

app.post('/login', validateLogin, loginController);

app.post('/user', validateUser, userController);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
