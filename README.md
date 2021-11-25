# day01
## 1. 项目开发准备
    项目描述
    技术选型
    API接口
    你能从此项目中学到什么?

## 2. 开启项目开发
    使用脚手架创建项目
    安装所有依赖/指定依赖
    开发环境运行
    生产环境打包与发布

## 3. 搭建项目整体界面结构
    stylus的理解和使用
        结构化, 变量, 函数/minxin(混合)
    vue-router的理解和使用
        router-view/router-link/keep-alive
        $router: 路由器对象, 包含一些操作路由的功能函数, 来实现编程式导航(跳转路由)
        $route: 当前路由对象, 一些当前路由信息数据的容器, path/meta/query/params
    项目路由拆分
    底部导航组件: FooterGuide
    导航路由组件: Msite/Search/Order/Profile

## 4. 抽取组件
    头部组件: HeaderTop, 通过slot来实现组件通信标签结构
    商家列表组件: ShopList
    
## 5. 登陆路由组件
     静态组件
     FooterGuide的显示/隐藏: 通过路由的meta
     
## 6. 后台项目
    启动后台项目: 理解前后台分离
    测试后台接口: 使用postman
    修正接口文档

## 7. 前后台交互
    ajax请求库: axios
    ajax请求函数封装: axios + promise
    接口请求函数封装: 每个后台接口

    # day02
## 1. 异步数据
    封装ajax: 
        promise+axios封装ajax请求的函数
        封装每个接口对应的请求函数(能根据接口定义ajax请求函数)
        解决ajax的跨越域问题: 配置代理, 对代理的理解
    vuex编码
        创建所有相关的模块: store/index|state|mutations|actions|getters|mutation-types
        设计state: 从后台获取的数据
        实现actions: 
            定义异步action: async/await
            流程:　发ajax获取数据, commit给mutation
        实现mutations: 给状态赋值
        实现index: 创建store对象
        main.js: 配置store
    组件异步显示数据
        在mounted()通过$store.dispatch('actionName')来异步获取后台数据到state中
        mapState(['xxx'])读取state中数据到组件中
        在模板中显示xxx的数据
    模板中显示数据的来源
        data: 自身的数据(内部改变)
        props: 外部传入的数据(外部改变)
        computed: 根据data/props/别的compute/state/getters
    异步显示轮播图
        通过vuex获取foodCategorys数组(发请求, 读取)
        对数据进行整合计算(一维变为特定的二维数组)
        使用Swiper显示轮播, 如何在界面更新之后创建Swiper对象?
            1). 使用回调+$nextTick()
            2). 使用watch+$nextTick()	
    		
## 2. 登陆/注册: 界面相关效果
    a. 切换登陆方式
    b. 手机号合法检查
    c. 倒计时效果
    d. 切换显示或隐藏密码
    g. 前台验证提示
    
## 3. 前后台交互相关问题
    1). 如何查看你的应用是否发送某个ajax请求?  
        浏览器的network
    2). 发ajax请求404
        请求的路径的对
        代理是否生效(配置和重启)
        服务器应用是否运行
    3). 后台返回了数据, 但页面没有显示?
        vuex中是否有
        组件中是否读取

        
# day03
## 1. 完成登陆/注册功能
    1). 2种方式
       手机号/短信验证码登陆
       用户名/密码/图片验证码登陆
    2). 登陆的基本流程
       表单前台验证, 如果不通过, 提示
       发送ajax请求, 得到返回的结果
       根据结果的标识(code)来判断登陆请求是否成功
           1: 不成功, 显示提示
           0. 成功, 保存用户信息, 返回到上次路由
    3). vue自定义事件
       绑定监听: @eventName="fn"  function fn (data) {// 处理}
       分发事件: this.$emit('eventName', data)
    4). 注意:
       使用network查看请求(路径/参数/请求方式/响应数据)
       使用vue的chrome插件查看vuex中的state和组件中的数据
       使用debugger语句调试代码
       实参类型与形参类型的匹配问题
       
## 2. 搭建商家整体界面
    1). 拆分界面路由
    2). 路由的定义/配置|使用

