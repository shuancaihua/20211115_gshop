<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: index === currentIndex }"
            @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <img v-if="good.icon" class="icon" :src="good.icon" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food" />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food :food="food" ref="food"/>
    <ShopCart />  
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
import Food from '../../../components/Food/Food.vue';
import CartControl from '../../../components/CartControl/CartControl.vue';
import ShopCart from '../../../components/ShopCart/ShopCart.vue'
export default {
  components: {
    CartControl,
    Food,
    ShopCart
  },
  data() {
    return {
      scrollY: 0, //右侧滑动时的Y轴坐标
      tops: [], //所有右侧分类li的top组件的数组（列表第一个显示后就不再变化）
      food:{},//food对象
    };
  },
  computed: {
    ...mapState(["goods"]),
    // 计算得到当前分类的下标
    currentIndex() {
      // 初始化和相关数据发生变化
      // 1.得到条件数据
      const { scrollY, tops } = this;

      // 2.根据条件计算产生一个结果
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1];
      });
      // 3.返回结果
      return index;
    },
  },
  mounted() {
    this.$store.dispatch("getShopGoods", () => {
      //数据更新后执行
      this.$nextTick(() => {
        //列表数据更新显示后执行
        // 列表显示之后创建
        this._initScroll();
        this._initTops();
      });
    });
  },
  methods: {
    // 初始化滚动
    _initScroll() {
      new BScroll(".menu-wrapper", {
        click: true,
      });

      this.foodScroll = new BScroll(".foods-wrapper", {
        probeType: 2, // 因为惯性滑动不会触发
        click: true,
      });

      // 给右侧列表绑定scroll监听
      this.foodScroll.on("scroll", ({ x, y }) => {
        // console.log("scroll", x, y);
        // abs - 绝对值
        this.scrollY = Math.abs(y);
      });

      // 给右侧列表绑定scroll结束的监听
      this.foodScroll.on("scrollEnd", ({ x, y }) => {
        // console.log("scrollEnd", x, y);
        this.scrollY = Math.abs(y);
      });
    },
    // 初始化tops
    _initTops() {
      // 1.初始化tops
      const tops = [];
      // 2.收集
      let top = 0;
      // 第一次默认高度为0
      tops.push(0);
      //
      const lis = this.$refs.foodsUl.getElementsByClassName("food-list-hook");
      // const lis = this.$refs.foodsUl.children;  等同如下代码
      //将伪类转换成数组
      Array.prototype.slice.call(lis).forEach((li) => {
        top += li.clientHeight;
        // 把li中所有的可见高度全部叠加到top
        console.log("top", top, "offsetTop", li.offsetTop);
        tops.push(top);
      });

      // 将这个结果返回
      console.log("tops", tops);
      // 3.更新数组
      this.tops = tops;
    },

    clickMenuItem(index) {
      console.log(index);
      // 使用右侧滑动列表到对应的位置
      // 得到目标位置的scrollY
      const scrollY = this.tops[index];
      // 立即更新scrollY(让点击的分类项称为当前分类)
      this.scrollY = scrollY;
      // 平滑滑动右侧列表
      this.foodScroll.scrollTo(0, -scrollY, 300);
    },
    // 显示点击的food
    showFood(food){
      // 把当前的food传入到Food组件
      this.food = food
      console.log('food',food);
      // 显示Food组件(父组件调用子组件对象的方法)
      this.$refs.food.toggleShowFood();
    }
  },
};
/**
 * 功能：
 *  实现2个列表滑动
 *  当前分类
 *  当滑动右侧列表时，更新当前分类
 *  点击某个分类向，右侧列表滑动到对应位置
 *
 *  分析：
 *  类名：current 表示当前分类
 *  设计一个计算属性：currentIndex
 *  根据那些数据计算？
 *      scrollY:右侧滑动的Y轴坐标
 *      tops:所有右侧分裂li的top组成的数组（列表第一次显示后不在变化）
 *
 * 编码：
 *    1.在滑动过程中，实时收集scrollY
 *    2.列表第一次显示，收集tops
 *    3.实现currentIndex的计算逻辑
 * */
</script>
 
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 275px
  bottom 46px
  width 100%
  background #fff
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        color $green
        font-weight 700
        .text
          border-none()
      .icon
        // display inline-block
        vertical-align middle
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
      .text
        display table-cell
        width 56px
        vertical-align middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>

