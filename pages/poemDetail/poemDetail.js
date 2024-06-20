// 引入配置文件  
import { API_BASE_URL } from '../../config.js'; 

// poemDetails.js  
Page({  
  data: {  
    poem: {  
      id: '',  
      title: '',  
      author: '',  
      content: '',  
      yiwen: '',
      zhailu:'' ,
      errorMessage:'',
    }  
  },  
  
  onLoad: function (options) {  
    const that = this;  
    // 显示加载动画
    wx.showLoading({
      // title: '加载中...',
      mask: true,
      // image: '/img/app/loading.gif'
    });
    const poemId = options.id; // 从上一个页面通过options传递了诗词的id  
    const POEM_DETAILS_API = `${API_BASE_URL}/poem_details?id=${poemId}`; // 拼接完整的接口地址  
  
    // 发起网络请求获取诗词详情  
    wx.request({  
      url: POEM_DETAILS_API, // 接口  
      method: 'GET',  
      success: function (res) {  
        if (res.data && res.statusCode === 200) {  
          const poem = res.data;
          poem.content = poem.content.replace(/\\n/g, '<br>');
          poem.yiwen = poem.yiwen.replace(/\\n/g, '<br>');
          poem.zhailu = poem.zhailu.replace(/\\n/g, '<br>');
          // 动态修改导航栏标题
          wx.setNavigationBarTitle({ title: poem.title });
          that.setData({  
            poem 
          });  
          // 隐藏加载动画
          wx.hideLoading();
        }  else {  
          console.log('失败~~');  
          // 处理请求失败的情况  
          that.setData({
            errorMessage: '获取诗词详情失败，请重试...'
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
});