## 3. 模拟(mock)数据/接口
    1). 前后台分离的理解
    2). mockjs的理解和使用
    3). jons数据设计的理解
     
## 4. ShopHeader组件
    1). 异步显示数据效果的编码流程
        ajax
          ajax请求函数
          接口请求函数
        vuex
          state
          mutation-types
          actions
          mutations
        组件
          dispatch(): 异步获取后台数据到vuex的state
          mapState(): 从vuex的state中读取对应的数据
          模板中显示
    2). 初始显示异常
        情况1: Cannot read property 'xxx' of undefined"
        原因: 初始值是空对象, 内部没有数据, 而模块中直接显示3层表达式
        解决: 使用v-if指令
        
        情况2: Cannot read property 'xxx' of null"
        初始化数据一开始不能为null，为null就会报错
     
    3). vue transition动画

# day04
## 1. ShopGoods组件
    1). 动态展现列表数据
        从state中读取goods列表
    2). 基本滑动:
        使用better-scroll
        理解其基本原理
        创建BScroll对象的时机
          watch + $nextTick()
          callback + $nextTick

    3). 滑动右侧列表, 左侧同步更新
        better-scroll禁用了原生的dom事件, 使用的是自定义事件
        绑定监听: scroll/scrollEnd
        滚动监听的类型: probeType
        列表滑动的3种类型
            手指触摸
            惯性
            编码
        分析:
            类名: current 标识当前分类
            设计一个计算属性: currentIndex
            根据哪些数据计算?
              scrollY: 右侧滑动的Y轴坐标 (滑动过程时实时变化)
              tops: 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
        编码:
            1. 在滑动过程中, 实时收集scrollY
                   实现基础的滑动，让左边的导航和右边的内容区域都滑动
                        - new Bscroll()的实例
                        - 第二步给这个实例派发滑动事件 const 变量名 = new BScroll(类名,() => {
                                                        probeType:2 //  决定是否派发 scroll 事件 因为惯性滑动不会触发
                                                        click:true // 禁用了原生的dom事件
                                                    })
                        - 第三步，给这个变量绑定scroll事件，因为probeType只是派发scroll事件，如果不写scroll事件，就不能得到当前滑动的高度
                            this.foodScroll.on("scroll", ({ x, y }) => {
                                // console.log("scroll", x, y);
                                // abs - 绝对值
                                 this.scrollY = Math.abs(y);  // 拿到当前滑动的值  abs 绝对值
                            });
            2. 列表第一次显示后, 收集tops
                第一步：    定义一个数组接收所有的高度，定义第一个li距离的高度top为0，并把它添加到tops数组中作为第一个元素
                第二步：    收集所有的li元素，并把结果集由原来的伪数组转换成真数组(Array.prototyep.slice.call(lis))
                第三步：    循环lis数组，并把lis中的每个元素的可见高度和top叠加
                第三步:     每叠加一次都push到tops数组中去
                第四步：    最后更新这个tops的数组 
                        const tops = [];
                        let top = 0;
                        const lis = this.$refs.foodUl.getElementByclassNam('food-list-hook')
                        Array/prototype.slice.call(lis).forEach((li) => {
                            top += li.clicentHeight;
                            tops.push(top);//添加每个的li到顶部的高度
                        })
                        this.tops = tops;
            3. 实现currentIndex的计算逻辑：比较每一个的高度和收集的高度是否相等以及大于等于
                第一步；拿到当前滑动的高度和收集每个高度的数组tops
                第二步：判断当前的高度在数组tops的那个范围使用findIndex
                第三步：判断的条件：当前的这个高度要大于等于当前的这个top,同时又要小下一个top值
                第四步：返回结果集：返回当前的索引
                    const {scrollY,tops } = this;
                    const index = tops.findIndex((top,index) => {
                        return scrollY >= top && scrollyY < tops[index + 1]
                    })
                    return index
    4). 点击左侧列表项, 右侧滑动到对应位置
        第一步：给左侧列表绑定点击事件，并传入index
        第二步: 当前这个index设置成tops的index,拿到滚动目标的高度（因为这个index和tops数组的顺序一致）
        第三步：设置当前滑动的高度  = 滚动目标的高度（滚动目标的高度此时为负数）
        第四步：给BScroll实例对象设置滚动指定位置的方法scrollTo(x轴,y轴,滚动的时长)
                 scrollTo(滚动的X轴位置,-滚动目标Y轴位置 , 滚动时长)
                clickMenuItem(index){
                    const scrollY = this.tops[index]; // 此时为负数
                    this.scrollY = scrollY;
                    this.foodScroll.scrollTo(0,-scrollY,300)
                }
        解决惯性滑动的bug:给BScroll实例对象添加结束监听事件
            1、给BScroll实例对象添加结束监听事件
            2、并把滑动的高度更新给记录滑动高度的变量
             // 给右侧列表绑定scroll结束的监听
            this.foodScroll.on("scrollEnd", ({ x, y }) => {
                // console.log("scrollEnd", x, y);
                this.scrollY = Math.abs(y);
            });


