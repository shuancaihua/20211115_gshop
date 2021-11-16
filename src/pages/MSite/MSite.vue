<template>
  <div>
    <div class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
        <template>
          <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </span>
          <span class="header_login" slot="right">
            <span class="header_login_text">登录|注册</span>
          </span>
        </template>
      </HeaderTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(categorys, index) in categorysArr"
              :key="index"
            >
              <a
                href="javascript:"
                class="link_to_food"
                v-for="(category, index) in categorys"
                :key="index"
              >
                <div class="food_container">
                  <img :src="baseImageUrl+category.image_url" />
                </div>
                <span>{{ category.title }}</span>
              </a>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>
      <!--首页附近商家-->
      <div class="msite_shop_list">
        <div class="shop_header">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="shop_header_title">附近商家</span>
        </div>
        <ShopList />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import HeaderTop from "../../components/HeaderTop/HeadTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";
export default {
  components: {
    HeaderTop,
    ShopList,
  },
  data(){
    return {
       baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  computed: {
    ...mapState(["address", "categorys"]),
    categorysArr() {
      console.log(this);
      const { categorys } = this;
      let arr = []; //二维数组
      let minArr = []; //小数组
      categorys.forEach((c) => {
        // 二维数组中的小数组不能超过8
        if (minArr.length === 8) {
          minArr = [];
        }
        // 把minArr添加到arr中形成二维数组
        if (arr.length === 0) {
          arr.push(minArr);
        }
        minArr.push(c);
      });
      return arr;
    },
  },
  mounted() {
    this.$store.dispatch("getCategorys");

    // 创建一个Swiper实例对象，来实现轮播
    new Swiper(".swiper-container", {
      // 可以循环播放
      loop: true,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },
    });
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
&.msite // 首页
  width 100%
  .header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .icon-sousuo
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>