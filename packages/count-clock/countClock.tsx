import type { PropType } from 'vue';
import { defineComponent, onMounted, ref, toRefs } from 'vue';
import type { TimeStackDesc } from '../utils/util';
import { formatDate, getTimeCountDown } from '../utils/util';
import ClockItem from './clockItem';
import './style.less';

export default defineComponent({
  props: {
    endTime: [Date, Number, String], // 倒计时的时间值
    startTime: {
      type: [Date, Number, String],
      default: Date.now(),
    }, // 设置系统当前时间
    formatter: String, // 日期格式，仅theme为text时生效
    units: {
      // 时间单位，显示在中间的文字
      type: Array as PropType<Array<string>>,
      default: () => [':', ':', ':', ''],
    },
    theme: {
      type: String as PropType<'combine' | 'separate' | 'text'>,
      default: 'combine',
    },
    color: String, // 文字颜色
    bgColor: String, // 卡片的背景颜色
  },
  emits: {
    over: () => null,
  },
  setup(props, { emit }) {
    const { endTime, units, theme, formatter } = toRefs(props);
    const timer = ref<number>(); // 定时器
    const currentTime = ref(props.startTime);
    const newTimeFormat = ref<string>(); // 仅显示时间格式的时间
    const timeArr = ref<Array<string>>(
      theme.value === 'combine'
        ? new Array(units?.value?.length).fill('00')
        : new Array(units?.value?.length * 2).fill('0')
    );

    // 判断当前下边是否要跟单位
    const hasTimeUnit = (index: number): boolean =>
      theme.value === 'combine' || Boolean(index && index % 2 !== 0);

    // 获取当前位置的单位
    const getTimeUnit = (index: number): string => {
      if (theme.value === 'combine') return units.value[index];
      return units.value[Math.floor(index / 2)];
    };

    if (units?.value?.length > 4) units.value = units.value.slice(-4);

    /**
     ** 设置时间
     */
    const setCurrentTime = () => {
      // 检查主题是否为文本且没有设置结束时间
      // 格式化当前时间并更新新的时间格式
      if (theme.value === 'text' && !props.endTime) newTimeFormat.value = formatDate(formatter?.value, currentTime.value);
      else {
        // 获取倒计时结果
        const timeResult = getTimeCountDown(endTime?.value, currentTime.value);
        // 定义时间单位的顺序
        const timeKeys = ['second', 'min', 'hour', 'day'] as Array<
          keyof TimeStackDesc
        >;
        // 存储时间单位的数组
        const arr: Array<string> = [];
        // 遍历时间单位
        units.value.map((_key, index) => {
          // 计算反向索引
          const reverseIndex = units.value.length - (index + 1);
          // 如果主题为组合，则将时间单位直接添加到数组中
          if (theme.value === 'combine') return arr.push(timeResult[timeKeys[reverseIndex]] as string);
          // 如果主题不是组合，则将时间单位拆分为单个字符，并添加到数组中
          return arr.push(
              ...(timeResult[timeKeys[reverseIndex]] as string).split('')
            );
        });
        // 更新时间数组
        timeArr.value = arr;
        // 如果倒计时已结束，清除定时器并触发事件
        if (timeResult.diff <= 0) {
          clearInterval(timer.value);
          emit('over');
        }
      }
      // 更新当前时间
      currentTime.value = +new Date(currentTime.value) + 1000;
      // 返回函数本身
      return setCurrentTime;
    };

    /**
     * 开始倒计时动画
     */
    const play = () => {
      timer.value && clearInterval(timer.value);
      timer.value = window.setInterval(setCurrentTime(), 1000);
    };

    // 获取单位的颜色
    const getUnitColor = (): { color: string } | undefined => {
      if (props.color && theme.value === 'text') return { color: props.color };
      if (props.bgColor) return { color: props.bgColor };
    };

    onMounted(() => {
      play();
    });

    return () => (
      <div class="count-clock-container">
        {theme.value !== 'text' || endTime.value ? (
          <div
            class={{ 'count-down-view': true, 'count-down-view--text': theme.value === 'text' }}
            style={props.color && { color: props.color }}
          >
            {timeArr.value.map((time, index) => (
              <>
                {theme.value !== 'text' ? (
                  <ClockItem
                    current={time}
                    bgColor={props.bgColor}
                    single={theme.value === 'separate'}
                  />
                ) : (
                  <div class="count-down-text" style={props.color && { color: props.color }}>
                    { time }
                  </div>
                )}
                {hasTimeUnit(index) && getTimeUnit(index) && (
                  <div class="count-clock-time-unit" style={getUnitColor()}>
                    <span>{ getTimeUnit(index) }</span>
                  </div>
                )}
              </>
            ))}
          </div>
        ) : (
          <div class="count-down-text" style={props.color && { color: props.color }}>{ newTimeFormat.value }</div>
        )}
      </div>
    );
  },
});
