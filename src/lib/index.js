export const baseVoluneValue = 5;
export const prefixCls = "vue-music";
export const SINGLE_LOOP = "single_loop";
export const LIST_LOOP = "list_loop";
export const ALL_LOOP = "all_loop";

export const generateUUID = () => {
  return "xxxxxxxxx-xxxx-4xxx".replace(/[xy]/g, (c) => {
    let v, r;
    r = (Math.random() * 16) | 0;
    v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const coverTimeHHMMSS = (val) => {
  let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);
  return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
};

/**
 * @param  {Number} len 歌曲列表长度
 * @param  {Number} curIdx 当前下标
 */
export const nextIdx = (len, curIdx) => {
  if (len === 0) return curIdx;
  return curIdx === len - 1 ? 0 : curIdx + 1;
};

/**
 * @param  {Number} len 歌曲列表长度
 * @param  {Number} curIdx 当前下标
 */
export const prevIdx = (len, curIdx) => {
  if (len === 0) return curIdx;
  return curIdx === 0 ? len - 1 : curIdx - 1;
};

export const onceOption = {
  once: true,
};
