const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = async (ctx, next) => {
  const token = String(ctx.request.header.authorization || '').replace(
    'Bearer ',
    ''
  );

  ctx.assert(token, 401, '请先登录');

  ctx.state.user = jwt.verify(token, secret);

  ctx.assert(ctx.state.user, 401, '请先登录');

  await next();
};
