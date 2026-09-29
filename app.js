// app.js —— 全局逻辑
App({
  globalData: {
    schoolName: '广南县城区第三小学校',
    shortName: '广南三小',
    contactName: '程令冈',
    contactPhone: '18087698482',
    // 当前登录用户（后续接后端/云开发时填充）
    user: {
      name: '',
      role: '课后服务专干',
      teacherId: ''
    }
  },

  onLaunch() {
    // 预留：读取登录态、检查更新等
    const updateManager = wx.getUpdateManager && wx.getUpdateManager();
    if (updateManager) {
      updateManager.onUpdateReady(() => {
        wx.showModal({
          title: '更新提示',
          content: '新版本已就绪，是否重启应用？',
          success: (res) => {
            if (res.confirm) updateManager.applyUpdate();
          }
        });
      });
    }
  }
});
