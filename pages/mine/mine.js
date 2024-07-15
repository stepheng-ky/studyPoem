// pages/mine/mine.js
Page({
  data: {
    
  },
  goToTTS: function() {  
    // 执行页面跳转
    wx.navigateTo({  
      url: '/pages/tts/tts'
    })  
  },
})