// // pages/index/home.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_longin: true,
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
  },
  //导航
  daohang: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({ //​使用微信内置地图查看位置。
          latitude: that.data.latitude, //要去的纬度-地址
          longitude: that.data.longitude, //要去的经度-地址
          name: "经开万科中心",
          address: '未央区未央路301号'
        })
      }
    })
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
          console.log("code:" + res.code)
          wx.request({
            url: 'https://fuyinkangfu.com:8085/wx/wxGetPhone',
            method: "POST",
            data: {
              doctorId: wx.getStorageSync('doctorId'),
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
  /***当前日期*/
  // FormatDate(strTime) {
  //   var date = new Date(strTime);
  //   return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    })
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        that.setData({
          is_longin: true
        })
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        // wx.login() //重新登录
        // var today = new Date();
        // var today_time = that.FormatDate(today);
        // console.log(today_time)
        // if (today_time >= '2020-4-22') {console.log('活动已结束');}else{}
        var thetime = '2020-04-23 12:00:00';
        var d = new Date(Date.parse(thetime.replace(/-/g, "/")));
        var curDate = new Date();
        if (d <= curDate) {
          that.setData({
            is_longin: false
          })
        } else {
          that.setData({
            is_longin: true
          })
        }
      }
    })
  },
})
// Page({
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