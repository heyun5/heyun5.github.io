// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[
      {img:"../../images/sec-01.jpg",
      new_price:"10498",
      old_price:"11499"},
      {img:"../../images/sec-02.jpg",
      new_price:"5488",
      old_price:"8399"},
      {
        img:"../../images/sec-03.jpg",
        new_price:"2499",
        old_price:"2799"
      }
    ],
    h: "0",
    hh: "0",
    m: "0",
    mm: "0",
    s: "0",
    ss: "0"
    
  },
  // 倒计时函数
  down_Time: function () {
    var _this = this;
    // 倒计时1个小时
    var time = 1 * 60 * 60;
    var h1 = 0;
    var h2 = 0;
    var h3 = 0;

    var m1 = 0;
    var m2 = 0;
    var m3 = 0;

    var s1 = 0;
    var s2 = 0;
    var s3 = 0

    var time_out = setInterval(function () {
      time--;
      if (time <= 0) {
        clearInterval(time_out);
        return;
      }
      h1 = Math.floor(time / 3600);
      m1 = Math.floor((time % 3600) / 60);
      s1 = Math.floor(time % 60);

      h3 = Math.floor(h1 / 10);
      h2 = h1 % 10;

      m3 = Math.floor(m1 / 10);
      m2 = m1 % 10;

      s3 = Math.floor(s1 / 10);
      s2 = s1 % 10;

      _this.setData({
        hh: h3,
        h: h2,
        mm: m3,
        m: m2,
        ss: s3,
        s: s2
      })
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.down_Time()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})