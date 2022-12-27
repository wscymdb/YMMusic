Component({
  properties: {
    itemData: {
      type: Array,
      value: []
    }
  },
  methods: {
    onItemTap(e) {
      const id = e.currentTarget.dataset.id
      this.triggerEvent('onItemTap', {id})
    }
  }
})