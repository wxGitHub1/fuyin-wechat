//app.js
App({
  onLaunch: function (q) {
    console.log("加载页面所带的参数↓")
    console.log(q)
    const scene = decodeURIComponent(q.scene)
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        var data={
          appid:'wxc90d2f11aa9a5d97',
          secret:'36190d2f9ea02baa6593f26b8b3b05b0',
          js_code:res.code,
          grant_type:'authorization_code'
        }
        var that=this;
        var jsCode=res.code
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:data,
          header:{
            'content-type':'application/json'
          },
          success: function (res) {
            console.log("openid："+res.data.openid);
            console.log("session_key："+res.data.session_key);
            wx.setStorageSync('session_key', res.data.session_key)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})