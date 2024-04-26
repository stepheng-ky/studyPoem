Page({
  data: {
    currentPoemAuthor: '',
    currentPoemzhailu0: '',
    currentPoemzhailu1: '',
  },
  onLoad: function () {
    // 发起网络请求获取随机诗词  
    wx.request({  
      url: 'https://guomuyi.com/studypoem/random_poem', // 接口地址  
      method: 'GET', // 请求方法  
      success: function (res) {  
        // 请求成功后的回调函数  
        if (res.data && res.statusCode === 200) {  
          // 接口返回的数据结构是 {"author":"","content":"","id":"","title":"","yiwen":","zhailu":""}
          const { author, zhailu } = res.data;  
          const zhailuLines = zhailu.split('\\n'); // 注意这里使用双反斜杠来匹配接口返回数据中的换行符  
  
          // 设置数据到页面  
          this.setData({  
            currentPoemAuthor: author,  
            currentPoemzhailu0: zhailuLines[0],  
            currentPoemzhailu1: zhailuLines.length > 1 ? zhailuLines[1] : '' // 确保有第二句才设置  
          });  
        } else {  
          // 处理请求失败的情况  
          console.error('获取诗词失败', res);  
        }  
      },  
      fail: function (error) {  
        // 请求失败后的回调函数  
        console.error('请求失败', error);  
      }  
    });  
  }
});