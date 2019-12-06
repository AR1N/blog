 #### 准备：
> 开发工具>新建项目项目构建后,在项目目录执行`npm init`，初始化文件生成`packge.json`；再执行`npm install --production`，
> 使用UI框架（以Vant为例）：执行`npm i vant-weapp -S --production`，然后在微信开发者工具中：详情>使用NPM模块；工具>构建npm;
> 构建成功之后会生成`miniprogram_npm`，UI组件会在这个目录下。
#### 使用：
> 在要使用组件的页面配置`json`(以button组件为例）: 
```javascript
"usingComponents": {
  "van-button": "/miniprogram_npm/vant-weapp/button/index"
}
```
> 然后在WXML中就可以使用`<van-button></van-button>`标签了；
#### 自定义组件：
> 在项目根目录新建`components`文件夹，里面放自定义组件文件；右键【新建component】生成组件模版；与页面文件有所不同的是组件的js文件，
```javascript
//  nodata组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tip:{
      type:String,
      value:'暂无数据'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {  
  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
```
> 组件的`properties`属性类似于vue的`props`，通过此属性接收使用页面传入组件中的值；如上在使用页面就可以使用：
> `<nodata tip="{{暂无信息}}"></nodata>`，改变组件的默认值。