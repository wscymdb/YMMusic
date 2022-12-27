import { HYEventStore } from 'hy-event-store'
import * as http from '../services/api/main-music'

export const rankingMap = {
  recommendList: 3778678, // 推荐
  originalList: 2884035, // 原创
  surgeList: 19723756, // 飙升
  newList: 3779629, // 新歌
}

export const useRankingStore = new HYEventStore({
  state: {
   recommendList: [],
   originalList: [],
   surgeList: [], 
   newList: [],
  },
  actions: {
     fetchRankingListAction(ctx) {
      for (const key in rankingMap) {
        const params = { id: rankingMap[key] }
        http.getRecommendList(params).then(res => {
          ctx[key] = res.playlist
        })
      }
    }
  }
})


