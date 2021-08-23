export function padZeroLeft(str, num) {
  let res = str;
  for (let i = 0; i < num; i += 1) {
    res = `0${res}`;
  }
  return res.slice(-1 * num);
}

export function formatSecond(secStr) {
  const seconds = parseInt(secStr, 10);
  const min = parseInt(seconds / 60, 10);
  const sec = padZeroLeft(`${seconds % 60}`, 2);
  return `${min}:${sec}`;
}
