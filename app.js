// app.js —— 全局逻辑
App({
  globalData: {
    schoolName: '广南县城区第三小学校',
    shortName: '广南三小',
    contactName: '程令冈',
    contactPhone: '18087698482',
    // 以下两项需与 utils/api.js 的开关保持一致
    useRemote: false,   // 接好云开发后改 true
    cloudEnv: '',       // 云开发环境 ID
    user: {
      name: '',
      role: '课后服务专干',
      teacherId: ''
    }
  },

  onLaunch() {
    // 1) 云开发初始化（仅接好云环境后开启）
    if (this.globalData.useRemote && wx.cloud) {
      wx.cloud.init({
        env: this.globalData.cloudEnv,
        traceUser: true
      });
    }

    // 2) 微信隐私协议接入（涉学生/教职工数据强制）
    this.initPrivacy();

    // 3) 版本更新检查
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
  },

  // 微信隐私协议：统一授权弹窗 + 首次进入主动提示
  initPrivacy() {
    if (!wx.getPrivacySetting || !wx.requirePrivacyAuthorize) return; // 基础库过低则跳过

    // 统一回调：当调用需要隐私授权的接口时自动弹出
    if (wx.onNeedPrivacyAuthorize) {
      wx.onNeedPrivacyAuthorize((resolve) => {
        this.showPrivacyModal(resolve);
      });
    }

    // 首次进入主动检查：未同意过则弹出隐私协议
    wx.getPrivacySetting({
      success: (res) => {
        if (res.needAuthorization) {
          const agreed = wx.getStorageSync('privacy_agreed');
          if (!agreed) {
            this.showPrivacyModal((r) => {
              if (r.event === 'agree') wx.setStorageSync('privacy_agreed', true);
            });
          }
        }
      }
    });
  },

  showPrivacyModal(resolve) {
    wx.showModal({
      title: '隐私保护提示',
      content: '使用前请阅读并同意《隐私保护指引》。本小程序仅将您填写的信息用于本校课后服务教务管理，不对外共享、不用于商业用途。',
      confirmText: '同意',
      cancelText: '拒绝',
      success: (res) => {
        if (res.confirm) {
          resolve({ event: 'agree' });
        } else {
          resolve({ event: 'disagree' });
        }
      }
    });
  }
});
