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
      // 开发环境只保留必要组件，生产环境启用全部
      components: isDev
        ? ["Badge"]
        : [
            "AudioPlayer",
            "Badge",
            "BiliBili",
            "CodePen",
            "PDF",
            "StackBlitz",
            "VideoPlayer",
            "YouTube",
          ],
    },

    // 开发环境关闭版权功能以提升性能
    copyright: !isDev,

    // 开启目录页自动生成
    autoCatalog: false,

    // Disable features you don't want here
    // 开发环境禁用重量级功能以提升性能
    mdEnhance: {
      align: true,
      attrs: true,
      chart: !isDev,        // 开发环境禁用
      codetabs: true,
      container: true,
      demo: !isDev,         // 开发环境禁用
      echarts: !isDev,      // 开发环境禁用
      figure: true,
      flowchart: !isDev,    // 开发环境禁用
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: !isDev,        // 开发环境禁用
      mark: true,
      mermaid: !isDev,      // 开发环境禁用
      playground: !isDev ? {
        presets: ["ts", "vue"],
      } : false,            // 开发环境禁用
      presentation: !isDev ? {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      } : false,            // 开发环境禁用
      stylize: !isDev ? [
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
      ] : [],               // 开发环境禁用
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: !isDev, // 开发环境禁用
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
