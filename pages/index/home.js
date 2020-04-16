// // pages/index/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_longin: false,
    swiperCurrent: 0,
    interval: 300,
    duration: 500,
    circular: false,
    vertical: true,
    imgUrls: '/images/img_shjiantou_fds.png',
    clientHeight: '',
    longitude: 108.9483207500,
    latitude: 34.3491318800,
    covers: [{
      latitude: 34.3491318800,
      longitude: 108.9483207500,
      iconPath: '/images/location.png'
    }]
    // links: ['../user/user', '../user/user', '../user/user']
  },
  // 登录+授权获取手机号
  getPhoneNumber(e) {
    var that = this
    console.log(e)
    console.log("e.detail:" + e.detail)
    console.log("errMsg:" + e.detail.errMsg)
    console.log("iv:" + e.detail.iv)
    console.log("encryptedData:" + e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res.code)
          wx.request({
            url: 'https://fuyinkangfu.com:8085/wx/wxGetPhone',
            method: "POST",
            data: {
              js_code: res.code,
              encrypted: e.detail.encryptedData,
              iv: e.detail.iv,
            },
            header: {
              "Content-Type": "application/json"
            },
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: '授权成功！',
                icon: 'success',
                duration: 2000
              })
              that.setData({
                is_longin: true
              })
            },
            fail: function (err) {
              console.log(err)
            }
          })
          // console.log(e)
          // console.log("e.detail:" + e.detail)
          // console.log("errMsg:" + e.detail.errMsg)
          // console.log("iv:" + e.detail.iv)
          // console.log("encryptedData:" + e.detail.encryptedData)
          // console.log("session_key:" + wx.getStorageSync('session_key'))
          // console.log("res.data.openid:" + wx.getStorageSync('openid'))
          // var data = {
          //   openid: wx.getStorageSync('openid'),
          //   encrypted: e.detail.encryptedData,
          //   iv: e.detail.iv
          // }
          // console.log(data)
          // wx.request({
          //   url: 'https://192.168.3.155:8085/wx/wxGetPhone',
          //   method: "POST",
          //   data: data,
          //   header: {
          //     "Content-Type": "application/x-www-form-urlencoded"
          //   },
          //   success: function (res) {
          //     console.log(res)
          //     wx.showToast({
          //       title: '授权成功！',
          //       icon: 'success',
          //       duration: 2000
          //     })
          //     that.setData({
          //       is_longin: true
          //     })
          //   },
          //   fail: function (err) {
          //     console.log(err)
          //   }
          // })
        },
        fail: err => {
          console.log(err)
        }
      })
    } else {
      this.setData({
        is_longin: false
      })
    }
    // console.log(res.code)
    // wx.request({
    //   url: 'https://api.weixin.qq.com/sns/jscode2session',
    //   data: data,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     console.log("openid：" + res.data.openid);
    //     console.log("session_key：" + res.data.session_key);
    //     wx.setStorageSync('session_key', res.data.session_key)
    //     wx.setStorageSync('openid', res.data.openid)
    //   }
    // })



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
  swipclick: function (e) {
    console.log(this.data.swiperCurrent);
    wx.switchTab({
      url: this.data.links[this.data.swiperCurrent]
    })
  },
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
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
        that.setData({
          is_longin: true
        })
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        // wx.login() //重新登录
        that.setData({
          is_longin: false
        })
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