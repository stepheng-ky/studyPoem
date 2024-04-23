Page({
  // 新建学习计划
  goToCreatePlan() {
    wx.navigateTo({
      url: '/pages/createPlan/createPlan'
    });
  },
  // 显示学习进度
  goToProgress() {
    wx.navigateTo({
      url: '/pages/progress/progress'
    });
  },
  // 开始学习
  goToStartLearning() {
    wx.navigateTo({
      url: '/pages/startLearning/startLearning'
    });
  },
  // 查看学习计划
  goToViewPlan() {
    wx.navigateTo({
      url: '/pages/viewPlan/viewPlan'
    });
  },
  // 查看诗词库
  goToPoemLibrary() {
    wx.navigateTo({
      url: '/pages/poemLibrary/poemLibrary'
    });
  }
});
