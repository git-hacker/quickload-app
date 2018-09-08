// pages/driver/driver.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    truckType: ['平板', '高栏', '卡车', '冷冻'],
    length: ['2m', '4m', '6m', '8m', '10m'],
    axles: ['4x2', '6x4', '8x4'],
    truckTypeIndex: 0,
    lengthIndex: 0,
    axlesIndex: 0,
    cityArray: ['成都', '上海', '深圳', '广州', '重庆', '北京', '石家庄', '天津', '青岛', '昆明', '西安', '乌鲁木齐', '长沙', '武汉', '厦门', '杭州', '南京', '太原', '呼和浩特', '沈阳'],
    originCityIndex: 0,
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    destination: false,
    destinationCityIndex: 0,
    originCity: '成都',
    destinationCity: '可选'
  },

  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      truckTypeIndex: e.detail.value
    });
  },

  listenerPickerSelected2: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      lengthIndex: e.detail.value
    });
  },

  listenerPickerSelected3: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      axlesIndex: e.detail.value
    });
  },

  chooseDestination: function() {
    let page = this;
    if (page.data.destination) {
      page.setData({destination: false})
    } else {
      page.setData({destination: true})
    }
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
    console.log(this.data.cityArray[this.data.destinationCityIndex])
    this.setData({
      destinationCity: page.data.cityArray[page.data.destinationCityIndex]
    })
  },

  getLocation: function(e) {
    var locationString = this.data.cityArray[e]

    let page = this;
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

  getDistance: function() {
    const location = this.data.location

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("onLoad");
    var that = this;

    
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