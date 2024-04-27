// 引入配置文件  
import { API_BASE_URL } from '../../config.js'; 

// category.js  
Page({  
  data: {  
    category: {}  
  },  
  
  onLoad: function (options) {  
    const that = this;  
    const categoryId = options.category_id || '1'; // 从上一个页面通过options传递了category_id
    console.log('category页面：category_id',categoryId);
    const CATEGORY_API = `${API_BASE_URL}/category?category_id=${categoryId}`; // 拼接完整的接口地址  
    // 发起网络请求获取诗词详情  
    wx.request({  
      url: CATEGORY_API, // 接口  
      method: 'GET',  
      success: function (res) {  
        if (res.data && res.statusCode === 200) {  
          const category = res.data;
          console.log('category：',category);
          that.setData({  
            category 
          });  
          // 动态修改导航栏标题
          wx.setNavigationBarTitle({ title: category.category_name });
        } else {  
          console.error('获取诗词详情失败', res);  
        }  
      },  
      fail: function (error) {  
        console.error('请求失败', error);  
      }  
    });  
  } , 
  goToPoemDetails: function(e) {  
    // 获取当前页面的currentPoemId
    const index = e.currentTarget.dataset.index;
    console.log('index:',index);
    const { id } = this.data.category.poems[index]; 
    console.log('currentPoemId:',id); 
    // 执行页面跳转，并传递 id 参数  
    wx.navigateTo({  
      url: `/pages/poemDetail/poemDetail?id=${id}`  
    });  
  } ,
});