## 2. CartControl组件
    1). 问题: 更新状态数据, 对应的界面不变化
        原因: 一般方法给一个已有绑定的对象中添加一个新的属性, 这个属性没有数据绑定
        解决: 
            Vue.set(obj, 'xxx', value)才有数据绑定
            this.$set(obj, 'xxx', value)才有数据绑定

            CartControl组件:
                第一步：分析需要传递进来的数据  food(因为要对每个food的数量进行加减)
                第二步：判断是否添加，点击添加的时传入true,点击减少的时传入false,在把food传入actions中updateFoodCount
                第三步：根据传进来的布尔值判断是否添加
                    是添加的话，把事件提交给mutations事件中的INCREMENT_FOOD_COUNT，并把food数据传递过去
                    不是添加的话，把事件提交给mutations事件中的DECREMENT_FOOD_COUNT，并把food数据传递过去
                第四步：添加的逻辑
                        - 给每个food添加一个count，进行+1，在添加之前首先判断当前是否有count属性
                        没有的情况添加：
                            - 但是每个food中本身是没有这个count属性的，添加上去之后Vue是不能实时监听他的属性,所以使用Vue.set(变量,属性名,属性值)
                            - Vue.set(food,'count',1)
                        有的情况：
                            直接food.count++;
                            
                       第一步： 在CartControl组件中接收food参数，data中定义是否添加isAdd:false
                             updateFoodCount(isAdd) {
                                //  isAdd判断是否是增加
                                this.$store.dispatch("updateFoodCount", { isAdd, food: this.food });
                             }, 
                        第二步：在actions.js中判断是否添加，添加提交到INCREMENT_FOOD_COUNT，否则DECREMENT_FOOD_COUNT
                             // 更新food中的count
                                updateFoodCount({ commit }, { isAdd, food }) {
                                    // 如果isAdd为true，表示增加，否则减少
                                    if (isAdd) {
                                        commit(INCREMENT_FOOD_COUNT, { food })
                                    } else {
                                        commit(DECREMENT_FOOD_COUNT, { food })
                                    }
                                },
                        第三步：添加的情况
                                根据传递过来的food数据，首先判断当前这个food有没有count属性，
                                没有count属性：
                                       Vue.set(food, 'count', 1)
                                有count属性：
                                         food.count++

                                [INCREMENT_FOOD_COUNT](state, { food }) {
                                    if (!food.count) {
                                        Vue.set(food, 'count', 1)
                                        // 初始化的时候把数据添加进去
                                        state.cartFoods.push(food)
                                    } else {
                                        food.count++
                                    }
                                },
                         第三步：不是添加的情况
                            根据传递过来的food数据，首先判断当前这个food有没有count属性，
                                  有count属性：
                                    - 自减
                                    - 当count的值为0时，清空当前的这个food数据，这样count每减少一个，就删掉一个cartFoods数据

                                  [DECREMENT_FOOD_COUNT](state, { food }) {
                                    if (food.count) {
                                        food.count--;
                                        // 将food从cartFoods中移除
                                        if (food.count === 0) {
                                            state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
                                        }
                                    }
                                },
            
