// 引入配置文件  
import { API_BASE_URL } from '../../config.js'; 

Page({
  data: {
    currentPoemId: '',
    currentPoemAuthor: '',
    currentPoemzhailu0: '',
    currentPoemzhailu1: '',
    currentPoemzhailu2: '',
    errorMessage: '',
  },
  onLoad: function () {
    // 保存当前页面的this引用  
    const that = this; 
    // 显示加载动画
    wx.showLoading({
      // title: '加载中...',
      mask: true,
      // image: '/img/app/loading.gif'
    });
    const RANDOM_POEM_API = `${API_BASE_URL}/random_poem`; // 拼接完整的接口地址  
    // 发起网络请求获取随机诗词  
    wx.request({  
      url: RANDOM_POEM_API, // 接口地址  
      method: 'GET', // 请求方法  
      success: function (res) {
        // 请求成功后的回调函数  
        if (res.data && res.statusCode === 200) {  
          // 接口返回的数据结构是 {"author":"","content":"","id":"","title":"","yiwen":","zhailu":""}
          const { id,author, zhailu } = res.data;  
          const zhailuLines = zhailu.split('\\n'); // 注意这里使用双反斜杠来匹配接口返回数据中的换行符
          const currentPoemzhailu0 = zhailuLines[0];
          const currentPoemzhailu1 = zhailuLines.length > 1 ? zhailuLines[1] : ''; // 确保有第2句才设置  
          const currentPoemzhailu2 = zhailuLines.length > 2 ? zhailuLines[2] : '';// 确保有第3句才设置
          // 设置数据到页面  
          that.setData({  
            currentPoemId: id,  
            currentPoemAuthor: author,  
            currentPoemzhailu0,  
            currentPoemzhailu1,
            currentPoemzhailu2,  
          });  
          // 隐藏加载动画
          wx.hideLoading();
        } else {  
          // 处理请求失败的情况  
          that.setData({
            errorMessage: '获取首页失败，请重试...'
          });
          wx.hideLoading();
        }  
      },  
      fail: function (error) {  
        // 请求失败后的回调函数  
          that.setData({
            errorMessage: '请求失败，请检查网络连接...'
          });
          wx.hideLoading(); 
      }  
    });  
  },
  goToPoemDetails: function() {  
    // 获取当前页面的currentPoemId
    const { currentPoemId } = this.data; 
    // 执行页面跳转，并传递 id 参数  
    wx.navigateTo({  
      url: `/pages/poemDetail/poemDetail?id=${currentPoemId}`  
    });  
  } ,
});