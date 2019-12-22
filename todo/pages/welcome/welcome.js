// pages/welcome/welcome.js
var touchStartX = 0;//触摸时的原点  
var touchStartY = 0;//触摸时的原点  
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动  
var interval = "";// 记录/清理时间记录  
var touchMoveX = 0; // x轴方向移动的距离
var touchMoveY = 0; // y轴方向移动的距离

//获取应用实例
const app = getApp()


Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  data: {

    // text:"这是一个页面"

    _title: '../../assets/images/title2.PNG'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  // 触摸开始事件  
  touchStart: function (e) {
    touchStartX = e.touches[0].pageX; // 获取触摸时的原点  
    touchStartY = e.touches[0].pageY; // 获取触摸时的原点  
    // 使用js计时器记录时间    
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件  
  touchMove: function (e) {
    touchMoveX = e.touches[0].pageX;
    touchMoveY = e.touches[0].pageY;
  },
  // 触摸结束事件  
  touchEnd: function (e) {
    var moveX = touchMoveX - touchStartX;
    var moveY = touchMoveY - touchStartY;
    if (Math.sign(moveX) == -1) {
      moveX = moveX * -1;
    }
    if (Math.sign(moveY) == -1) {
      moveY = moveY * -1;
    }
    if (moveX <= moveY) {// 上下
      // 向上滑动
      if (touchMoveY - touchStartY <= -30 && time < 10) {
        //console.log("向上滑动")
        wx.switchTab({
          url: '../calendar/calendar'
        })

      }
      // 向下滑动  
      if (touchMoveY - touchStartY >= 30 && time < 10) {
        wx.switchTab({
          url: '../calendar/calendar'
        })

      }
    } else {// 左右
      // 向左滑动
      if (touchMoveX - touchStartX <= -30 && time < 10) {
        //console.log("左滑页面")
        wx.navigateTo({
          url: '../addNote/addNote'
        })

      }
      // 向右滑动  
      if (touchMoveX - touchStartX >= 30 && time < 10) {
        //console.log('向右滑动');
        wx.navigateTo({
          url: '../addPlan/addPlan'
        })

      }
    }
    clearInterval(interval); // 清除setInterval  
    time = 0;
  },
 
  handleAddTodo(e) {
    wx.navigateTo({
      url: '../addTodo/addTodo'
    })
  },

  /**
   * 在handleAddTodo中实现快捷添加日程。
   */

  handleTap(e) {
    let index = e.currentTarget.dataset.index;
    let todo = this.data.todos[index];
    let todo_str = JSON.stringify(todo);
    wx.navigateTo({
      url: '../addTodo/addTodo?todo=' + todo_str,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
})