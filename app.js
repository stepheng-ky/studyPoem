// app.js
// 引入配置文件  
import { API_BASE_URL } from 'config.js'; 

App({
  globalData: {  
    openid: '',  
    session_key: '',
  }, 
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: res => {
        if (res.code) {
          const code = res.code; // code 用于获取用户的openid
          // 获取用户信息
          wx.getUserInfo({
            success: userInfoRes => {
              const userInfo = userInfoRes.userInfo;
              const avatarUrl = userInfo.avatarUrl; //头像url
              const nickName = userInfo.nickName; //微信名
              // 请求接口,创建并获取用户信息；
              const OPENID_API = `${API_BASE_URL}/openid?code=${code}`; // 拼接完整的接口地址  
              wx.request({  
                url: OPENID_API, // 接口  
                method: 'POST',  
                data:{
                  code: code,
                  nickName: nickName,
                  avatarUrl: avatarUrl
                },
                header: {
                  'content-type': 'application/json' // 设置请求头
                },
                success: (res) => {  // 使用箭头函数保持正确的 this 指向
                  if (res.data && res.statusCode === 200) {  
                    // res.data：{"session_key":"session_key","openid":"openid"}
                    this.globalData.openid = res.data.openid; 
                    this.globalData.session_key = res.data.session_key; 
                  } else {  
                    console.error('获取用户openid失败', res);  
                  }  
                },  
                fail: (error) => {  
                  console.error('请求失败', error);  
                }  
              });  
            },
            fail: err => {
              console.log(err);
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },
})
