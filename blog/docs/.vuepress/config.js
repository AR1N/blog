module.exports = {
  title: 'Aren的前端笔记',
  description: 'Aren',
  base: '/blog/', // 比如你的仓库是test
  head: [
    ['link', { rel: 'icon', href: '/img/logo.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    lastUpdated: "上次更新时间", // 文档更新时间：每个文件git最后提交的时间
    search: true,
    searchMaxSuggestions: 10,
    // sidebar: 'auto',//自动生成侧栏
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    // displayAllHeaders: true,//显示所有页面的标题链接
    smoothScroll: true,//页面滚动
    //导航栏
    nav: [
      { text: '前端笔记', link: '/index/' }, // 内部链接 以docs为根目录
      { text: 'hexo博客', link: 'http://rkchuan.top' }, // 外部链接
      // 下拉列表
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub主页', link: 'https://github.com/AR1N' },
          {
            text: '关于RESUME',
            link: 'https://ar1n.github.io/resume'
          }
        ]
      }
    ],
    //侧边栏
    sidebar: [
      //其他分组
      {
        title:'VUE',
        collapsable: true, //是否展开
        children: [
          ['./VUE/VUE相关问题', 'VUE相关问题'],
          ['./VUE/Vue中封装使用tinymce富文本编辑器', 'Vue中封装使用tinymce富文本编辑器']
        ]
      },
      {
        title:'小程序',
        collapsable: true, //是否展开
        children: [
          ['./MINI/小程序npm的方式使用UI框架及组件化开发', '小程序npm的方式使用UI框架及组件化开发'],
          ['./MINI/微信小程序商城开发常见问题汇总', '微信小程序商城开发常见问题汇总']
        ]
      }
    ]
  }
}