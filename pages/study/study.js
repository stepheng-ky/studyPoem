// pages/study/study.js  
// 引入配置文件  
import { API_BASE_URL } from '../../config.js'; 

Page({  
  data: {  
    currentTab: 'unlearned', // 默认展示未学习的古诗  
    planName: '',  //计划名
    learnedDays: 0  , //学习天数
    unlearnedPoems: [], // 未学习的古诗列表  
    learnedPoems: [] ,   // 已学习的古诗列表  
    learnedCount: 0, // 已学习古诗词数量，初始化为0，后续计算  
    unlearnedCount: 0, // 未学习古诗词数量，初始化为0，后续计算  
    totalPoemsCount: 0, // 古诗词总数，初始化为0，后续计算  
    progressPercentage: 0, // 学习进度百分比，初始化为0，后续计算  
  },  
  get_user_plans: function(user_id) {
    const that = this;
    // 获取用户学习计划
    const USER_PLANS_API = `${API_BASE_URL}/user_plans?user_id=${user_id}`; // 拼接完整的接口地址  
    wx.request({
      url: USER_PLANS_API,
      method:'GET',
      success:function(res){
        if (res.data && res.statusCode === 200) { 
          const plans = res.data;
          const default_plan = plans.filter(plan => plan.is_default === 1)[0]; //取默认的计划
          const planName = default_plan.plan_name; //计划名
          //计算已学习天数
          const startDate = new Date(default_plan.start_date);
          const currentDate = new Date();
          const learnedDays = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));
          that.setData({  
            planName,
            learnedDays
          });  
          // 动态修改导航栏标题
          wx.setNavigationBarTitle({ title: planName });
          // 获取plan详细信息
          that.get_plan_details(default_plan.plan_id);
        } else {  
          console.error('获取用户学习计划失败', res);  
        }  
      },  
      fail: function (error) {  
        console.error('get_user_plans请求失败', error);  
      }  
    });
  },
  get_plan_details:function(planId){
    const that = this;  
    // 获取plan详细信息
    const PLAN_DETAILS_API = `${API_BASE_URL}/plan_details?plan_id=${planId}`; // 拼接完整的接口地址  
    wx.request({
      url: PLAN_DETAILS_API,
      method:'GET',
      success:function(res){
        if (res.data && res.statusCode === 200) { 
          const poems = res.data;
          // 计算已学习古诗词数量和总数等 
          let unlearnedPoems = poems.filter(poem => !poem.is_learned);
          let learnedPoems = poems.filter(poem => poem.is_learned) ;
          // 按learn_time倒序排序
          learnedPoems.sort((a, b) => new Date(b.learn_time) - new Date(a.learn_time));
          let learnedCount = learnedPoems.length;
          let unlearnedCount = unlearnedPoems.length;
          let totalPoemsCount = poems.length;  
          let progressPercentage = totalPoemsCount ? ((learnedCount / totalPoemsCount) * 100).toFixed(2) : 0; // 保留两位小数  
          that.setData({  
            unlearnedPoems,
            learnedPoems ,   
            learnedCount,  
            unlearnedCount,
            totalPoemsCount,
            progressPercentage,
          });  
          // // 打印数据
          // console.log('计划',that.data.planName,'已学习',that.data.learnedDays,'天.共有',totalPoemsCount,'首古诗,已学习',learnedCount,'首,未学习',unlearnedCount,'首,学习进度',progressPercentage,
          //             '%.')
        } else {  
          console.error('获取学习计划详情失败', res);  
        } 
      },  
      fail: function (error) {  
        console.error('get_plan_details请求失败', error);  
      } 
    });
  },
  switchTab: function(e) {  
    // 切换页签时，更新 currentTab 的值  
    const newTab = e.currentTarget.dataset.tab;  
    this.setData({  
      currentTab: newTab  
    });  
  },
  // tapToMarkLearned: function(e) {  
  //   const poemId = e.currentTarget.dataset.poemId;  
  //   // 弹出确认框  
  //   wx.showModal({  
  //     title: '确认打卡',  
  //     content: '您确定要将这首诗标记为已学习吗？',  
  //     success: function(res) {  
  //       if (res.confirm) {  
  //         // 用户点击了确定，调用标记为已学习的方法  
  //         this.markAsLearned(poemId);  
  //       } else if (res.cancel) {  
  //         // 用户点击了取消，不执行任何操作  
  //         console.log('用户取消了打卡');  
  //       }  
  //     }.bind(this) // 绑定this上下文  
  //   });  
  // },  
    
  // markAsLearned: function(poemId) {  
  //   // 假设你有一个将古诗标记为已学习的方法markPoemAsLearned  
  //   this.markPoemAsLearned(poemId).then(() => {  
  //     // 标记成功后更新视图或执行其他逻辑  
  //     wx.showToast({  
  //       title: '打卡成功',  
  //       icon: 'success',  
  //       duration: 2000  
  //     });  
        
  //     // 可能需要刷新数据，或者重新加载列表  
  //     this.getUnlearnedPoems(); // 假设你有一个获取未学习古诗列表的方法  
  //   }).catch(error => {  
  //     // 标记失败处理  
  //     wx.showToast({  
  //       title: '打卡失败',  
  //       icon: 'none',  
  //       duration: 2000  
  //     });  
  //   });  
  // }, 
  onLoad: function() {   
    const that = this;  
    const app = getApp(); // 获取小程序实例
    const user_id = app.globalData.openid; // 传userid=用户的openid  
    that.get_user_plans(user_id);
  },
  goToPoemDetail: function(event) {
    const poemId = event.currentTarget.dataset.poemId;
    wx.navigateTo({
      url: '/pages/poemDetail/poemDetail?id=' + poemId,
    });
  },
});