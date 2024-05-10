// pages/library/library.js
// 引入配置文件  
import { API_BASE_URL } from '../../config.js'; 

Page({

  data: {
    categoryNames:[],
    categoryIds: [], 
  },
  onLoad: function () {
    // 保存当前页面的this引用  
    const that = this; 
    const CATEGORY_API = `${API_BASE_URL}/all_categories`; // 拼接完整的接口地址  
    // 发起网络请求获取随机诗词  
    wx.request({  
      url: CATEGORY_API, // 接口地址  
      method: 'GET', // 请求方法  
      success: function (res) {  
        // 请求成功后的回调函数  
        if (res.data && res.statusCode === 200) {  
          // 接口返回的数据结构是 [{"category_id":1,"category_name":"小学古诗"}]
          const categoryData = res.data;
          that.setData({  
            categoryNames: categoryData.map(item => item.category_name),  
            categoryIds: categoryData.map(item => item.category_id),   
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
  },
  goToCategory: function(e) {  
    const index = e.currentTarget.dataset.index; // 获取点击事件的索引  
    const categoryId = this.data.categoryIds[index]; // 通过索引获取对应的categoryId  
    // const categoryId =1;
    // 执行页面跳转，并传递 id 参数  
    wx.navigateTo({  
      url: `/pages/category/category?category_id=${categoryId}`  
    });  
  } ,
})