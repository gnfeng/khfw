// pages/index/index.js
const api = require('../../utils/api.js');
const app = getApp();

Page({
  data: {
    schoolName: '',
    contact: '',
    stats: { courses: 0, selections: 0, notices: 0 }
  },
  onLoad() {
    const g = app.globalData;
    this.setData({
      schoolName: g.schoolName,
      contact: g.contactName + ' ' + g.contactPhone
    });
  },
  onShow() {
    Promise.all([api.getCourses(), api.getSelections(), api.getNotices()]).then(
      ([c, s, n]) => {
        this.setData({
          stats: { courses: c.length, selections: s.length, notices: n.length }
        });
      }
    );
  },
  go(e) {
    const url = e.currentTarget.dataset.url;
    wx.switchTab({ url });
  }
});
