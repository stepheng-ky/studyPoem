// 引入配置文件  
import { API_BASE_URL } from '../../config.js'; 

// category.js  
Page({  
  data: {  
    category: {}  
  },  
  
  onLoad: function (options) {  
    const that = this;  
    // 显示加载动画
    wx.showLoading({
      // title: '加载中...',
      mask: true,
      // image: '/img/app/loading.gif'
    });
    const categoryId = options.category_id || '1'; // 从上一个页面通过options传递了category_id
    const CATEGORY_API = `${API_BASE_URL}/category?category_id=${categoryId}`; // 拼接完整的接口地址  
    // 发起网络请求获取诗库  
    wx.request({  
      url: CATEGORY_API, // 接口  
      method: 'GET',  
      success: function (res) {  
        if (res.data && res.statusCode === 200) {  
          const category = res.data;
          that.setData({  
            category 
          });  
          // 动态修改导航栏标题
          wx.setNavigationBarTitle({ title: category.category_name });
          // 隐藏加载动画
          wx.hideLoading();
        } else {  
          // 处理请求失败的情况  
          that.setData({
            errorMessage: '获取诗库失败，请重试...'
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
  } , 
  goToPoemDetails: function(e) {  
    // 获取当前页面的currentPoemId
    const index1 = e.currentTarget.dataset.index1;
    const index2 = e.currentTarget.dataset.index2;
    const { id } = this.data.category.poems[index1].second_level_poems[index2]; 
    // 执行页面跳转，并传递 id 参数  
    wx.navigateTo({  
      url: `/pages/poemDetail/poemDetail?id=${id}`  
    });  
  } ,
});