// components/music-related-item/music-related-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  data: {

  },

  
  methods: {
    handleTap() {
      const { id } = this.data.itemData
      wx.navigateTo({
        url: `/packagePlayer/pages/player-music/player-music?id=${id}`,
      })
    }
  }
})
