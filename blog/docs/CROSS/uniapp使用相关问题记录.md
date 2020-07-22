> 不知不觉有好一段时间没有更新了，由于疫情问题，各方面都受到了一定的影响，最近终于好些了，也不用每天扫健康码了~然后一个原因是最近比较忙，没有时间更新。最近在用uniapp做混合APP，遇到一些问题，:pencil2: 记录一下~

## :iphone: 适配问题：

* uniapp提供了内置 CSS 变量:

* ` --status-bar-height `为 系统状态栏高度，此变量常用于自定义导航栏，还是很方便的。

* ` --window-top `: 内容区域距离顶部的距离 ,` --window-bottom ` : 内容区域距离底部的距离。内容区域就是去除系统状态栏，原生导航栏和底部安全区的区域。

* 此外还有两个CSS变量在适配iphone过程中是常用到的：`constant(safe-area-inset-bottom)`,`env(safe-area-inset-bottom)`,如避开 iPhoneX  底部安全区：

* ```css
    .safeArea {  
      padding-bottom: 0;  
      padding-bottom: constant(safe-area-inset-bottom);  
      padding-bottom: env(safe-area-inset-bottom);  
    }  
    ```

## :camera: APP批量上传图片的问题：

* :triangular_flag_on_post: 情况说明：利用[uni.uploadFile](https://uniapp.dcloud.io/api/request/network-file?id=uploadfile)API批量上传图片时，通过` files  ` 字段传 一个 file 对象的数组 ，`uri`为必填项，在HBuilderX上内置浏览器中批量上传没有问题，是ok的，但是在真机调试批量上传的时候后台只接收到最后一张图片的参数~:sob::flushed: 

* 后面通过调试发现在APP上传图片只返回了path和size字段，而在内置浏览器中上传则包含了如下字段：

* ```javascript
    lastModified:1575899269994
    lastModifiedDate:Mon Dec 09 2019 21:47:49 GMT+0800 (中国标准时间) {}
    name:"aren.png"
    size:2268
    type:"image/png"
    webkitRelativePath:""
    path:"blob:http://localhost:8080/7f935d88-0f45-4331-90c2-5fffcb60439b"
    ```

* 发现H5和APP中上传后得到的本地路径是大不相同的，而且APP中上传后没有`name`字段，这是最重要的一点，这就导致在APP上批量上传的图片 name是相同 默认为 file ，后台就视为一张图片，既然知道了原因就好解决了:tada::tada::tada:  

* ```javascript
    let fileArr = [];
    let files = res.tempFiles;
    files.forEach((item,index) => {
          let itemImg = { uri: item.path, name: 'image'+index };
          fileArr.push(itemImg);
         });
    ```

    ## :key: 权限展示tabbar问题：
    
* 需求：根据不同权限展示相应的tabbar
  
* 目前有两种思路：
  
  1. 自定义tabbar，不在pages.json里配置tabBar相关数据，将tabbar对应的item写成组件，在统一的home页根据权限展示相应的tabbar。
  
  2. 在pages.json里配置tabBar相关数据，重写原生tabbar，然后利用[uni.hideTabBar](https://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbar)这个API隐藏原生tabbar，在自定义tabbar内切换item时调用[uni.switchTab](https://uniapp.dcloud.io/api/router?id=switchtab)以达到切换目的。
  
      
  
  >  但是这两种方案都有一定的瑕疵，第一种最大的问题就是没有缓存机制，每次切换都是重新渲染，第二种容易出现选中item和对应页面不一致的情况（可通过vuex解决）。总之自定义tabbar是有很多问题的，目前uni官方也还没有出相关api去解决类似场景:no_mouth:    
  
  ​	时隔几天，再次更新，项目中使用了第二种思路，但在ios在切换tabbar的时候，会有机率出现tabbar被抬高底部白条的情况， 而且只有第一次打开的tabbar页会有这个问题，切换至其他tabbar又恢复正常，类似问题 [【报Bug】uni-app V3编译器，uni.hideTabBar()不能正确隐藏底部tabbar](https://ask.dcloud.net.cn/question/95796)  ,最后调试发现 reLaunch 页面才能解决~
  
  ## 导航栏底部边框
  
  * 如需在导航栏底部有边框，可以在page.json里对应页面的style属性下配置：
  
  ``` 
  "style" : {
                "navigationBarTitleText": "导航标题",
                "app-plus": {
                    "titleNView": {
                        "splitLine": {
                            "color": "#f5f6f9"//边框颜色
                        }
                    }
                }
            }
```

## 下拉刷新

* 如果是自定义导航栏，使用系统默认的下拉刷新，会使在下拉过程中导航栏一起被拉下来，因为默认使用的是default刷新样式，这时需要使用circle刷新样式才不会出现问题，需要在page.json里对应页面的style属性下配置：

```
"app-plus": {
                   "bounce": "none",//橡皮回弹效果
                   "scrollIndicator": "none",//不显示滚动条
                   "pullToRefresh": {
                       "support": true,
                       "color": "#2F89FC",//圆圈颜色
                       "style": "circle",
                       "offset": "50px"//离顶部的距离
                   }
               }
```
