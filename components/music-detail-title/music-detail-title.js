// components/music-detail-title/music-detail-title.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDescTap(e) {
      const desc = this.data.itemData.description
      wx.showModal({
        title: 'YMMusic',
        content: desc,
        showCancel: false,
        confirmText: '我知道了',
        // confirmColor: '#999'
      })
    },
    handleShare() {
      this.triggerEvent('handleShare')
    }
  }
})
