import { http } from '../request/index'

export const getHomeBanner = (data) => {
  return http.get({ 
    url:'banner', 
    data
   })
}
export const getRecommendList = (data) => {
  return http.get({ 
    url:'playlist/detail', 
    data
   })
  }

  export const getHotSongList = (data) => {
    return http.get({ 
      url:'playlist/hot',
      data
     })
  }

export const getSongList = ({cat= '全部', limit= 10, offset=0} = {}) => {
  return http.get({ 
    url:'top/playlist', 
    data: {
      cat,
      limit,
      offset
    }
   })
}

export const getMusicDetail = (data) => {
  return http.get({ 
    url:'song/detail',
    data
   })
}

export const getLyricDetail = (data) => {
  return http.get({ 
    url:'lyric',
    data
   })
}