# vue-turn-clock  [![npm](https://img.shields.io/npm/v/vue-turn-clock.svg)](https://www.npmjs.com/package/vue-turn-clock) [![npm](https://img.shields.io/npm/dt/vue-turn-clock.svg)](https://www.npmjs.com/package/vue-turn-clock)

这是一个简单的翻页倒计时组件，也可以是展示当前时间！

### 安装

With NPM:
```
npm install vue-turn-clock
```
With Yarn:
```
yarn add vue-turn-clock
```
With PNPM:
```
pnpm add vue-turn-clock
```

### 使用

```vue
import TurnClock from 'vue-turn-clock';

<TurnClock @over="timeOverEvent" endTime="2023-06-10" />
```

### 参数配置
| 名称 | 类型 | 默认 | 说明 |
| -- | -- | -- | -- |
| endTime | Date/Number/String | -- | 需要倒计时的时间，可以是Date对象，也可以是时间戳，亦可是一个可被转换的时间字符串 |
| formatter | String | YYYY-MM-DD HH:mm:ss | 当仅显示日期格式时，可限制显示的日期格式 |
| units | String[] | [':', ':', ':', ''] | 要给每个时间层级后面添加的字符 |
| theme | combine/separate/text | combine | 要展示的样式，`combine` :每个层级的数字合并显示，`separate` :每个层级的数字单独显示，`text` :当做纯文本格式显示

### 事件
| 事件名 | 说明 | 类型 |
| -- | -- | -- |
| over | 倒计时时间走完时触发 | Function |