## 3. ShopCart组件
    1). 使用vuex管理购物项数据: cartFoods
            在添加数据的初始化时，往cartFoods中push添加数据
            后面的是值的变化而不是地址的变化,所以后面的数据就直接添加进去了
    2). 解决几个功能性bug
        1、计算出所有物品的总价格和总数量
            - 总价格和总数量做计算属性，在getters
                1、通过获取所有的cartFoods中的所有数据
                2、通过reduce数组高阶函数这个进行数据的累加
                3、返回结果
                    totalCount(state) {
                        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
                    },
            - 分析购物车列表下面的文字有三种状态（购物车列表底部栏的信息文字的显示）
                初始化的状态:价格为0， 店家的配送费    20元起送
                还差多少元起送：当前价格小于最低配送费，还差多少元起送
                超过最低的配送，显示去结算
                通过计算属性不同的文字和不同颜色的显示
                 - 不同颜色的显示
                    - 从this中解构出所需要的数据totalPrice totalCount
                    - 根据条件判断  
                        。 当totalPrice等于0时，直接返回商家的最低配送费
                        。 当totalPrice小于最低配送费时，用最低配送费减去totalPrice，得到还差多少元起送
                        。 当totalPrice大于最低配送费显示去结算文本
                            const { totalPrice } = this;
                            const { minPrice } = this.info;
                            if (totalPrice === 0) {
                                return `￥${minPrice}元起送`;
                            } else if (totalPrice < minPrice) {
                                return `还差${minPrice - totalPrice}元起送`;
                            } else {
                                return "去结算";
                            }
                 - 不同颜色的显示
                     - 获取总价格和最低配送费
                     - 如果总价格大于最低配送，显示enough，否则的话显示not-enough
                          const { totalPrice } = this;
                          const { minPrice } = this.info;
                          return totalPrice > minPrice ? "enough" : "not-enough";
        2、购物车列表的显示与隐藏
            1、显示购物车列表中的数据，循环shopCarts，不能滚动所有数据
            2、数据显示后异步滚动，查看到所有购物车列表数据
            3、购物车列表显示与隐藏的逻辑以及步骤
                 - 用一个状态标识当前的是否显示当前购物车列表
                 - 做一个状态点击切换的事件，当点击购物车底部栏左下方显示购物车列表，当点击半透明层隐藏购物车列表
                                toggerShow() {
                                    // 只有当总数量大于0时才进行切换
                                    if (this.totalCount > 0) {
                                        this.isShow = !this.isShow;
                                    }
                                },
                 - 做一个计算属性计算标识购物车列表显示
                    。 当总数量为0时，不显示购物车列表
                    。 当总数里不为0是，显示购物车列表，并做异步加载BScroll实例
                        - 判断当前的滚动有没有，如果没有就创建异步做滚动
                        - 如果有的就刷新当前的滚动
                 - 最后返回这个标识购物车列表的结果为true还是false

                        if (this.totalCount === 0) {
                            this.isShow = false;
                            return false;
                        }

                        if (this.isShow) {
                            console.log(111111);
                            this.$nextTick(() => {
                            // 现在的版本已经解决了
                            // new BScroll('.list-content',{
                            //     click:true
                            // })
                            // 在没有解决的情况下
                            if (!this.scroll) {
                                this.scroll = new BScroll(".list-content", {
                                click: true,
                                });
                            } else {
                                this.scroll.refresh();
                            }
                            });
                        }

                        return this.isShow;
                                
        3、清空购物车
            - 调用mint UI中的 MessageBox提示确认框
            - 直接发送异步actions，在actions中处理所有的数据，actions中直接提交事件
            - 把cartFoods中的所有count设置为0，当然也可以采用delete count这个属性
            - 然后把cartFoods中的这个数组直接设置为 []
                    [CLEAR_CART](state) {
                        // 清除food中的count或者delete food.count
                        state.cartFoods.forEach(food => food.count = 0);
                        // 移除购物车中所有的购物项
                        state.cartFoods = []
                    },

## 4. Food组件
    1). 父子组件:
        子组件调用父组件的方法: 通过props将方法传递给子组件
        父组件调用子组件的方法: 通过ref找到子组件标签对象   

        shopGoods父组件来控制Food这个子组件的显示隐藏
            - 父组件要想操控子组件中的数据和方法，通过props是不行
            - 通过refs来操控子组件
                - 给子组件定义一个ref="名称"
                - this.refs.名称.子组件切换Food的显示与隐藏

