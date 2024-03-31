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
    const poems = this.data.poems;
    poems[index].checked = !poems[index].checked;
    this.setData({
      poems: poems
    });
  },

  generatePlan() {
    const selectedPoems = this.data.poems.filter(poem => poem.checked);
    // 生成学习计划的逻辑，可以将选中的诗词保存到数据库或进行其他操作
    console.log('生成学习计划:', selectedPoems);
  }
});
