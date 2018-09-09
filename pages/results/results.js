// pages/results/results.js
const host = 'http://192.168.102.242:3000/'
const app = getApp()

Page({

  data: {
  
  },

  openDetails: function (e) {
    app.globalData.current_combo_index = e.index
    // console.log(999, e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?index=${index}`
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
        "Name": options.name,
        "License": options.license,
        "Origin": options.origin,
        "TruckType": {
          "Length": options.length * 10,
          "Weight": options.weight * 2,
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
          Length: options.length * 10,
          Weight: options.weight * 2,
          Type: options.truckType
        }
      }
    }
    wx.request({
      url: host + 'find-shipment',
      method: 'post',
      header: {'Content-Type': 'application/json'},
      data: body,

      success: res => {
        console.log('success', res)
        let shipments = res.data.shipments
        app.globalData.shipments = shipments


        // forEach combo forEach item add weights, prices
        shipments.forEach(function (combo) {
          let totalComboPrice = 0
          let totalComboWeight = 0 
          combo.forEach(function (item) {
            totalComboPrice += item.Price
            totalComboWeight += item.RequiredTruckInformation.Weight
          })
          // console.log('combo total price and weight', totalComboPrice, totalComboWeight)
          combo.push([totalComboPrice])
          combo.push([totalComboWeight])
        })

          let sortedShipments = []
          sortedShipments = shipments.sort(function (a, b) {
          var keyA = a[a.length - 2],
            keyB = b[b.length - 2];
          if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
          return 0;
        });

        
        // function uniq(a) {
        //   var prims = { "boolean": {}, "number": {}, "string": {} }, objs = [];

        //   return a.filter(function (item) {
        //     var type = typeof item;
        //     if (type in prims)
        //       return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        //     else
        //       return objs.indexOf(item) >= 0 ? false : objs.push(item);
        //   });
        // }
     
        // console.log('unqiuefunc', uniq(sortedShipments))


        page.setData({
          numResults: res.data.shipments.length,
          shipments: sortedShipments.reverse()
        });
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