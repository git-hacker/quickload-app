// pages/driver/driver.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */

  data: {
    truckTypes: ['平板', '高栏', '箱式', '冷冻'],
    truckType: 'Flat Bed',
    lengths: [4.2, 5.2, 6.2, 6.8, 9.6, 13, 17.5],
    length: 4.2,
    lengthWeights: {4.2: 1.99, 5.2: 5, 6.2: 8, 6.8: 10, 9.6: 15, 13: 30, 17.5: 28},
    weight: 1.99,
    truckTypeIndex: 0,
    lengthIndex: 0,
    axlesIndex: 0,
    cityArray: ['成都', '上海', '深圳', '广州', '重庆', '北京', '石家庄', '天津', '青岛', '昆明', '西安', '乌鲁木齐', '长沙', '武汉', '厦门', '杭州', '南京', '太原', '呼和浩特', '沈阳'],
    destCityArray: ['所有目的地','成都', '上海', '深圳', '广州', '重庆', '北京', '石家庄', '天津', '青岛', '昆明', '西安', '乌鲁木齐', '长沙', '武汉', '厦门', '杭州', '南京', '太原', '呼和浩特', '沈阳'],
    originCityIndex: 0,
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    destination: false,
    destinationCityIndex: 0,
    originCity: '成都',
    destinationCity: '可选',
  },

  bindTruckTypeChange: function (e) {
    let page = this;
    let i = e.detail.value

    if (i == 0) {
      var truckType = "Flat Bed"
    } else if (i == 1) {
        var truckType = "High Cage"
    } else if (i == 2) {
        var truckType = "Box Truck"
    } else {
        var truckType = "Refrigerator"
    }

    page.setData({
      truckTypeIndex: e.detail.value,
      truckType: truckType
    });
    if (e.detail.value == 0 || e.detail.value == 2) {
      page.setData({
        lengths: [4.2, 5.2, 6.2, 6.8, 9.6, 13, 17.5],
        lengthWeights: {4.2: 1.99, 5.2: 5, 6.2: 8, 6.8: 10, 9.6: 15, 13: 30, 17.5: 28}
      })
    } else if (e.detail.value == 1) {
      page.setData({
        lengths: [4.2, 4.8, 6.8, 9.6, 12.5, 13.5],
        lengthWeights: {4.8: 8, 6.8: 10, 9.6: 20, 12.5: 35, 13.5: 40}
      })
    } else {
      page.setData({
        lengths: [4.2, 5.2, 7.6, 8.6, 9.6, 13.7, 15],
        lengthWeights: {4.2: 3, 5.2: 5, 7.6: 8, 8.6: 9, 9.6: 12, 13.7: 15, 15: 20}
      })
    }
// reload length picker with array 
  },

  bindLengthChange: function (e) {
    let page = this;
    page.setData({
      lengthIndex: e.detail.value,
      length: page.data.lengths[e.detail.value]
    })
    page.setData({
      weight: page.data.lengthWeights[page.data.length]
    })
    console.log('weight', page.data.weight)
  },

  getLicense: function(e) {
    var license = e.detail.value
    this.setData({license: license})
    app.globalData.license = license
    
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindOriginChange: function(e) {
    let page = this;
    this.setData({
      originCityIndex: e.detail.value
    })
    console.log(this.data.cityArray[this.data.originCityIndex])
    this.setData({
      originCity: page.data.cityArray[page.data.originCityIndex]
    })
  },

  bindDestinationChange: function (e) {
    let page = this;
    this.setData({
      destinationCityIndex: e.detail.value
    })
    console.log(this.data.destCityArray[this.data.destinationCityIndex])
    this.setData({
      destinationCity: page.data.destCityArray[page.data.destinationCityIndex]
    })
    if (this.data.destinationCity == '所有目的地' || this.data.destinationCity == '可选' ) {
      this.setData({destination: false})
    } else {
      this.setData({destination: true})
    }
  },

submitForm: function () {

wx.navigateTo({
  url: `/pages/results/results?license=${this.data.license}&origin=${this.data.originCity}&destination=${this.data.destinationCity}&truckType=${this.data.truckType}&length=${this.data.length}&weight=${this.data.weight}`,
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("onLoad");
    var that = this;
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
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