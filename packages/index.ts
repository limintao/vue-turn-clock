/*
 * @Author: limit
 * @Date: 2023-06-18 17:40:29
 * @LastEditTime: 2024-03-18 16:15:19
 * @LastEditors: limit
 * @FilePath: /vue-turn-clock/packages/index.ts
 * @Description: 由limit创建！
 */
import { withInstall, type WithInstallType } from './utils/install';
import CountClock from './count-clock/countClock';

export default withInstall(CountClock) as WithInstallType<typeof CountClock>;