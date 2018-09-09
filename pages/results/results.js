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
    console.log('userinfo?', app.globalData.userInfo)
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
          "Length": options.length * 10,
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

        
        let _shipments = page.data.shipments
        _shipments.forEach(function(ships) {
          let s = ships[0]
          console.log('from', s.Origin, 'to', s.Destination)
          let distance
          page.getDistance({ origin: s.Origin, destination: s.Destination }).then((dis) =>{
            distance = dis
            s.distance = distance
            console.log(11111, s)
            page.setData({
              shipments: _shipments
            })
            console.log(999, page.data.shipments)

          })
        })
      
      }
    })
  },

  getDistance: function (e) {

    let that = this;
    return new Promise((resolve, reject) => {
      var origin = e.origin
      let originLocation
      let destinationLocation
      var destination = e.destination
      that.getLocation(origin)
        .then((loc) => {
          originLocation = loc
          return loc
        }).then((res) => {
          that.getLocation(destination)
            .then((loc) => {
              console.log(333, loc)
              console.log(555, originLocation)
              destinationLocation = loc
              wx.request({
                url: `https://restapi.amap.com/v3/distance?key=0b085d826757c57521465d4faa3f05be&origins=${originLocation}&destination=${destinationLocation}`,
                success(res) {
                  console.log(777, res)
                  var distance = res.data.results[0].distance
                  console.log(666, distance)
                  resolve(distance)

                }
              })

            })
        })
    })
  },

  getLocation: function (e) {
    return new Promise((resolve, reject) => {
      var locationString = e
      var url = `https://restapi.amap.com/v3/geocode/geo?key=0b085d826757c57521465d4faa3f05be&address=${locationString}`
      wx.request({
        url: url,
        success(res) {
          var location = res.data.geocodes[0].location
          console.log(222,location)
          resolve(location)

        }
      })

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