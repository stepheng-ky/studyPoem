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
      isPlaying: false, // 添加一个状态来追踪音频播放
    },
    innerAudioContext:'',  
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
  playAudio: function() {
    const that = this;
    let innerAudioContext = '';
    // 判断innerAudioContext是否已经初始化
    if(that.data.innerAudioContext){
      innerAudioContext = that.data.innerAudioContext;
    } else{
      innerAudioContext = wx.createInnerAudioContext({
        useWebAudioImplement: true
      }); 
      that.setData({
        innerAudioContext
      });
    };
    if (!that.data.poem.isPlaying) { // 如果音频没有播放
      const poemId = that.data.poem.id;
      const audioUrl = `${API_BASE_URL}/play/${poemId}`;
      innerAudioContext.src = audioUrl;
      innerAudioContext.play();
      that.setData({
        'poem.isPlaying': true, // 设置为正在播放
      });
      // 监听音频结束事件，结束时重置播放状态，释放资源
      innerAudioContext.onEnded(() => {
        that.setData({
          'poem.isPlaying': false
        });
        innerAudioContext.stop();
      });
    } else { // 如果音频正在播放，则暂停
      innerAudioContext.pause();
      that.setData({
        'poem.isPlaying': false // 设置为未播放
      });
    }
  }, 
  onUnload: function() {
    // 释放音频资源
    const that = this;
    if(that.data.innerAudioContext){
      const innerAudioContext = that.data.innerAudioContext;
      innerAudioContext.destroy();
    }
  },
});