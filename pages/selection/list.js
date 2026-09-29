// pages/selection/list.js
const api = require('../../utils/api.js');

Page({
  data: {
    list: [],
    display: [],
    filter: 'all'
  },
  onShow() {
    this.load();
  },
  load() {
    api.getSelections().then((list) => {
      this.setData({ list }, () => this.applyFilter());
    });
  },
  applyFilter() {
    const f = this.data.filter;
    const display = f === 'all' ? this.data.list : this.data.list.filter((i) => i.status === f);
    this.setData({ display });
  },
  onFilter(e) {
    this.setData({ filter: e.currentTarget.dataset.f }, () => this.applyFilter());
  },
  goAdd() {
    wx.navigateTo({ url: '/pages/selection/form' });
  }
});
