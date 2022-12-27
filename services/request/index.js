// 封装request请求

class YMRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  request(options) {
    return new Promise((resolve, reject) => {
      const { url, ...args } = options
      wx.request({
        url: this.baseUrl + url,
        ...args,
        success(res) {
          resolve(res.data)
        },
        fail: reject,
        complete(res) {
          const { code } = res.data
          if (code !== 200) return wx.showToast({
            title: '八嘎',
            icon: 'error'
          })
        }
      })
    })
  }

  get(options) {
    return this.request({
      method: 'get',
      ...options
    })
  }

  post(options) {
    return this.request({
      method: 'post',
      ...options
    })
  }
}

// export const http = new YMRequest('http://codercba.com:9002/')
export const http = new YMRequest('http://www.wscym.top:3000/')