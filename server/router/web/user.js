const Router = require('koa-router');
const user = new Router();
const schema = require('../../model/web/User');

user.get('/', (ctx, next) => {
  ctx.assert(true, 400, 'sorry');
  ctx.body = 'yes';
});

module.exports = user;
