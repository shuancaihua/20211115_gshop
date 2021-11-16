<template>
  <div class="star" :class="'star-' + size">
    <span
      class="star-item"
      v-for="(sc, index) in starClass"
      :key="index"
      :class="sc"
    ></span>
    <!-- <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span> -->
  </div>
</template>

<script>
const STAR_ON = "on"; //亮星类名
const STAR_HALF = "half"; //半星类名
const STAR_OFF = "off"; // 无星类名
export default {
  props: {
    score: Number,
    size: Number,
  },
  computed: {
    starClass() {
      const { score } = this;
      // 保存星类名的数组
      const sc = [];
      let scoreInteger = Math.floor(score); //亮星
      for (let i = 0; i < scoreInteger; i++) {
        sc.push(STAR_ON);
      }

      if (score - scoreInteger > 0.5) {
        // 半星只有两种情况0或者1，
        sc.push(STAR_HALF);
      }

      if (sc.length < 5) {
        // 无星
        sc.push(STAR_OFF);
      }

      return sc;
    },
  },
  data() {
    return {};
  },
};
</script>
 
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.star // 2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../../static/images/stars/star48_on')
      &.half
        bg-image('../../../static/images/stars/star48_half')
      &.off
        bg-image('../../../static/images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../../static/images/stars/star36_on')
      &.half
        bg-image('../../../static/images/stars/star36_half')
      &.off
        bg-image('../../../static/images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('../../../static/images/stars/star24_on')
      &.half
        bg-image('../../../static/images/stars/star24_half')
      &.off
        bg-image('../../../static/images/stars/star24_off')
</style>