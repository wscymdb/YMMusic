// components/play-list/play-list.js
import { playerStore } from "../../stores/playerStore"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },


  data: {
  id: '',
  playerList: []
  },

  lifetimes: {
    attached() {
      playerStore.onStates(['id', 'playerList'],  ({id, playerList}) => {
        if (playerList) {
          this.setData({ playerList})
        }
        if (id) {
          this.setData({ id })
        }
      })    
    }
  },

  methods: {
    onClose() {
      this.triggerEvent('close')
    },
    handleTap(e) {
      const id = e.currentTarget.dataset.id
      playerStore.dispatch('playMusiceBySongIdAction', id)
    },

  }
})
