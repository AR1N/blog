## 首先什么是*mvvm*：

`MVVM` 是 `Model-View-ViewModel `的缩写。mvvm 是一种设计思想。Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。
在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。
ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。
## vue生命周期的理解：

总共分为 8 个阶段创建前/后，载入前/后，更新前/后，销毁前/后。
创建前/后： 在` beforeCreate` 阶段，vue 实例的挂载元素 el 还没有。
载入前/后：在 `beforeMount` 阶段，vue 实例的$el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换。在 `mounted` 阶段，vue 实例挂载完成，data.message 成功渲染。
更新前/后：当 data 变化时，会触发` beforeUpdate` 和 `updated` 方法。
销毁前/后：在执行 `destroy` 方法后，对 data 的改变不会再触发周期函数，说明此时 vue 实例已经解除了事件监听以及和 dom 的绑定，但是 dom 结构依然存在。
## vue的双向绑定的原理：

> vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤：
- 第一步：需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
- 第二步：compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。
- 第三步：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:
在自身实例化时往属性订阅器(dep)里面添加自己；
自身必须有一个 update()方法；
待属性变动 dep.notice()通知时，能调用自身的 update() 方法，并触发 Compile 中绑定的回调，则功成身退。
- 第四步：MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。
## vuex相关：

有 5 种属性，分别是 state、getter、mutation、action、module。
- ### store 特性：
vuex 就是一个仓库，仓库里放了很多对象。其中 state 就是数据源存放地，对应于一般 vue 对象里面的 data。
state 里面存放的数据是响应式的，vue 组件从 store 读取数据，若是 store 中的数据发生改变，依赖这相数据的组件也会发生更新。
它通过 mapState 把全局的 state 和 getters 映射到当前组件的 computed 计算属性。
- ### getter 特性：
getter 可以对 state 进行计算操作，它就是 store 的计算属性。
虽然在组件内也可以做计算属性，但是 getters 可以在多给件之间复用。
如果一个状态只在一个组件内使用，是可以不用 getters。
- ### mutation 特性：
action 类似于 muation, 不同在于：action 提交的是 mutation,而不是直接变更状态。
action 可以包含任意异步操作。

## 注册全局组件：

在components下写好test.vue组件模板，然后在main.js中引入再全局注册：
```
import testel from './components/test';
Vue.component('testel ',testel );
```

## vue组件之间的传值：

1. ### 父组件向子组件传递数据
```vue
//父组件通过标签上面定义传值
<template>
    <Main :obj="data"></Main>
</template>
<script>
    //引入子组件
    import Main form "./main"
    exprot default{
        name:"parent",
        data(){
            return {
                data:"我要向子组件传递数据"
            }
        },
        //初始化组件
        components:{
            Main
        }
    }
</script>

//子组件通过props方法接受数据
<template>
    <div>{{data}}</div>
</template>
<script>
    exprot default{
        name:"son",
        //接受父组件传值
        props:["data"]
    }
</script>
```
2. ### 子组件向父组件传递数据
```vue
//子组件通过$emit方法传递参数
<template>
   <div v-on:click="events"></div>
</template>
<script>
    //引入子组件
    import Main form "./main"
    exprot default{
        methods:{
            events:function(params){
              console.log(params)
            }
        }
    }
</script>
<template>
    <div v-on:click="emitEvent">{{data}}</div>
</template>
<script>
    exprot default{
        name:"son",
        //接受父组件传值
        props:["data"],
        methods: {
          emitEvent() {
            this.$emit('event', params) // 派发函数，并传递值，params是你自己想传的值
          }
        }
    }
</script>
```

## 默认显示子路由：

```vue
  routes: [
    {path: '/',
      name: 'home',
      component: home,
      children: [{  path: '/echarts',  name: 'echarts',  component: echarts },
              { path: '/index', name: 'index',component: index}],redirect:'/index' }] 
         }]     //通过redirect:'/index' 默认显示index
```
## Vue中使用echarts：

```vue
  <template>
<!-- 定义一个承载容器 -->
      <div id="chartshow" style=" height:500px;"></div>
  </template>

<script>
import echarts from "echarts"; //引入echarts 
//此外在main.js中还需要再引入echarts ,并按照官方的方式Vue.prototype.$echarts = echarts 使用.
export default {
  data() {
    return {
      chartshow: null
    };
  },
  methods: {
    drawshowChart() {
      this.chartshow = echarts.init(document.getElementById("chartshow"));
      this.chartshow.setOption({
    //以下是echarts的数据
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: [
            "直达",
            "营销广告",
            "搜索引擎",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "百度",
            "谷歌",
            "必应",
            "其他"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直达", selected: true },
              { value: 679, name: "营销广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: "直达" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1048, name: "百度" },
              { value: 251, name: "谷歌" },
              { value: 147, name: "必应" },
              { value: 102, name: "其他" }
            ]
          }
        ]
      });
    }, //数据结束
              drawCharts() {  
              this.drawshowChart();
                          }
  },  //methods结束
              mounted: function() {
              this.drawCharts();
  },
              updated: function() {
              this.drawCharts();
  }
};
</script>
```

