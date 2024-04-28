// app.js
// 引入配置文件  
import { API_BASE_URL } from 'config.js'; 

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({  
      success: function(res) {  
        if (res.code) {  
          console.log('res.code:',res.code);
          // 发起网络请求  
          const RANDOM_POEM_API = `${API_BASE_URL}/openid`; // 拼接完整的接口地址
          wx.request({  
            url: RANDOM_POEM_API, // Flask应用运行的地址  
            method: 'POST',  
            data: {  
              code: res.code  
            },  
            success: function(response) {  
              if (response.data.openid) {  
                // 成功获取openid，进行后续操作  
                console.log('res.code:',res.code);
                console.log('response.data:',response.data);
              } else {  
                // 处理错误  
                console.error('Error:', response.data.error);  
              }  
            },  
            fail: function(error) {  
              // 处理请求失败的情况  
              console.error('Request failed:', error);  
            }  
          });  
        } else {  
          console.log('登录失败！' + res.errMsg);  
        }  
      }  
    });
  },
  globalData: {
    userInfo: null
  }
})
