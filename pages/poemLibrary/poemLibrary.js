Page({
  data: {
    poems: [
      { title: '静夜思', content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。', author: '李白' },
      { title: '将进酒', content: '君不见黄河之水天上来，奔流到海不复回。', author: '李白' },
      { title: '春江花月夜', content: '春江潮水连海平，海上明月共潮生。', author: '张若虚' },
      // 其他诗词数据
    ]
  },

  searchPoems(e) {
    const keyword = e.detail.value;
    // 根据关键词搜索诗词库
    console.log('搜索诗词:', keyword);
  },

  viewPoemDetail(e) {
    const index = e.currentTarget.dataset.index;
    const poem = this.data.poems[index];
    wx.navigateTo({
      url: '/pages/poemDetail/poemDetail?poem=' + JSON.stringify(poem)
    });
  }
});
