//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    access_token: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    longitude:108.9483207500,
    latitude:34.3491318800,
    covers:[{
      latitude: 34.3491318800,
      longitude: 108.9483207500,
      iconPath: '/images/location.png'
    }]
  },
  daohang:function(){
    console.log("开始↓")
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        console.log("获取成功")
        console.log("res")
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 34.3491318800,//要去的纬度-地址
          longitude: 108.9483207500,//要去的经度-地址
          name: "未央区未央路301号",
          address: '经开万科中心'
        })
      }
    })
  },
  clickMe:function(){
    wx.navigateTo({
      url: '/pages/index/home',
    })
  },
  clickMe1:function(){
    wx.request({
      url: 'https://fuyinkangfu.com:8085/wx/wxLogin',
      method: "POST",
      data:{
        js_code:123
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '登录成功！',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  clickMe2:function(){
    var that=this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      method: "GET",
      data:{
        grant_type:"client_credential",
        appid:"wxc90d2f11aa9a5d97",
        secret: '36190d2f9ea02baa6593f26b8b3b05b0'
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          access_token:res.data.access_token
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  clickMe3:function(){
    var that=this
    var access_token1=this.data.access_token
    console.log(access_token1)
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit',
      method: "POST",
      data:{
        access_token:access_token1,
        scene:"123456"
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})