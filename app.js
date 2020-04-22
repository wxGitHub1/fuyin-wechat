//app.js
App({
  globalData: {
    serverUrl: "https://fuyinkangfu.com"
  },
  onLaunch: function (q) {
    console.log("加载页面所带的参数↓")
    console.log(q)
    // console.log(scene)
    var id = q.query.id
    if (q.scene) {
      const scene = decodeURIComponent(q.scene)
      // wx.setStorageSync('doctorId', scene)
      wx.setStorageSync('doctorId', id)
    } else {
      wx.setStorageSync('doctorId', id)
    }
  },
})