// pages/notice/detail.js
const api = require('../../utils/api.js');

Page({
  data: {
    notice: null
  },
  onLoad(opt) {
    api.getNoticeById(opt.id).then((n) => this.setData({ notice: n }));
  },
  back() {
    wx.navigateBack();
  }
});
