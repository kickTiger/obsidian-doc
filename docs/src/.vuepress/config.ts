import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "obsidian Docs ",
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
