Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  data: {
    tracks: []
  },
  methods: {
    handleTap() {
      this.triggerEvent('moreTap', {name: this.data.itemData.name})
    }
  },
  lifetimes: {
    attached() {
      let tracks = this.data.itemData.tracks
      if (!tracks) return
      tracks = tracks.slice(0, 3)
      this.setData({
        tracks
      })
    }
  }
})