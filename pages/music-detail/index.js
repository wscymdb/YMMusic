import {useRankingStore} from '../../stores/rankingStore'
import {playerStore} from '../../stores/playerStore'

import * as http from '../../services/api/main-music'
const rankingMap = {
  0: 'recommendList',
  1: 'originalList',
  2: 'surgeList',
  3: 'newList'
}
Page({
  data: {
    rankingInfos: {},
    type: '',
    isMenu: false,
    currentIndex: -1
  },
   onLoad(options) {
    const {type, id, isMenu} = options
    console.log(type, id, isMenu);
    this.setData({
      isMenu
    })
    if(isMenu) {
       this.getMusicDetailByMenu(id)
    } else {
      this.data.type = type
      useRankingStore.onState(rankingMap[type], this.getRankingListFromStore)
    }


  },

  onUnload() {
    if(this.data.isMenu) return
    useRankingStore.offState(rankingMap[this.data.type],this.getRankingListFromStore)
  },

  getRankingListFromStore(value) {
    this.setData({
      rankingInfos: value
    })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },

  // 分享
  handleShare() {

   wx.showShareImageMenu({
     path: '/pages/music-detail/index',
     success(res) {
       console.log(res);
     }
   })

  },

  // 歌单进来的发起网络请求
  async getMusicDetailByMenu(id) {
    const {playlist} = await http.getRecommendList({id})
    this.getRankingListFromStore(playlist)
  },
  handleTap(e) {
    const { index, id } = e.currentTarget.dataset
    playerStore.setState('playerList', this.data.rankingInfos.tracks)
    playerStore.setState('playSongIndex', index)
    this.setData({
      currentIndex: index
    })

    wx.navigateTo({
      url: `/packagePlayer/pages/player-music/player-music?id=${id}`,
    })
  }
})