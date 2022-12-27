import { throttle } from 'underscore'
import { playerStore, audioContext } from '../../../stores/playerStore';
const App = getApp()
Page({
  data: {
    currentSong: {},
    lyricInfos: [],
    currentTime: 0,
    duration: 0,
    lyricIndex: -1,
    currentId: 0,

    pageTitle: ['歌曲', '歌词'],
    statusHeight: '20',
    contentHeight: 0,
    isPlaying: false,
    sliderValue: 0,
    isSliderChanging: false,
    lyricScrollTop: 0,

    playerList: [],
    playSongIndex: -1,

    isFirstPlay: true,
    isRate: false,
    playModeIndex: 0, // 0 顺序播放  1 单曲循环  2 随机播放
    playModelName: ['order', 'repeat', 'random'],
    stateKeys: ['lyricInfos', 'currentSong', 'duration', 'lyricIndex', 'currentTime','isPlaying','playModeIndex'],

    playListShow: false
  },
  onLoad(options) {
    this.setContentHeight()
    playerStore.dispatch('playMusiceBySongIdAction', options.id)
    playerStore.onStates(['playerList', 'playSongIndex'], this.handlerPlayerInfos)
    playerStore.onStates(this.data.stateKeys, this.handlerMusicDetail)
  },
  onUnload() {
    playerStore.offStates(['playerList', 'playSongIndex'], this.handlerPlayerInfos)
    playerStore.offStates(this.data.stateKeys, this.handlerMusicDetail)
  },

  updateProgress: throttle(function (currentTime) {
    if (this.data.isSliderChanging) return
    const sliderValue = (this.data.currentTime / this.data.duration) * 100
    this.setData({
      currentTime,
      sliderValue
    })
  }, 800, {
    leading: false,
    trailing: false
  }),

  // slider 事件监听
  onSliderChange(e) {
    const value = e.detail.value

    // 计算当前播放时间
    const currentTime = this.data.duration * (value / 100)

    // 设置当前播放时间
    audioContext.seek(currentTime / 1000)

    this.setData({
      currentTime,
      isSliderChanging: false
    })

  },
  onSliderChanging: throttle(function (e) {
    const value = e.detail.value
    // 计算当前播放时间
    const currentTime = this.data.duration * (value / 100)

    this.setData({
      currentTime,
    })
    this.data.isSliderChanging = true
  }, 50),

  // 暂停、播放 
  onTogglePlay() {
    playerStore.dispatch('changePlayMusiceStatusAction')
  },
  // 播放模式发生改变
  onModelChange() {
    playerStore.dispatch('changePlayModeAction')
  },
  // 上一首
  onPrevSong() {
    playerStore.dispatch('playNewMusicAction', false)
  },
  // 下一首
  onNextSong() {
    playerStore.dispatch('playNewMusicAction')
  },

  // 页面切换
  swiperChange(e) {
    const {
      currentItemId
    } = e.detail
    this.setData({
      currentId: Number(currentItemId)
    })
  },
  navBarTitleTap(e) {
    const current = e.currentTarget.dataset.current
    this.setData({
      current
    })
  },
  setContentHeight() {
    const contentHeight = App.globalData.screenInfo.contentHeight
    this.setData({
      contentHeight
    })
  },
  goBack() {
    wx.switchTab({
      url: '/pages/main-music/index',
    })
  },

  // store事件
  handlerPlayerInfos(value) {
    if (value) {
      const {
        playerList,
        playSongIndex
      } = value
      if (playerList) {
        this.setData({
          playerList
        })
      }
      if (playSongIndex !== undefined) {
        this.setData({
          playSongIndex
        })
      }
    }
  },
  handlerMusicDetail({
    lyricInfos,
    currentSong,
    duration,
    lyricIndex,
    currentTime,
    isPlaying,
    playModeIndex
  }) {
    if (lyricInfos) { this.setData({ lyricInfos }) }
    if (currentSong) { this.setData({ currentSong }) }
    if (duration !== undefined) { this.setData({ duration }) }
    if (currentTime !== undefined) { this.updateProgress(currentTime ) }
    if (isPlaying !== undefined) { this.setData({ isPlaying }) }
    if (playModeIndex !== undefined) { this.setData({ playModeIndex }) }

    if (lyricIndex !== undefined) {
      this.setData({
        lyricIndex,
        lyricScrollTop: lyricIndex * 40
      })
    }

  },

  // 长按事件
  onLongPress(e) {
    this.data.isRate = true
    audioContext.playbackRate = 2
  },
  onTouchEnd(e) {
    if (this.data.isRate) {
      audioContext.playbackRate = 1
      this.data.isRate = false
    }
  },

  playListTap() {
    this.setData({
      playListShow: !this.data.playListShow
    })
  },
  onClose() {
    this.setData({
      playListShow: !this.data.playListShow
    })
  }

})