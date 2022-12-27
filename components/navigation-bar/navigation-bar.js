// pages/player-music/cpn/navigation-bar/navigation-bar.js
const App = getApp()
Component({
  properties: {

  },
  data: {
    statusHeight: '20'
  },
  lifetimes: {
    attached() {
      // 设置手机状态栏的高度 自定义nav-bar时，手机的状态栏(电池、信号...)是不占据位置的 
      this.setData({
        statusHeight: App.globalData.screenInfo.statusBarHeight
      })
    }
  },
  methods: {
    goBack() {
      wx.navigateBack({
        delta: 0,
        fail:() => {
          this.triggerEvent('goBack')
        }
      })
    }
  }
})
