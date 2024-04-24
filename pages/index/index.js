Page({
  data: {
    poemList: [
      {
        title: '静夜思',
        author: '李白·唐',
        content: '举头望明月\n低头思故乡'
      },
      {
        title: '登鹳雀楼',
        author: '王之涣·唐',
        content: '欲穷千里目\n更上一层楼'
      }
    ],
    currentPoemAuthor: '',
    currentPoemContent0: '',
    currentPoemContent1: '',
  },
  onLoad: function () {
    // 随机poemList中的任一poem
    const randomPoemIndex = Math.floor(Math.random() * this.data.poemList.length);
    const randomPoem = this.data.poemList[randomPoemIndex];

    this.setData({
      // 作者 第一句 第二句
      currentPoemAuthor: randomPoem.author,
      currentPoemContent0: randomPoem.content.split('\n')[0],
      currentPoemContent1: randomPoem.content.split('\n')[1]
    });
  }
});