export function parseLyric(lyricString) {
  const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  const lrcLine = lyricString.split('\n')
  const lyric = []
  for (let lrc of lrcLine) {
    const res = timeReg.exec(lrc)
    
    if(!lrc) continue
    const mm = res[1] * 60 * 1000
    const ss = res[2] * 1000
    const ms = res[3].length === 2 ? res[3] * 10 : res[3] * 1
    const time = mm + ss + ms
    const text = lrc.replace(timeReg, '')
    if(!text) continue
    lyric.push({time, text})
  }
 return lyric
}