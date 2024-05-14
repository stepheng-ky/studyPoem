// pages/study/study.js  
// 引入配置文件  
import { API_BASE_URL } from '../../config.js'; 

Page({  
  data: {  
    currentTab: 'unlearned', // 默认展示未学习的古诗  
    planId:'', //planId
    planName: '',  //计划名
    learnedDays: 0  , //学习天数
    unlearnedPoems: [], // 未学习的古诗列表  
    learnedPoems: [] ,   // 已学习的古诗列表  
    learnedCount: 0, // 已学习古诗词数量，初始化为0，后续计算  
    unlearnedCount: 0, // 未学习古诗词数量，初始化为0，后续计算  
    totalPoemsCount: 0, // 古诗词总数，初始化为0，后续计算  
    progressPercentage: 0, // 学习进度百分比，初始化为0，后续计算  
  },  
  onLoad: function() {   
    const that = this;  
    const app = getApp(); // 获取小程序实例
    const user_id = app.globalData.openid; // 传userid=用户的openid  
    that.get_user_plans(user_id); //获取plans
  },
  // ############# 获取plans
  get_user_plans: function(user_id) {
    const that = this;
    const USER_PLANS_API = `${API_BASE_URL}/user_plans?user_id=${user_id}`; // 拼接完整的接口地址  
    wx.request({
      url: USER_PLANS_API,
      method:'GET',
      success:function(res){
        if (res.data && res.statusCode === 200) { 
          const plans = res.data;
          const default_plan = plans.filter(plan => plan.is_default === 1)[0]; //取默认的计划
          const planName = default_plan.plan_name; //计划名
          const planId = default_plan.plan_id; //计划名
          //计算已学习天数
          const startDate = new Date(default_plan.start_date);
          const currentDate = new Date();
          const learnedDays = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));
          that.setData({  
            planName,
            learnedDays,
            planId
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
  // ######### 获取plan详细信息
  get_plan_details:function(planId){
    const that = this;  
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
        } else {  
          console.error('获取学习计划详情失败', res);  
        } 
      },  
      fail: function (error) {  
        console.error('get_plan_details请求失败', error);  
      } 
    });
  },
  // ############### 切换页签时，更新 currentTab 的值  
  switchTab: function(e) {  
    const newTab = e.currentTarget.dataset.tab;  
    this.setData({  
      currentTab: newTab  
    });  
  },
  // ############# 跳转到poem详情
  goToPoemDetail: function(event) {
    const poemId = event.currentTarget.dataset.poemId;
    wx.navigateTo({
      url: '/pages/poemDetail/poemDetail?id=' + poemId,
    });
  },
  // ############## 打卡功能
  tapToMarkLearned: function(event) {
    const poemId = event.currentTarget.dataset.poemId;
    const unlearnedPoems = this.data.unlearnedPoems;
    const learnedPoem = unlearnedPoems.find(poem => poem.id === poemId);
    wx.showModal({ // 弹框确认
      title: '确认打卡',
      content: '确定要打卡这首诗吗？',
      success: (res) => {
        if (res.confirm) {
        // 学习时间
        let learn_time = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).format(new Date());
        learnedPoem.learn_time = learn_time;//更新learnedPoem的学习时间
        // 添加到已学习list,从未学习中移除
        const learnedPoems = this.data.learnedPoems;
        learnedPoems.unshift(learnedPoem);
        const unlearnedPoems_new = unlearnedPoems.filter(item => item.id !== poemId); 
        // 更新页面数据
        this.setData({
          learnedPoems,
          unlearnedPoems:unlearnedPoems_new
        });
        // 后端接口，更新诗的状态
        const MARK_LEARNED_API = `${API_BASE_URL}/mark_learned`;
        wx.request({
          url: MARK_LEARNED_API,
          method: 'POST',
          data:{
            plan_id: this.data.planId,
            id: poemId,
            is_learned: 1
          },
          success: function(res) {
            if (res.data && res.statusCode === 200) {
              console.log('诗歌',poemId,'打卡成功');
            } else {
              console.error('诗歌',poemId,'打卡失败', res);
            }
          },
          fail: function(error) {
            console.error('诗歌',poemId,'打卡请求失败', error);
          }
        });
      } else if (res.cancel) {
        console.log('取消打卡');
      }
    }
  });
  },
  // ############## 重新学习功能
  tapToMarkUnLearned: function(event) {
    const poemId = event.currentTarget.dataset.poemId;
    const learnedPoems = this.data.learnedPoems;
    const unlearnedPoem = learnedPoems.find(poem => poem.id === poemId);
    wx.showModal({ // 弹框确认
      title: '确认重新学习',
      content: '确定要重新学习这首诗吗？',
      success: (res) => {
        if (res.confirm) {
        // 添加到未学习list,从已学习中移除
        const unlearnedPoems = this.data.unlearnedPoems;
        unlearnedPoems.unshift(unlearnedPoem);
        const learnedPoems_new = learnedPoems.filter(item => item.id !== poemId); 
        // 更新页面数据
        this.setData({
          learnedPoems:learnedPoems_new,
          unlearnedPoems,
        });
        // 后端接口，更新诗的状态
        const MARK_LEARNED_API = `${API_BASE_URL}/mark_learned`;
        wx.request({
          url: MARK_LEARNED_API,
          method: 'POST',
          data:{
            plan_id: this.data.planId,
            id: poemId,
            is_learned: 0
          },
          success: function(res) {
            if (res.data && res.statusCode === 200) {
              console.log('诗歌',poemId,'重新学习成功');
            } else {
              console.error('诗歌',poemId,'重新学习失败', res);
            }
          },
          fail: function(error) {
            console.error('诗歌',poemId,'重新学习请求失败', error);
          }
        });
      } else if (res.cancel) {
        console.log('取消重新学习');
      }
    }
  });
  },
});