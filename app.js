//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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

  getLocation: function (e) {
    let app = this;
    console.log('getting location')
    var locationString = e
    var url = `https://restapi.amap.com/v3/geocode/geo?key=0b085d826757c57521465d4faa3f05be&address=${locationString}`
    wx.request({
      url: url,
      success(res) {
        var location = res.data.geocodes[0].location
        console.log('location', location)
        app.globalData.locations[e] = location
        console.log('app', app.globalData)
        
      }
    })
  },

  

  globalData: {
    userInfo: null,
    locations: {'key': 'value'}
  }
})