// pages/results/results.js
const host = 'http://192.168.102.242:3000/'
const app = getApp()
Page({

  data: {
  
  },

  openDetails: function () {
    wx.navigateTo({
      url: '/pages/details/details'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    let totalComboPrice = 0
    let totalComboWeight = 0
    // console.log('onLoad options', options)
    // console.log('lenght',options.length)

    if (options.destination == "所有目的地" || options.destination == "可选") {
      var body = {
        "Name": app.globalData.userInfo.nickName,
        "License": options.license,
        "Origin": options.origin,
        "TruckType": {
          "Length": options.length * 100,
          "Weight": options.weight * 2,
          "Type": options.truckType
        }
      }
    } else {
      var body = {
        Name: app.globalData.userInfo.nickName,
        License: options.license,
        Origin: options.origin,
        Destination: options.destination,
        TruckType: {
          Length: options.length * 100,
          Weight: options.weight * 1,
          Type: options.truckType
        }
      }
    }
    // console.log(body)
    wx.request({
      url: host + 'find-shipment',
      method: 'post',
      header: {'Content-Type': 'application/json'},
      data: body,

      success: res => {
        console.log('success', res)
        let shipments = res.data.shipments

        // forEach combo forEach item add weights, prices
        shipments.forEach(function (combo) {
          let totalComboPrice = 0
          let totalComboWeight = 0 
          combo.forEach(function (item) {
            totalComboPrice += item.Price
            totalComboWeight += item.RequiredTruckInformation.Weight
          })
          console.log('combo total price and weight', totalComboPrice, totalComboWeight)
          combo.push([totalComboPrice])
          combo.push([totalComboWeight])
          console.log('combo weight', combo)
        })

        page.setData({
          numResults: res.data.shipments.length,
          shipments: shipments
        });
          console.log(999,page.data.shipments)
        page.data.shipments.forEach(function(ships) {
          ships.forEach(function(s) {
            // console.log('from', s.Origin)
            // console.log('to', s.Destination)
            let distance = page.getDistance({origin: s.Origin, destination: s.Destination})
            console.log('how far?', distance)
          })
        })
      }
    })
  },

  getDistance: function (e) {
    console.log('calculating distance', e)
    var origin = e.origin
    var destination = e.destination
    app.getLocation(destination)
    app.getLocation(origin)
    var originLocation = app.globalData[origin]
    var destinationLocation = app.globalData[destination]
    console.log('app in results', app.globalData)
    let locations = app.globalData.locations
    console.log('上海', locations)
    wx.request({
      url: `https://restapi.amap.com/v3/distance?key=0b085d826757c57521465d4faa3f05be&origins=${originLocation}&destination=${destinationLocation}`,
      success(res) {
        console.log(res.data.results.distance)
        var distance = res.data.results.distance
        return distance
      }
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