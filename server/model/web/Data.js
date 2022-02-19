const mongoose = require('mongoose');
const { monitorEventLoopDelay } = require('perf_hooks');

const schema = new mongoose.Schema(
  {
    phone: { type: String },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    customer: { type: String },
    creatTime: { type: Number },
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: () => {
        const d = new Date(Date.now());
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return new Date(d.toLocaleDateString()).getTime();
      },
      createdAt: 'creatTime',
    },
  }
);

module.exports = mongoose.model('Data', schema);
