/*
 * @Author: limit
 * @Date: 2023-06-18 17:40:29
 * @LastEditTime: 2024-03-18 15:51:51
 * @LastEditors: limit
 * @FilePath: /vue-turn-clock/packages/utils/install.ts
 * @Description: 由limit创建！
 */
import type { Plugin, App } from 'vue';

export type WithInstallType<T> = T & Plugin;

export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  (main as WithInstallType<T>).install = (app: App): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }
  return main as WithInstallType<T> & E;
};
