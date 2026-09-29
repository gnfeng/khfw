// pages/course/list.js
const api = require('../../utils/api.js');

Page({
  data: {
    courses: []
  },
  onLoad() {
    this.load();
  },
  onShow() {
    this.load();
  },
  load() {
    api.getCourses().then((list) => {
      this.setData({ courses: list });
    });
  },
  onTapCourse(e) {
    const id = e.detail.id;
    wx.navigateTo({ url: '/pages/course/detail?id=' + id });
  },
  goAdd() {
    wx.navigateTo({ url: '/pages/course/detail' });
  }
});
