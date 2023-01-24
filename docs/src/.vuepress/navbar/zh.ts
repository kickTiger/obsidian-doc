import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  { text: "obsidian指南", icon: "discover", link: "/zh/documentation/" },
  {
    text: "markdown语法",
    icon: "creative",
    prefix: "/zh/markdown/",
    link: "/zh/markdown/",
  },
  {
    text: "obsidian插件",
    icon: "creative",
    prefix: "/zh/plugin/",
    children: [
      {
        text: "核心插件",
        icon: "creative",
        link: "核心插件.md",
      },
      {
        text: "社区插件",
        icon: "config",
        link: "社区插件.md",
      },
    ],
  },
  {
    text: "咖啡豆的博客",
    icon: "note",
    link: "#",
  },
]);
