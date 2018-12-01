Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner_list:[
      { src:  "../../images/banner_p1.jpg"},
      { src:  "../../images/banner_p2.jpg"},
      { src: "../../images/banner_p3.jpg" },
      { src: "../../images/banner_p4.jpg" },
      { src: "../../images/banner_p5.jpg" },
      { src: "../../images/banner_p6.jpg" },
      { src: "../../images/banner_p7.jpg" },
      { src: "../../images/banner_p8.jpg" }
    ],
    nav_bar:[
      { src: "../../images/nav_bar_p1.png", context: "分类查询" },
      { src: "../../images/nav_bar_p2.png", context: "物流查询" },
      { src: "../../images/nav_bar_p3.png", context: "购物车" },
      { src: "../../images/nav_bar_p4.png", context: "我的京东" },
      { src: "../../images/nav_bar_p5.png", context: "充值" },
      { src: "../../images/nav_bar_p6.png", context: "领券中心" },
      { src: "../../images/nav_bar_p7.png", context: "京东超市" },
      { src: "../../images/nav_bar_p8.png", context: "我的关注" },
    ],
    act_list:[
      {src:"../../images/act_list1.jpg",new_price:"39.9",old_price:"69.9"},
      { src: "../../images/act_list2.jpg", new_price: "7699", old_price: "7999" },
      { src: "../../images/act_list3.jpg", new_price: "56.9", old_price: "99.9" }
    ],
    h:"0",
    hh:"0",
    m:"0",
    mm:"0",
    s:"0",
    ss:"0",
    opa:0,

    // 商品详情数据
    goods:[
      { title:"华为 HUAWEI 畅享9 Plus 4GB+64GB 宝石蓝 全网通 四摄超清全面屏大电池 移动联通电信4G手机 双卡双待",
        img: "https://img11.360buyimg.com/jdphoto/s340x140_jfs/t27538/313/906287049/203803/97a56aea/5bbc6e4cNb5d7a8cc.jpg", price:"119900"},
      { title:"荣耀9i 4GB+64GB 幻夜黑 移动联通电信4G全面屏手机 双卡双待",
        img:"https://img11.360buyimg.com/jdphoto/s340x140_jfs/t21415/332/642302956/189613/778f2021/5b13cd6cN8e12d4aa.jpg",price:"1495"
      }
      ]
  },
  down_Time:function(){
    var _this=this;
    var time=2*60*60;
    var h1=0;
    var h2=0;
    var h3=0;

    var m1=0;
    var m2=0;
    var m3=0;

    var s1=0;
    var s2=0;
    var s3=0
    
    var time_out=setInterval(function(){
      time--;
      if(time<=0){
        clearInterval(time_out);
        return;
      }
      h1=Math.floor(time/3600);
      m1 = Math.floor((time %3600)/60);
      s1 = Math.floor(time % 60);

      h3=Math.floor(h1/10);
      h2=h1%10;

      m3=Math.floor(m1/10);
      m2=m1%10;

      s3 = Math.floor(s1 / 10);
      s2=s1%10;

      _this.setData({
        hh:h3,
        h:h2,
        mm:m3,
        m:m2,
        ss:s3,
        s:s2
      })
    },1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 调用倒计时的函数
    this.down_Time()
  },
  // 滚动时输入框背景透明度变化
  onPageScroll:function(e){
    var ttop=e.scrollTop;
    var height=150;
    var opacity=0;
    if(ttop<height){
      opacity=(ttop/height)*1
    }else{
      opacity=1
    }
    this.setData({
      opa: opacity
    })
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