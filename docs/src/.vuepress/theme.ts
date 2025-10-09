import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar";
import { enSidebar, zhSidebar } from "./sidebar";

// 检测是否为开发环境
const isDev = process.env.NODE_ENV === 'development';

export default hopeTheme({
  hostname: "https://obsidian.vip/",

  author: {
    name: "coffeebean",
    url: "https://obsidian.vip/",
  },

  // 开发环境关闭热重载以提升性能
  hotReload: !isDev,

  // 显示编辑此页连接
  editLink: false,

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "kickTiger/obsidian-doc",

  // 关闭导航条仓库链接
  repoDisplay: false,

  // 禁用默认的回到顶部按钮，使用自定义浮动侧边栏替代
  backToTop: false,

  docsDir: "demo/theme-docs/src",

  locales: {
    "/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "分享知识、成就自我",

      displayFooter: true,

      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },

    /**
     * Chinese locale config
     */
    "/zh/": {
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

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/zh/demo/encrypt.html": ["1234"],
    },
  },

  plugins: {
    // If you don't need comment feature, you can remove following option
    // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
    // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
    // Temporarily disable comment during build to fix SSR issues
    // comment: {
    //   /**
    //    * Using Giscus
    //    */
    //   // provider: "Giscus",
    //   // repo: "vuepress-theme-hope/giscus-discussions",
    //   // repoId: "R_kgDOG_Pt2A",
    //   // category: "Announcements",
    //   // categoryId: "DIC_kwDOG_Pt2M4COD69",

    //   /**
    //    * Using Twikoo
    //    */
    //   // provider: "Twikoo",
    //   // envId: "https://twikoo.ccknbc.vercel.app",

    //   /**
    //    * Using Waline
    //    */
    //   provider: "Waline",
    //   serverURL: "https://obsidian-doc-comments.vercel.app",
    // },

    // 你想使用的组件
    // 文档 https://theme-hope.vuejs.press/zh/guide/markdown/components.html
    components: {
      // 临时只保留必要组件以减少构建时间
      components: [
        "Badge",
        "PDF",
        "VideoPlayer",
      ],
    },

    // 开发环境关闭版权功能以提升性能
    copyright: !isDev,

    // 开启目录页自动生成
    autoCatalog: false,

    // Disable features you don't want here
    // 优化配置：只启用实际使用的功能以减少构建时间
    mdEnhance: {
      // 基础功能（轻量级，保留）
      align: true,
      attrs: true,
      codetabs: true,
      container: true,
      figure: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,

      // 必须保留的功能（项目中有使用）
      katex: true,          // ✅ 保留：数学公式文档需要 (docs/src/zh/markdown/Formula.md)
      mermaid: true,        // ✅ 保留：流程图文档需要 (docs/src/zh/markdown/mermaid.md)

      // 可以安全禁用的功能（未使用，禁用可节省约40%构建时间）
      chart: false,         // ❌ 禁用：未使用Chart.js图表
      echarts: false,       // ❌ 禁用：未使用ECharts图表
      flowchart: false,     // ❌ 禁用：未使用flowchart语法
      demo: false,          // ❌ 禁用：未使用demo组件
      playground: false,    // ❌ 禁用：未使用代码演示场
      presentation: false,  // ❌ 禁用：未使用幻灯片
      stylize: [],          // ❌ 禁用：未使用样式化
      vuePlayground: false, // ❌ 禁用：未使用Vue演示场
    },

    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
