// pages/notice/list.js
const api = require('../../utils/api.js');

Page({
  data: {
    list: []
  },
  onLoad() {
    this.load();
  },
  load() {
    api.getNotices().then((list) => this.setData({ list }));
  },
  onTap(e) {
    wx.navigateTo({ url: '/pages/notice/detail?id=' + e.currentTarget.dataset.id });
  }
});
