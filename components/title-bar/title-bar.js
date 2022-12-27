// components/title-bar/title-bar.js
Component({
  properties: {
   
  },
  options: {
    multipleSlots: true
  },
  methods: {
    onMoreTap() {
      this.triggerEvent('onMoreTap')
    }
  }
})
