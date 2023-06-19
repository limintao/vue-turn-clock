import { defineComponent, ref, toRefs, watch } from 'vue';
import './style.less';

export default defineComponent({
  props: {
    current: {
      type: [Number, String],
      default: 0,
    },
    single: {
      type: Boolean,
      default: false,
    },
    bgColor: String,
  },
  setup(props) {
    const { current, single } = toRefs(props);
    const prevNumber = ref<number | string>(props.current);
    const isAnimate = ref(false);

    // 动画结束事件
    const onAnimateEnd = () => {
      isAnimate.value = false;
      prevNumber.value = current.value;
    };

    watch(
      current,
      () => {
        isAnimate.value = !isAnimate.value;
      },
      { immediate: true }
    );

    return () => (
      <div
        class={{
          animation: isAnimate.value,
          single: single.value,
          'count-item-view': true,
        }}
      >
        <div class="count-clock-current" style={props.bgColor && { 'background-color': props.bgColor }}>
          <div
            class="count-clock-up"
            onAnimationend={onAnimateEnd}
          >
            { prevNumber.value }
          </div>
          <div class="count-clock-down">{ prevNumber.value }</div>
        </div>
        <div class="count-clock-halving-line"></div>
        <div class="count-clock-next" style={props.bgColor && { 'background-color': props.bgColor }}>
          <div class="count-clock-up">{ current.value }</div>
          <div class="count-clock-down">{ current.value }</div>
        </div>
      </div>
    );
  },
});
