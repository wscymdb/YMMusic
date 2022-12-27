// app.js
App({
  globalData: {
    screenInfo: {
      screenHeight: '',
      screenWidth: '',
      statusBarHeight: '',
      contentHeight: 500
    }
  },

  onLaunch() {
    // 获取设备信息
    wx.getSystemInfo({
      success: (result) => {
        console.log(result);
        this.globalData.screenInfo.screenHeight = result.screenHeight
        this.globalData.screenInfo.screenWidth = result.screenWidth
        this.globalData.screenInfo.statusBarHeight = result.statusBarHeight
        this.globalData.screenInfo.contentHeight = result.screenHeight - result.statusBarHeight - 44
      },
    })
  }
})
