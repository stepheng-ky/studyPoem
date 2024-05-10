// pages/discovery/discovery.js
// 引入配置文件  
import { API_BASE_URL } from '../../config.js'; 

Page({  
  data: {  
    searchInput: '', // 存储输入框的内容  
    searchResult:[], //搜索结果 
    searchTip:'请输入关键字检索诗词名称/诗词内容/诗词作者/朝代等。',
  },      
  handleInput: function(e) {  
    // 获取输入框的内容  
    const searchInput = e.detail.value;  
    // 更新数据  
    this.setData({  
      searchInput  
    });  
  },  
    
  handleSearch: function() {  
    // 获取输入框的内容  
    const searchInput = this.data.searchInput;  
    // 如果输入内容不为空，则调用接口获取搜索结果  
    if (searchInput) {  
      this.get_search_result(searchInput);  
    } else {  
      //搜索结果置空
      this.setData({  
        searchResult:[]
      });  
      // 提示用户输入内容  
      wx.showToast({  
        title: '请输入搜索内容',  
        icon: 'none'  
      });  
    }  
  },
  get_search_result:function(searchInput){
    const that = this;  
    //请求接口获取搜索结果
    const SEARCH_API = `${API_BASE_URL}/search?q=${searchInput}`; // 拼接完整的接口地址  
    wx.request({
      url: SEARCH_API,
      method:'GET',
      success:function(res){
        if (res.data && res.statusCode === 200) { 
          const searchResult = res.data;
          //对结果中的content加工
          searchResult.forEach(item=>item.content = item.content.replace(/\\n/g, ''));
          // searchResult.forEach(item=>item.content = item.content.replace(new RegExp(searchInput, 'gi'), '<text class="highlight">$&</text>'));
          if(searchResult.length > 0){ 
            // 如果searchResult非空，则更新数据  
            that.setData({  
              searchResult  
            }); 
          } else {  
            // 如果searchResult为空数组，则提示用户搜索结果为空  
            wx.showToast({  
              title: '搜索结果为空',  
              icon: 'none'  
            });  
            that.setData({  
              searchResult: [] // 确保数据也被清空  
            });  
          }  ;
        } else {  
          console.error('获取搜索结果失败', res);  
        } 
      },  
      fail: function (error) {  
        console.error('get_search_result请求失败', error);  
      } 
    })
  } ,
  goToPoemDetail: function(event) {
    const poemId = event.currentTarget.dataset.poemId;
    wx.navigateTo({
      url: '/pages/poemDetail/poemDetail?id=' + poemId,
    });
  },   
});