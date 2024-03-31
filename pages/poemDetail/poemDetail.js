Page({
  data: {
    poem: {}
  },

  onLoad: function (options) {
    const poem = JSON.parse(options.poem);
    this.setData({
      poem: poem
    });
  }
});
