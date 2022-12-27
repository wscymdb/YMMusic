// components/song-list-section/song-list-section.js
Component({
  properties: {
    title: {
      type: String,
      value: '默认歌单'
    },
    songList: {
      type: Array,
      value: []
    },
    type: {
      type: Number,
      value: 1
    }
  },
  methods: {
    onMoreTap(e) {
      // type  1 热门歌单  2 推荐歌单 
      const type = this.data.type
    
      const typeMap = new Map([[1,'全部'],[2, '华语']])
      wx.navigateTo({
        url: `/pages/song-list-detail/index?type=${typeMap.get(type)}`,
      })
    },
    onItemTap({ detail: { id } }) {
      wx.navigateTo({
        url: `/pages/music-detail/index?isMenu=${true}&id=${id}`,
      })
    }
  }
})