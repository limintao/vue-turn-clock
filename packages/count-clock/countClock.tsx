import type { PropType } from 'vue';
import { defineComponent, onMounted, ref, toRefs } from 'vue';
import type { TimeStackDesc } from '../utils/util';
import { formatDate, getTimeCountDown } from '../utils/util';
import ClockItem from './clockItem';
import './style.less';

export default defineComponent({
  props: {
    endTime: [Date, Number, String], // 倒计时的时间值
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
  },
  emits: {
    over: () => null,
  },
  setup(props, { emit }) {
    const { endTime, units, theme, formatter } = toRefs(props);
    const timer = ref<number>();
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
     * 开始倒计时动画
     */
    const play = () => {
      clearInterval(timer.value);
      timer.value = window.setInterval(() => {
        if (theme.value === 'text' && !props.endTime) newTimeFormat.value = formatDate(formatter?.value);
        else {
          const timeResult = getTimeCountDown(endTime?.value);
          const timeKeys = ['second', 'min', 'hour', 'day'] as Array<
            keyof TimeStackDesc
          >;
          const arr: Array<string> = [];
          units.value.map((_key, index) => {
            const reverseIndex = units.value.length - (index + 1);
            if (theme.value === 'combine') return arr.push(timeResult[timeKeys[reverseIndex]] as string);
            return arr.push(
                ...(timeResult[timeKeys[reverseIndex]] as string).split('')
              );
          });
          timeArr.value = arr;
          if (timeResult.diff <= 0) {
            clearInterval(timer.value);
            emit('over');
          }
        }
      }, 1000);
    };

    onMounted(() => {
      play();
    });

    return () => (
      <div class="count-clock-container">
        {theme.value !== 'text' || endTime.value ? (
          <div class="count-down-view">
            {timeArr.value.map((time, index) => (
              <>
                {theme.value !== 'text' ? (
                  <ClockItem
                    current={time}
                    single={theme.value === 'separate'}
                  />
                ) : (
                  <div class="count-down-text">
                    { time }
                  </div>
                )}
                {hasTimeUnit(index) && getTimeUnit(index) && (
                  <div class="count-clock-time-unit">
                    <span>{ getTimeUnit(index) }</span>
                  </div>
                )}
              </>
            ))}
          </div>
        ) : (
          <div class="count-down-text">{ newTimeFormat.value }</div>
        )}
      </div>
    );
  },
});
