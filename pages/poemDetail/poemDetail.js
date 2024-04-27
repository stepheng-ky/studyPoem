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
      zhailu:'' 
    }  
  },  
  
  onLoad: function (options) {  
    const that = this;  
    const poemId = options.id || '1104052ed0fc'; // 从上一个页面通过options传递了诗词的id  
    const POEM_DETAILS_API = `${API_BASE_URL}/poem_details?id=${poemId}`; // 拼接完整的接口地址  
  
    // 发起网络请求获取诗词详情  
    wx.request({  
      url: POEM_DETAILS_API, // 接口  
      method: 'GET',  
      success: function (res) {  
        if (res.data && res.statusCode === 200) {  
          const poem = res.data;
          console.log('content-改前：',poem.content);
          poem.content = poem.content.replace(/\\n/g, '<br>');
          poem.yiwen = poem.yiwen.replace(/\\n/g, '<br>');
          poem.zhailu = poem.zhailu.replace(/\\n/g, '<br>');
          console.log('content-改后：',poem.content);
          that.setData({  
            poem 
          });  
        } else {  
          console.error('获取诗词详情失败', res);  
        }  
      },  
      fail: function (error) {  
        console.error('请求失败', error);  
      }  
    });  
  }  
});