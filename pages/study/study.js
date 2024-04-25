// pages/study/study.js  
Page({  
  data: {  
    currentTab: 'unlearned', // 默认展示未学习的古诗  
    studyPlan: {  
      planName: '古诗词学习计划',  
      poems: [  
        { id: 'poem1', name: '静夜思', learned: false },  
        { id: 'poem2', name: '春晓', learned: true },  
        { id: 'poem3', name: '望庐山瀑布', learned: false },  
      ],  
      learnedDays: 10  
    },  
    unlearnedPoems: [], // 未学习的古诗列表  
    learnedPoems: [] ,   // 已学习的古诗列表  
    learnedCount: 0, // 已学习古诗词数量，初始化为0，后续计算  
    unlearnedCount: 0, // 未学习古诗词数量，初始化为0，后续计算  
    totalPoemsCount: 0, // 古诗词总数，初始化为0，后续计算  
    progressPercentage: 0, // 学习进度百分比，初始化为0，后续计算  
  },  
  
  onLoad: function() {  
    // 计算已学习古诗词数量和总数等 
    const poems = this.data.studyPlan.poems;  
    let unlearnedPoems = poems.filter(poem => !poem.learned);
    let learnedPoems = poems.filter(poem => poem.learned) ;
    let learnedCount = learnedPoems.length;
    let unlearnedCount = unlearnedPoems.length;
    let totalPoemsCount = poems.length;  
    let progressPercentage = ((learnedCount / totalPoemsCount) * 100).toFixed(2); // 保留两位小数  
    this.setData({  
      unlearnedPoems,
      learnedPoems ,   
      learnedCount,  
      unlearnedCount,
      totalPoemsCount,
      progressPercentage,
    });  
    // 打印数据
    console.log('一共有',totalPoemsCount,'首古诗,已学习',learnedCount,'首,未学习',unlearnedCount,'首,已学占比',progressPercentage,
                '%.其中：\n未学习：',unlearnedPoems,'已学习：',learnedPoems)
  },
  switchTab: function(e) {  
    // 切换页签时，更新 currentTab 的值  
    const newTab = e.currentTarget.dataset.tab;  
    this.setData({  
      currentTab: newTab  
    });  
  },
  tapToMarkLearned: function(e) {  
    const poemId = e.currentTarget.dataset.poemId;  
    // 弹出确认框  
    wx.showModal({  
      title: '确认打卡',  
      content: '您确定要将这首诗标记为已学习吗？',  
      success: function(res) {  
        if (res.confirm) {  
          // 用户点击了确定，调用标记为已学习的方法  
          this.markAsLearned(poemId);  
        } else if (res.cancel) {  
          // 用户点击了取消，不执行任何操作  
          console.log('用户取消了打卡');  
        }  
      }.bind(this) // 绑定this上下文  
    });  
  },  
    
  markAsLearned: function(poemId) {  
    // 假设你有一个将古诗标记为已学习的方法markPoemAsLearned  
    this.markPoemAsLearned(poemId).then(() => {  
      // 标记成功后更新视图或执行其他逻辑  
      wx.showToast({  
        title: '打卡成功',  
        icon: 'success',  
        duration: 2000  
      });  
        
      // 可能需要刷新数据，或者重新加载列表  
      this.getUnlearnedPoems(); // 假设你有一个获取未学习古诗列表的方法  
    }).catch(error => {  
      // 标记失败处理  
      wx.showToast({  
        title: '打卡失败',  
        icon: 'none',  
        duration: 2000  
      });  
    });  
  }, 
});