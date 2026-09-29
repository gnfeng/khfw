// pages/course/detail.js
const api = require('../../utils/api.js');

Page({
  data: {
    id: '',
    isEdit: false,
    form: {
      name: '',
      type: '特色课',
      teacher: '',
      location: '',
      gradeScope: '',
      capacity: 0,
      weekday: '',
      timeSlot: '',
      weeks: 16
    }
  },
  onLoad(opt) {
    const id = opt.id || '';
    this.setData({ id });
    if (id) {
      this.setData({ isEdit: true });
      api.getCourseById(id).then((c) => {
        if (c) this.setData({ form: c });
      });
    }
  },
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ ['form.' + field]: e.detail.value });
  },
  onType(e) {
    this.setData({ 'form.type': e.detail.value });
  },
  save() {
    const f = this.data.form;
    if (!f.name) {
      wx.showToast({ title: '请填写课程名称', icon: 'none' });
      return;
    }
    // 演示：接入后端后改为 api.updateCourse / api.createCourse
    wx.showToast({
      title: this.data.isEdit ? '已保存修改' : '已新增课程',
      icon: 'success'
    });
    setTimeout(() => wx.navigateBack(), 800);
  }
});
