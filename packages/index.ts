/*
 * @Author: limit
 * @Date: 2023-06-08 15:14:03
 * @LastEditTime: 2023-06-08 20:05:08
 * @LastEditors: limit
 * @FilePath: \vue-turn-clock\packages\index.ts
 * @Description: 由limit创建！
 */
import { withInstall } from './utils/install';
import CountClock from './count-clock/countClock';

export const TurnClock = withInstall(CountClock);

export default TurnClock;
