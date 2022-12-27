import * as http from './../../services/api/main-music'
import {useRankingStore, rankingMap} from '../../stores/rankingStore'
import {playerStore} from '../../stores/playerStore'
import { querySelect, ymThrottle } from '../../utils/util'
const querySelectThrottle = ymThrottle(querySelect)
Page({
  data: {
    swiperList: [],
    bannerHeight: 140,
    recommendMusicList: [],
    songInfos: {},
    hotSongList: [],
    recommendSongList: [],
    currentSong: {},
    isPlaying: false,
    id: '',
    playListShow: false
  },

  onLoad() {
    this.getHomeBanner()
    this.getSongList()
    this.getHotSongList()
    this.getRecommendSongList()
    this.onSwipperImageLoad()
  },

  onUnload() {
    this.offsetSongList()
  },

  // banner
  async getHomeBanner() {
    const { banners } = await http.getHomeBanner()
    this.setData({
      swiperList: banners
    })
  },
  
  // 推荐歌曲
  getSongList() {
    useRankingStore.onState("recommendList", this.handleRecommendList)
    playerStore.onStates(['currentSong', 'isPlaying', 'id'], this.handlePlayInfos)
    for (const key in rankingMap) {
      useRankingStore.onState(key, this.handleRankingList(key))
    }
    useRankingStore.dispatch('fetchRankingListAction')
  },

  // 推荐歌曲点击
  recommendMusiceTap(e) {
    const index = e.currentTarget.dataset.i
    playerStore.setState('playerList', this.data.recommendMusicList)
    playerStore.setState('playSongIndex', index)
  },

  // 页面关闭时 取消监听
  offsetSongList() {
    useRankingStore.offState("recommendList", this.handleRecommendList)
    playerStore.offStates(['currentSong', 'isPlaying', 'id'], this.handlePlayInfos)

    for (const key in rankingMap) {
      useRankingStore.offState(key, this.handleRankingList(key))
    }
  },

  // 热门歌单
  getHotSongList() {
    this.getSongListByCat({ dataStr: 'hotSongList'})  
  },

  // 推荐歌单
  getRecommendSongList() {
    let params = {cat: '流行'}
    this.getSongListByCat({ params, dataStr: 'recommendSongList'})
  },

  // 根据类别获取歌单
  async getSongListByCat({params = 6, dataStr}) {
    const { playlists } = await http.getSongList(params)
    this.setData({ 
      [dataStr]: playlists
    })
  },

  // 点击搜索
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },

  // banner 点击
  onBannerClick() {
  },

  // 点击更多事件
  onMoreTap(e) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/pages/music-detail/index?type=${type}`,
    })
  },
  // 巅峰帮点击查看更多
  songListTap(e) {
    const name = e.detail.name
    const type = {
      原创榜: 1,
      飙升榜: 2,
      新歌榜: 3,
    }[name]
    wx.navigateTo({
      url: `/pages/music-detail/index?type=${type}`,
    })
  },

  // 动态设置banner的高度
   async onSwipperImageLoad() {
    const res = await querySelectThrottle('.banner-img')
    if(!res) return
    this.setData({
      bannerHeight: res.height
    })
  },

handleRecommendList(value) {
  let tracks =  value.tracks
  if(!tracks) return
  tracks = tracks.slice(0,5)
  this.setData({
    recommendMusicList: tracks
  })
},

handleRankingList(ranking) {
  return (value) => {
    if (ranking === 'recommendList') return
    const infos = {...this.data.songInfos, [ranking]: value}
    this.setData({ songInfos: infos })
  }
},

handlePlayInfos({currentSong, isPlaying, id}) {
  if(currentSong) {
    this.setData({ currentSong })
  }
  if(isPlaying !== undefined ) {
    this.setData({ isPlaying })
  }
  if(id !== undefined) {
    this.setData({ id })
  }
},

  // 暂停、播放 
  onTogglePlay() {
    playerStore.dispatch('changePlayMusiceStatusAction')
  },

  playBarTap() {
    wx.navigateTo({
      url: `/packagePlayer/pages/player-music/player-music?id=${this.data.id}`,
    })
  },

  playListTap() {
    this.setData({ playListShow: !this.data.playListShow })
  },
  onClose() {
    this.setData({ playListShow: !this.data.playListShow })
  }

})
