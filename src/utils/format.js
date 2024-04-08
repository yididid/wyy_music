
export function formatTime(time){//将时间格式化为00:00
  const timeSecods = time/1000
  const minue = Math.floor(timeSecods / 60)
  const second = Math.floor(timeSecods) % 60
  /**格式化对应的时间 */
  const formatMinute = String(minue).padStart(2,'0')
  const formatSecond= String(second).padStart(2,'0')
  return `${formatMinute}:${formatSecond}`
}