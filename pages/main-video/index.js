import * as http from './../../services/api/main-video'
Page({
  data: {
    videoList: [],
    hasMore: true,
    pager: {
      limit: 20,
      offset: 0
    }
  },
  
  onLoad() {
    this.initVideoList()
  },

  // 获取视频列表
  async initVideoList() {

    wx.showLoading({
      title: '加载中哟',
      mask: true
    })
    const {
      pager: {
        limit,
        offset
      },
    } = this.data

    let params = { limit, offset }

    const { data, hasMore } = await http.getMvTop(params)

    this.setData({ hasMore })

    wx.hideLoading()

    let calcList = calcList = [...this.data.videoList, ...data]
    
    this.setData({
      videoList: calcList
    })
  },

  // 监听用户下拉
  async onPullDownRefresh() {
    this.setData({
      'pager.limit': 20,
      'pager.offset': 0,
      videoList: [],
      hasMore: true
    })
    await this.initVideoList()
    // 关闭下拉刷新
    wx.stopPullDownRefresh()
  },

  // 上拉触底
  onReachBottom() {
    const { hasMore } = this.data
    if (!hasMore) return

    this.data.pager.offset = this.data.videoList.length
    this.initVideoList()
  },

  // 点击跳转
  onVideoTab(e) {
    const id = e.currentTarget.dataset.item.id
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: `/packageVideo/pages/vedio-detail/index?id=${id}`,
    })
  }

})