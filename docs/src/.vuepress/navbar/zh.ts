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
    text: "插件",
    icon: "creative",
    prefix: "/zh/",
    children: [
      {
        text: "核心插件",
        icon: "creative",
        prefix: "core-plugins/",
        link: "core-plugins/",
      },
      {
        text: "社区插件",
        icon: "config",
        prefix: "community-plugins/",
        link: "community-plugins/",
      },
    ],
  },
  {
    text: "进阶用法",
    icon: "creative",
    prefix: "/zh/advanced/",
    link: "/zh/advanced/",
  },
  {
    text: "咖啡豆的博客",
    icon: "note",
    link: "#",
  },
]);
