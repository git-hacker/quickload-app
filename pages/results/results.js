// pages/results/results.js
const host = 'http://192.168.102.242:3000/'
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
    console.log('onLoad options', options)
    console.log('lenght',options.length)

    if (options.destination == "所有目的地" || options.destination == "可选") {
      var body = {
        "Name": options.name,
        "License": options.license,
        "Origin": options.origin,
        "TruckType": {
          "Length": options.length * 100,
          "Weight": options.weight * 1,
          "Type": options.truckType
        }
      }
    } else {
      var body = {
        Name: options.name,
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
    console.log(body)
    wx.request({
      url: host + 'find-shipment',
      method: 'post',
      header: {'Content-Type': 'application/json'},
      data: body,

      success: res => {
        console.log('success', res)
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