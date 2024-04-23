Page({
  data: {
    poems: [
      { title: '静夜思', checked: false },
      { title: '将进酒', checked: false },
      { title: '春江花月夜', checked: false },
      // 其他诗词数据
    ]
  },

  selectPoem(e) {
    const index = e.currentTarget.dataset.index;
    const myPoems = this.data.poems;
    myPoems[index].checked = !myPoems[index].checked;
    this.setData({
      poems: myPoems
    });
  },
  
  // 勾选诗词，弹框输入计划名称，打印计划明细
  generatePlan() { 
    wx.showModal({ 
      title: '输入计划名', 
      content: '请输入计划名称', 
      editable: true,// 可输入
      success: (res) => { 
        if (res.confirm) { 
          const planName = res.content; 
          const selectedPoems = this.data.poems.filter(poem => poem.checked);  
          console.log('生成学习计划,名称:',planName ,',内容:', selectedPoems); 
        }else{
          console.log('取消生成学习计划'); 
        }
      } 
    }); 
  },
  copyPlan() {
    const templates = ['模板A', '模板B', '模板C'];
    wx.showActionSheet({ 
      itemList: templates, 
      success(res) { 
        if (!res.cancel) { 
          const selectedTemplate = templates[res.tapIndex]; 
          wx.showModal({ 
            title: '输入计划名', 
            content: '请输入计划名称', 
            editable: true,// 可输入
            success: (res) => { 
              if (res.confirm) { 
                const planName = res.content; 
                console.log('复制学习计划：',selectedTemplate, '-->',planName ); 
              }else{
                console.log('取消复制学习计划'); 
              }
            } 
          }); 
        } else { 
          console.log('取消复制学习计划'); 
        } 
      } 
    });
  },
  seeCopyPlan() {
    const templates = ['模板A', '模板B', '模板C'];
    wx.showActionSheet({ 
      itemList: templates, 
      success(res) { 
        if (!res.cancel) { 
          const selectedTemplate = templates[res.tapIndex]; 
          console.log('查看模板详情:', selectedTemplate); 
        } else { 
          console.log('取消查看模板详情'); 
        } 
      } 
    });
  },
});
