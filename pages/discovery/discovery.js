// pages/discovery/discovery.js
// discovery.js  
Page({  
  data: {  
    searchInput: '' // 存储输入框的内容  
  },  
    
  handleInput: function(e) {  
    // 获取输入框的内容  
    const value = e.detail.value;  
    // 更新数据  
    this.setData({  
      searchInput: value  
    });  
  },  
    
  handleSearch: function() {  
    // 获取输入框的内容  
    const searchInput = this.data.searchInput;  
    // 如果输入内容不为空，则跳转到搜索结果页面  
    if (searchInput) {  
      wx.navigateTo({  
        url: '/pages/search-result/search-result?query=' + encodeURIComponent(searchInput)  
      });  
    } else {  
      // 提示用户输入内容  
      wx.showToast({  
        title: '请输入搜索内容',  
        icon: 'none'  
      });  
    }  
  }  
});