const Router = require('koa-router');
const data = new Router();
const schema = require('../../model/web/Data');

data.get('/', async (ctx, next) => {
  let model = [];

  if (ctx.query.page) {
    model = await schema
      .find({ user: ctx.state.user.id })
      .populate('user', { username: 1 })
      .skip((ctx.query.page - 1) * 10)
      .limit(10)
      .sort({ _id: -1 });
  } else {
    model = await schema
      .find()
      .populate('user', { username: 1 })
      .limit(10)
      .sort({ _id: -1 });
  }
  const count = await schema.count();
  ctx.body = {
    total: count,
    data: model,
  };
});

data.post('/', async (ctx, next) => {
  const searchModel = {
    user: ctx.state.user.id,
  };
  const { phone, customer, creatTime } = ctx.request.body;
  if (phone && phone != '') {
    searchModel.phone = phone;
  }
  if (customer && customer != '') {
    searchModel.customer = customer;
  }
  if (creatTime && creatTime != 0) {
    searchModel.creatTime = creatTime;
  }

  const model = await schema
    .find(searchModel)
    .populate('user', { username: 1 })
    .skip((ctx.request.body.page - 1) * 10)
    .limit(10)
    .sort({ _id: -1 });
  const count = await schema.find(searchModel).count();

  ctx.body = {
    total: count,
    data: model,
  };
});

data.put('/', async (ctx, next) => {
  const { _id, phone, customer } = ctx.request.body;
  if (_id) {
    await schema.findByIdAndUpdate(_id, {
      phone,
      customer,
    });
    ctx.body = { message: '修改成功！' };
  } else {
    await schema.create({
      phone,
      customer,
      user: ctx.state.user.id,
    });
    ctx.body = { message: '添加成功！' };
  }
});

data.del('/', async (ctx, next) => {
  console.log(ctx.query);
  await schema.findByIdAndDelete(ctx.query._id);

  ctx.body = { message: '删除成功!' };
});

module.exports = data;
