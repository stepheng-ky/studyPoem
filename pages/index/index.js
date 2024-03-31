Page({
  goToCreatePlan() {
    wx.navigateTo({
      url: '/pages/createPlan/createPlan'
    });
  },
  goToProgress() {
    wx.navigateTo({
      url: '/pages/progress/progress'
    });
  },
  goToStartLearning() {
    wx.navigateTo({
      url: '/pages/startLearning/startLearning'
    });
  },
  goToViewPlan() {
    wx.navigateTo({
      url: '/pages/viewPlan/viewPlan'
    });
  },
  goToPoemLibrary() {
    wx.navigateTo({
      url: '/pages/poemLibrary/poemLibrary'
    });
  }
});
