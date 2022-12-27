Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    handleTap() {
      const { id } = this.data.itemData
      wx.navigateTo({
        url: `/pages/music-detail/index?isMenu=true&id=${id}`,
      })
    }
  }
})