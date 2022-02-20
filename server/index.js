const Koa = require('koa');
const { port } = require('./config');
const koaBody = require('koa-body');
const static = require('koa-static');
const cors = require('@koa/cors');
const router = require('./router');

const app = new Koa();
require('./utils/db')();
app.use(cors());
app.use(koaBody());

app.use(router.routes()).use(router.allowedMethods());
app.use(static(__dirname + '/public/'));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
