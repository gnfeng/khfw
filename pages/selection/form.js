// pages/selection/form.js
const api = require('../../utils/api.js');

Page({
  data: {
    courses: [],
    form: {
      studentName: '',
      className: '',
      courseId: '',
      courseName: '',
      isSubstitute: false,
      byCourseTeacher: '', // 被代课人：课表原定教师
      byActualTeacher: ''  // 代课人：实际上课教师
    }
  },
  onLoad() {
    api.getCourses().then((list) => this.setData({ courses: list }));
  },
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ ['form.' + field]: e.detail.value });
  },
  onCourse(e) {
    const idx = e.detail.value;
    const c = this.data.courses[idx];
    if (c) this.setData({ 'form.courseId': c.id, 'form.courseName': c.name });
  },
  onSwitch(e) {
    this.setData({ 'form.isSubstitute': e.detail.value });
  },
  submit() {
    const f = this.data.form;
    if (!f.studentName || !f.className || !f.courseId) {
      wx.showToast({ title: '请补全学生/班级/课程', icon: 'none' });
      return;
    }
    if (f.isSubstitute && (!f.byCourseTeacher || !f.byActualTeacher)) {
      wx.showToast({ title: '代课需填被代课人+代课人', icon: 'none' });
      return;
    }
    api.createSelection({
      studentName: f.studentName,
      className: f.className,
      courseId: f.courseId,
      courseName: f.courseName,
      status: f.isSubstitute ? 'substitute' : 'normal',
      substitute: f.isSubstitute
        ? { byCourseTeacher: f.byCourseTeacher, byActualTeacher: f.byActualTeacher }
        : null
    }).then(() => {
      wx.showToast({ title: '报名成功', icon: 'success' });
      setTimeout(() => wx.navigateBack(), 800);
    });
  }
});
