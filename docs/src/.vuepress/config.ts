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

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "obsidian Docs CoffeeBean Edition ",
      description: "A docs for obsidian",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "obsidian文档咖啡豆版",
      description: "obsidian文档和使用技巧",
    },
  },

  theme,

  shouldPrefetch: false,
});
