// // pages/index/home.js
Page({
  /**
    * 页面的初始数据
  */
  data: {
    is_longin:false,
    swiperCurrent: 0,
    interval: 300,
    duration:500,
    circular: false,
    vertical:true,
    imgUrls: [
      'http://192.168.3.155:8087/files/wx/1.jpg', 
      'http://192.168.3.155:8087/files/wx/2.jpg', 
      'http://192.168.3.155:8087/files/wx/3.jpg', 
      'http://192.168.3.155:8087/files/wx/4.jpg', 
      'http://192.168.3.155:8087/files/wx/5.jpg', 
      'http://192.168.3.155:8087/files/wx/6.jpg', 
      'http://192.168.3.155:8087/files/wx/7.jpg', 
    ],
    clientHeight:'',
    longitude:108.9483207500,
    latitude:34.3491318800,
    covers:[{
      latitude: 34.3491318800,
      longitude: 108.9483207500,
      iconPath: '/images/location.png'
    }]
    // links: ['../user/user', '../user/user', '../user/user']
  },
  getPhoneNumber(e) {
    console.log("e.detail:"+e.detail)
    console.log("errMsg:"+e.detail.errMsg)
    console.log("iv:"+e.detail.iv)
    console.log("encryptedData:"+e.detail.encryptedData)
    console.log("session_key:"+wx.getStorageSync('session_key'))
    this.setData({
      is_longin:true
    })
  }, 
  //轮播图的切换事件 
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换 
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件  
  // swipclick: function (e) {
  //   console.log(this.data.swiperCurrent);
  //   wx.switchTab({
  //     url: this.data.links[this.data.swiperCurrent]
  //   })
  // }
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this 
    wx.getSystemInfo({ 
        success: function (res) { 
            that.setData({ 
                clientHeight: res.windowHeight 
            }); 
        } 
    }) 
  },
})
// Page({
//   onShareAppMessage() {
//     return {
//       title: 'swiper',
//       path: 'page/component/pages/swiper/swiper'
//     }
//   },
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
//     indicatorDots: true,
//     vertical: false,
//     autoplay: false,
//     interval: 2000,
//     duration: 500
//   },
//   changeIndicatorDots() {
//     this.setData({
//       indicatorDots: !this.data.indicatorDots
//     })
//   },

//   changeAutoplay() {
//     this.setData({
//       autoplay: !this.data.autoplay
//     })
//   },

//   intervalChange(e) {
//     this.setData({
//       interval: e.detail.value
//     })
//   },

//   durationChange(e) {
//     this.setData({
//       duration: e.detail.value
//     })
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })