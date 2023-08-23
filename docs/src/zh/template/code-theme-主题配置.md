```ts
//docs/src/.vuepress/theme.ts 主题配置

import { hopeTheme } from "vuepress-theme-hope";  
import { enNavbar, zhNavbar } from "./navbar/index.js";  
import { enSidebar, zhSidebar } from "./sidebar/index.js";  
  
export default hopeTheme({  
  // 站点域名
  hostname: "https://obsidian.vip/",  
  
  // 作者名称
  author: {  
    name: "coffeebean",  
    url: "https://obsidian.vip/",  
  },  
  
  // 热更新开关,开启了才能实时渲染侧边栏等  
  hotReload: true,  
  
  // 显示GitHub编辑此页连接  
  editLink: false,  
  
  iconAssets: "iconfont",  

  logo: "/logo.svg",  
  
  // GitHub仓库名称
  repo: "kickTiger/obsidian-doc",  
  
  // 关闭顶部导航条仓库链接  
  repoDisplay: false,  
  
  docsDir: "demo/theme-docs/src",  

  // 多语言控制项目
  locales: {  
    "/": {  
      // navbar  
      navbar: enNavbar,  
  
      // sidebar  
      sidebar: enSidebar,  
  
      footer: "Share knowledge, achieve self-realization",  
  
      displayFooter: true,  
  
      metaLocales: {  
        editLink: "Edit this page on GitHub",  
      },  
    },  
  
    /**  
     * Chinese locale config     */    "/zh/": {  
      // navbar  
      navbar: zhNavbar,  
  
      // sidebar  
      sidebar: zhSidebar,  
  
      footer: "分享知识、成就自我",  
  
      displayFooter: true,  
  
      // page meta  
      metaLocales: {  
        editLink: "在 GitHub 上编辑此页",  
      },  
    },  
  },  
  
  // 加密页面配置,添加页面地址和对应的密码
  encrypt: {  
    config: {  
      "/demo/encrypt.html": ["1234"],  
      "/zh/demo/encrypt.html": ["1234"],  
    },  
  },  
  
  // 插件的配置,一些功能在这里,不是在上面
  plugins: {  
    // If you don’t need comment feature, you can remove following option  
    // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.    // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!    comment: {  
      /**  
       * Using Giscus       */      // provider: "Giscus",      // repo: "vuepress-theme-hope/giscus-discussions",      // repoId: "R_kgDOG_Pt2A",      // category: "Announcements",      // categoryId: "DIC_kwDOG_Pt2M4COD69",  
      /**       * Using Twikoo       */      // provider: "Twikoo",      // envId: "https://twikoo.ccknbc.vercel.app",  
      /**       * Using Waline       */      provider: "Waline",  
      serverURL: "https://obsidian-doc-comments.vercel.app",  
    },  
  
    //开启版权功能  
    copyright: true,  
  
    // 开启目录页自动生成  
    autoCatalog: false,  
  
    // Disable features you don’t want here  
    mdEnhance: {  
      align: true,  
      attrs: true,  
      chart: true,  
      codetabs: true,  
      container: true,  
      demo: true,  
      echarts: true,  
      figure: true,  
      flowchart: true,  
      gfm: true,  
      imgLazyload: true,  
      imgSize: true,  
      include: true,  
      katex: true,  
      mark: true,  
      mermaid: true,  
      playground: {  
        presets: ["ts", "vue"],  
      },  
      presentation: {  
        plugins: ["highlight", "math", "search", "notes", "zoom"],  
      },  
      stylize: [  
        {  
          matcher: "Recommended",  
          replacer: ({ tag }) => {  
            if (tag === "em")  
              return {  
                tag: "Badge",  
                attrs: { type: "tip" },  
                content: "Recommended",  
              };  
          },  
        },  
      ],  
      sub: true,  
      sup: true,  
      tabs: true,  
      vPre: true,  
      vuePlayground: true,  
    },  
  
    // uncomment these if you want a pwa  
    // pwa: {    //   favicon: "/favicon.ico",    //   cacheHTML: true,    //   cachePic: true,    //   appendBase: true,    //   apple: {    //     icon: "/assets/icon/apple-icon-152.png",    //     statusBarColor: "black",    //   },    //   msTile: {    //     image: "/assets/icon/ms-icon-144.png",    //     color: "#ffffff",    //   },    //   manifest: {    //     icons: [    //       {    //         src: "/assets/icon/chrome-mask-512.png",    //         sizes: "512x512",    //         purpose: "maskable",    //         type: "image/png",    //       },    //       {    //         src: "/assets/icon/chrome-mask-192.png",    //         sizes: "192x192",    //         purpose: "maskable",    //         type: "image/png",    //       },    //       {    //         src: "/assets/icon/chrome-512.png",    //         sizes: "512x512",    //         type: "image/png",    //       },    //       {    //         src: "/assets/icon/chrome-192.png",    //         sizes: "192x192",    //         type: "image/png",    //       },    //     ],    //     shortcuts: [    //       {    //         name: "Demo",    //         short_name: "Demo",    //         url: "/demo/",    //         icons: [    //           {    //             src: "/assets/icon/guide-maskable.png",    //             sizes: "192x192",    //             purpose: "maskable",    //             type: "image/png",    //           },    //         ],    //       },    //     ],    //   },    // },  },  
});
```