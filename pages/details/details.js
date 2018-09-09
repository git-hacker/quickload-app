// pages/details/details.js
const app = getApp()
let host = "http://192.168.102.242:3000/"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  acceptShipment: function () {
    let shipments = this.data.combo
    let ids = []
    shipments.forEach(function(s) {
      ids.push(s._id)
    })
    
    console.log(8888,shipments)
    wx.request({
      url: host + 'accept-shipments',
      method: 'post',
      header: { 'Content-Type': 'application/json' },
      data: {driverid: app.globalData.license,
      shipments: ids},

      success: res => {
        let shipments = res.data.shipments
        app.globalData.shipments = shipments
      }
    })
    //pass driver ID and shipments as an array
    //shipment ID numbers as array
    //toast accepted!
    //mark items as shipped
    //then? print page?
    // navigate to driver itinerary with item IDs
    wx.navigateTo({
      url: '/pages/workorders/workorders'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    let comboID = options.index
    // console.log(666, app.globalData.shipments[comboID])

    page.setData({
      combo: app.globalData.shipments[comboID]
    });
    console.log("whereare you",combo)

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