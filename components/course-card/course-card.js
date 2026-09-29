// components/course-card/course-card.js
Component({
  properties: {
    course: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onTap() {
      // 点击卡片，抛出事件给父页面
      this.triggerEvent('tapcourse', { id: this.data.course.id });
    }
  }
});
