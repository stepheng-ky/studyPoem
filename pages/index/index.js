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
    // 背景图库
    bgImages: [
      'https://img.zcool.cn/community/01398c5dec8d18a801209568a2bf4a.png@1280w_1l_2o_100sh.png',
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.d5zCRzt3pvdINQsRme3sUwHaEn?rs=1&pid=ImgDetMain',
      'https://img.zcool.cn/community/010ed65fe010c811013fdcc7310e5f.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100',
    ],
    backgroundImg: '',
    currentPoemAuthor: '',
    currentPoemContent0: '',
    currentPoemContent1: '',
  },
  onLoad: function () {
    // 随机bgImages中的任一图片
    const bgImages = this.data.bgImages;
    const randomIndex = Math.floor(Math.random() * bgImages.length);
    const bgImage = bgImages[randomIndex];
    // 随机poemList中的任一poem
    const randomPoemIndex = Math.floor(Math.random() * this.data.poemList.length);
    const randomPoem = this.data.poemList[randomPoemIndex];

    this.setData({
      backgroundImg: bgImage,
      currentPoemAuthor: randomPoem.author,
      currentPoemContent0: randomPoem.content.split('\n')[0],
      currentPoemContent1: randomPoem.content.split('\n')[1]
    });
  }
});