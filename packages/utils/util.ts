/*
 * @Author: limit
 * @Date: 2023-06-06 14:58:13
 * @LastEditTime: 2023-06-08 13:40:10
 * @LastEditors: limit
 * @FilePath: \vue3-demo\src\components\count-clock\util.ts
 * @Description: 由limit创建！
 */
export type DateParams = Date | string | number;
export type TimeStackDesc = {
  day: string;
  hour: string;
  min: string;
  second: string;
  diff: number;
};

/**
 ** 将传入的时间戳转化为几天几时几分几秒
 * @param diff Number 要转换的时间戳，单位毫秒
 * @returns TimeStackDesc 转换后的对象
 */
export const getTimeCountDown = (target?: DateParams, level: number = 4) => {
  const timeStack = {} as TimeStackDesc;
  const targetTime = +new Date(target ?? Date.now());
  const currentTime = +new Date();
  let diff = (targetTime + 1000 - currentTime) / 1000;
  if (targetTime < currentTime) diff = (currentTime - targetTime) / 1000;
  if (!target) {
    timeStack.day = formatDate('DD');
    timeStack.hour = formatDate('HH');
    timeStack.min = formatDate('mm');
    timeStack.second = formatDate('ss');
    timeStack.diff = currentTime;
    return timeStack;
  }
  timeStack.diff = diff;
  timeStack.day = String(Math.floor(diff / 86400)).padStart(2, '0');
  if (level >= 4) diff %= 86400;
  timeStack.hour = String(Math.floor(diff / 3600)).padStart(2, '0');
  if (level >= 3) diff %= 3600;
  timeStack.min = String(Math.floor(diff / 60)).padStart(2, '0');
  timeStack.second = String(Math.floor(diff % 60)).padStart(2, '0');
  return timeStack;
};

/**
 ** 格式化日期
 * @param template String // 格式
 * @param date DateParams // 要转化的时间
 * @returns String  // 格式化后的字符串
 */
export const formatDate = (
  template: string = 'YYYY-MM-DD HH:mm:ss',
  date: DateParams = new Date()
) => {
  const specs = 'YYYY:MM:DD:HH:mm:ss'.split(':');
  date = new Date(+new Date(date) - new Date().getTimezoneOffset() * 6e4);
  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce(
      (template, item, i) => template.split(specs[i]).join(item),
      template
    );
};
