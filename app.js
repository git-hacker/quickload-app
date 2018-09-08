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
    var locationString = e.detail.value
    var url = `https://restapi.amap.com/v3/geocode/geo?key=0b085d826757c57521465d4faa3f05be&address=${locationString}`
    wx.request({
      url: url,
      success(res) {
        console.log(res.data.geocodes.location)
        var location = res.data.geocodes.location
        return location
      }
    })
  },

  getDistance: function (e) {
    var origin = e.detail.value.origin
    var destination = e.detail.value.destination
    var originLocation = this.getLocation(origin)
    var destinationLocation = this.getLocation(destination)
    wx.request({
      url: `https://restapi.amap.com/v3/distance?key=0b085d826757c57521465d4faa3f05be&origins=${originLocation}&destination=${destinationLocation}`,
      success(res) {
        console.log(res.data.results.distance)
        var distance = res.data.results.distance
        return distance
      }
    })
  },

  globalData: {
    userInfo: null
  }
})