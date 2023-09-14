/*
 * @Author: coffeebean 3623068+kickTiger@users.noreply.github.com
 * @Date: 2023-01-17 19:29:24
 * @LastEditors: coffeebean 3623068+kickTiger@users.noreply.github.com
 * @LastEditTime: 2023-01-25 20:16:41
 * @FilePath: \obsidian-doc\docs\src\.vuepress\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

// 2023-09-13 23:39:42 导入了搜索插件
import { docsearchPlugin } from "@vuepress/plugin-docsearch";


export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Obsidian Docs by CoffeeBean ",
      description: "A docs for obsidian",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "obsidian文档咖啡豆版",
      description: "obsidian文档和使用技巧",
    },
  },

  // 2023-09-13 23:39:22 导入了搜索插件和key
  plugins: [
    docsearchPlugin({
      apiKey: '402365c51dd6ecbfd8e01457ceafe0bf',
      indexName: 'obsidianvip',
      appId: '36KP1XM8PF',
      locales: {
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档'
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消'
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除'
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接'
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者'
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果?',
                reportMissingResultsLinkText: '点击反馈'
              }
            }
          }
        }
      },
    })
  ],

  theme,

  shouldPrefetch: false,
});
