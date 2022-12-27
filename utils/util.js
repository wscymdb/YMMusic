export function querySelect(selector) {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec((res) => {
     resolve(...res)
    })
  })
}

// 实现尾部控制相关-取消和返回值
export  function ymThrottle(
cb,
interval = 100,
{ leading = true, traling = false } = {}
) {
  let startTime = 0;
  let timer = null;
  const _throttle = function (...args) {
      return new Promise((resolve, reject) => {
          try {
              const nowTime = Date.now();

              if (!leading && startTime === 0) {
                  startTime = nowTime;
              }

              const waitTime = interval - (nowTime - startTime);

              if (waitTime <= 0) {
                  if (timer) clearTimeout(timer);
                  const res = cb.apply(this, args);
                  resolve(res);
                  startTime = nowTime;
                  timer = null;
                  return;
              }
              // 实现尾部取消
              // 在间隔点之后添加一个定时器
              // 如果是间隔点那么就会取消这个定时器
              if (traling && !timer) {
                  timer = setTimeout(() => {
                      const res = cb.apply(this, args);
                      resolve(res);
                      startTime = Date.now();
                      timer = null;
                  }, waitTime);
              }
          } catch (error) {
              reject(error);
          }
      });
  };
  // 取消
  _throttle.cancel = function () {
      if (timer) clearTimeout(timer);
  };
  return _throttle;
}