// pages/driver/driver.js
var tcity = require("../../utils/citys.js");
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [],
    originProvince: "",
    citys: [],
    originCity: "",
    countys: [],
    originCounty: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
  },
  bindChangeOrigin: function (e) {
    var val = e.detail.value 
    console.log(this.data)
    console.log('val', val)
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        originProvince: this.data.provinces[val[0]],
        originCity: cityData[val[0]].sub[0].name,
        citys: citys,
        originCounty: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        originCity: this.data.citys[val[1]],
        originCounty: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county');
      this.setData({
        originCounty: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  getLocation: function() {
    var locationString = this.data.originProvince + this.data.originCity + this.data.originCounty
    let page = this;
    var url = `https://restapi.amap.com/v3/geocode/geo?key=0b085d826757c57521465d4faa3f05be&address=${locationString}`
    wx.request({
      url: url,
      success(res) {
        console.log(res.data.geocodes.location)
        var location = res.data.geocodes.location
        page.setData({
          location: location
        })
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

    tcity.init(that);

    var cityData = that.data.cityData;

    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('城市完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'originProvince': cityData[0].name,
      'originCity': cityData[0].sub[0].name,
      'originCounty': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
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