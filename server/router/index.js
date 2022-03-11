const Router = require('koa-router');
const router = new Router();
const adminRouter = require('./admin');

router.use('/api/admin', adminRouter.routes());

module.exports = router;
