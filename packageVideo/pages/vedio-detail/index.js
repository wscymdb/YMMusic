import * as http from '../../../services/api/main-video'
Page({
  data: {
    id: '',
    url: '',
    danmuList: [],
    recommendVideoList: [],
    detail: null,
  },
  onLoad(options) {
    const { id } = options
    this.setData({
      id
    })
    this.createDanmu()
    this.getMvUrlById()
    this.getMvDeatilById()
    this.getRecommendById()  
  },

  // 根据id获取视频URL
  async getMvUrlById() {
    const params = {
      id: this.data.id
    }
    const {data} = await http.getMvUrlById(params)
    this.setData({
      url: data.url
    })
  },

  // 根据id获取视频详情
  async getMvDeatilById() {
    const params = {mvid: this.data.id}
    const { data } = await http.getMvDeatilById(params)
    this.setData({
      detail: data
    })
  },
  // 根据id获取推荐视频
  async getRecommendById() {
    const params = {id: this.data.id}
    const { data } = await http.getRecommendById(params)
    this.setData({
      recommendVideoList: data
    })
  },

  // 生成弹幕
  createDanmu() {
    const danmuList = []
    const danmuContent = ['哈哈', '好棒', '真厉害', '加油', '顺风顺水', '2023加油', '永远不胖', '永远健康']
    const danmuColor = ['#f00', '#aff', '#ffa']
    for(let i = 0; i < 100; i++) {
      danmuList.push(
        {
          text: danmuContent[Math.floor( (Math.random()* 1 ) * danmuContent.length)],
          color:  danmuColor[Math.floor( (Math.random()* 1 ) * danmuColor.length)],
          time: i
        }
      )
    }
    this.setData({
      danmuList
    })
  }
})