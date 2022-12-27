import  * as http  from "../../services/api/main-music"

Page({
  data: {
    scrollTop: 0,
    isLoading: false,
    showTop: false,
    songList: []
  },

  onLoad(options) {

    // this.getSongList()
    this.getSongList()
  },

  // 页面滚动
  onPageScroll(e) {
    if (e.scrollTop >= 300) {
      this.setData({
        showTop: true,
        mask: true
      })
    } else {
      this.setData({
        showTop: false
      })
    }
  },

  onTopClick() {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  async getSongList() {
    this.setData({
      isLoading: true
    })
    const { tags } = await http.getHotSongList()

    const allPromise = []


    for (const item of tags) {
     const promise = http.getSongList({ cat: item.name })
     allPromise.push(promise)
    }

    Promise.all(allPromise).then(res => {
      this.setData({
        songList: res,
        isLoading: false
      })
      wx.stopPullDownRefresh()

    })

  },


})