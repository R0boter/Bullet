const Router = require('koa-router');
const web = new Router();
const register = require('./register');
const login = require('./login');
const user = require('./user');
const data = require('./data');

const auth = require('../../middleware/auth');

web.use('/register', register.routes());
web.use('/login', login.routes());
web.use('/user', auth, user.routes());
web.use('/data', auth, data.routes());

module.exports = web;