# day05
## 1. ShopRatings组件
    1). 列表的过滤显示
          1、评价类型
                页面评价类型(selectType)分为： 全部 0   满意     不太满意    1
                后台传递过来的2中评价类型：满意 0 / 不太满意 1

            分析：
                1. 当全部显示的时候，所有内容都显示，所以长度就是列表的length
                2. 当后台传递过来的评价类型和前台的评价类型  相一致的时候结果为true
                3、他们的关系：是或者的 ||
                4、seleterateType === 2 ||  seleterateType  === rate.rateType

          2、是否只显示文本
                是否显示文本：true / false
                1、用一个变量来标识当前是否只显示文本的状态
                2、当显示文本的状态为false的时候，所有的都显示，所以为true  （等同于 !显示文本状态）
                3、当显示为本的状态为true的时候，看后台的传过来的rate中的text有没有值
                        无值不显示，有值的情况是text的length大于0
                4、!onlyShowText || rate.text.length > 0

            这两个条件都要满足：所有他们的关系是&&
                使用过滤器，一般是不改变原数组
                const {ratings} = this;
                ratings.filter(rate => {
                    return (this.selecteType === 2 || selecteType === rate.rateType)&& (!this.onlyShoText || rate.text.length > 0)
                })
             
    2). 自定义过滤器
        自定义时间过滤器
            1、使用moment插件  npm install moment --save
            2、创建filter文件夹 在文件的index.js 
            3、使用Vue.filter(名称,(value,formatSte) => {
                reutrn moment(value).format(formatSte)
            })
            4、在页面中使用  {{rating.rateTime| date-format(名称) }}
            5、在main.js中引用所有./filter文件
    
## 2. ShopInfo组件
    1). 使用better-scroll实现两个方向的滑动 
        1、默认竖向滚动
        2、设置横向滚动
            new BScroll(类名,{scrollX:true})
    1). 通过JS动态操作样式
            1、data中自定义类名数组，保存须用到的类名
            2、循环中拿到每个标识类名的  support.type
            3、绑定类名 :class="supportsClass[support.type]"
    2). 解决当前路由刷新异常的bug
            1、初始化的情况(this.info.pics.length 为 undefine)
                如果info.pics为undefined直接return
                if(!this.info.pics){
                    return 
                }
                初始化需要滚动，刷新也需要滚动，抽取出来一个_initScroll();

            2、刷新的情况
                刷新的时候无法滚动
                监听info这个数据刷新的情况下有没有值，并在下一次DOM更新的时候拿到所有的数据，并创建_initScroll()方法
                    info(){
                        this.$nextTick(() => {this._initScroll()})
                    }
                
           
            3、_initScroll()滚动的方法
                1、创建竖向滚动
                2、创建横向滚动
                    计算出所有横向li的加起来的宽度
                        1、拿到当前li的父元素(this.$refs.picsUl)
                        2、宽度结果 = （拿到当前li的宽度 + 以及他的间隔宽度 ） * 所有的li数量(this.picsUl)  - 最后一个间隔的宽度
                        3、设置li的父元素的宽度  this.refs.picsUl.style.width = 宽度结果 + 'px'
                    创建横向滚动的实例
                        new BScroll(this.$refs.picsUl,{ scrollX:true })
 

## 3. Search组件
    1). 根据关键字来异步搜索显示匹配的商家列表   1、搜索结果保存在state中  2、actions中异步发送请求   3、通过$store.dispatch(名称,keyword)
    2). 如实实现没有搜索结果的提示显示   
            1、定义一个变量初始化状态为false  
            2、通过watch监听state中商家列表的数据   
            3、无值的情况下设置为true,有值的情况下设置变量设置为false
## 4. 项目优化 
    1). 缓存路由组件对象    keep-alive
    2). 路由组件懒加载   () => import(url)
    3). 图片司加载: vue-lazyload   使用 :src替换为v-lay
    4). 分析打包文件并优化 npm run build --report      时间格式化 ：moment(value).format(formatStr)