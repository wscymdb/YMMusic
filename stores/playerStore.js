import { HYEventStore } from 'hy-event-store'

import * as http from '../services/api/main-music'
import { parseLyric } from '../utils/parse-lyric'

export const audioContext = wx.createInnerAudioContext({});
export const playerStore = new HYEventStore({
  state: {
   playerList: [],
   playSongIndex: -1,

   currentSong: {},
   lyricInfos: [],
   currentTime: 0,
   duration: 0,
   lyricIndex: -1,
   id: '',
   isSliderChanging: false,
   isFirstPlay: true,
   isPlaying: false,
   playModeIndex: 0, // 0 顺序播放  1 单曲循环  2 随机播放
  },

  actions: {
    playMusiceBySongIdAction(context,id) {
      id = Number(id)
      console.log(id,'-------');
      if(id === context.id) return
      // 将之前的数据清空
      context.currentSong = {}
      context.lyricInfos = []
      context.currentTime = 0
      context.duration = 0

      // 保存信息
      context.id = id
      context.isPlaying = true

      // 获取当前播放音乐歌词
      http.getLyricDetail({ id }).then(({lrc}) => {
        context.lyricInfos =  parseLyric(lrc.lyric)
      })
      
    // 获取当前播放音乐详情
      http.getMusicDetail({ ids: id }).then(({songs}) => {
        context.currentSong = songs[0]
        context.duration = songs[0].dt
      })

    // 播放之前先停止 否则单曲循环会有问题 因为是同一个url 内部处理会有一些问题
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true

    // 音频是一点点加载的 当快进到某个地方的时候他是没有加载的 那么这个组件会首先加载快进的地方，在这个过程中会自动暂停然后快进的地方加载完毕后 在自动播放  这期间我们是没有手动调用方法播放的 所以无法触发onTimeUpdate 所以在onWaiting中手动暂停  onCanplay中手动播放   那么就解决这个bug了  官方的bug
    // 监听方法没必要多次监听，只需首次播放的时候监听即可
    if (context.isFirstPlay) {
      context.isFirstPlay = false
      audioContext.onTimeUpdate((e) => {
        const lyricInfos = context.lyricInfos
        const len = lyricInfos.length

        context.currentTime = audioContext.currentTime * 1000
        // 2. 设置正确的歌词
        if (!len) return
        let lyricIndex = len - 1
        for (let i = 0; i < len; i++) {
          let infoTime = lyricInfos[i].time
          if (infoTime > audioContext.currentTime * 1000) {
            lyricIndex = i - 1
            break
          }
        }
        if (context.lyricIndex === lyricIndex || lyricIndex === -1 ) return
        context.lyricIndex = lyricIndex
      })
      audioContext.onWaiting(() => {
        // audioContext.pause()
        // 开启下面代码 点击进度条即可看到上面描述的问题
        // this.setData({
        //   isPlay: false
        // })
      })
      audioContext.onCanplay(() => {
        audioContext.pause()
        audioContext.play()
      })
      // 
      audioContext.onEnded(() => {
        // TODO: 
        this.dispatch('playNewMusicAction')
      })
    }
    },
    // 暂停、播放
    changePlayMusiceStatusAction(context) {
      context.isPlaying =  !context.isPlaying
      context.isPlaying ? audioContext.play()  : audioContext.pause()
    },
    // 播放模式
    changePlayModeAction(context) {
      let playModeIndex = context.playModeIndex
      playModeIndex++
      if (playModeIndex === 3) playModeIndex = 0
      context.playModeIndex = playModeIndex
    },

    // 上一曲 下一曲
    playNewMusicAction(context, isNext = true ) {
      let index = context.playSongIndex
      const playerList = context.playerList
  
      // 根据播放模式计算播放索引
      switch (context.playModeIndex) {
        case 0:
          index = isNext ? (index + 1) : (index - 1)
          if (index >= playerList.length) index = 0
          if (index < 0) index = playerList.length - 1
          break;
        case 1:
          index = index
          break; 
        case 2:
          index = getRandomIndex(index, playerList.length)
          break;
      }

      const newSong = context.playerList[index]
      
      this.dispatch('playMusiceBySongIdAction', newSong.id)

      context.playSongIndex = index

  
    }


  }
})

  // 获取随即索引
  function getRandomIndex(index, length) {
    let i = Math.floor(Math.random() * length)
    if (i === index) {
       i = getRandomIndex(index, length)
    } 
    return i
    


  }