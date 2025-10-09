import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  { text: "obsidian指南", icon: "discover", link: "/zh/documentation/" },
  {
    text: "markdown语法",
    icon: "creative",
    prefix: "/zh/markdown/",
    link: "/zh/markdown/",
  },
  {
    text: "插件市场",
    icon: "creative",
    link: "/zh/plugins/",
    children: [
      {
        text: "核心插件",
        icon: "creative",
        link: "/zh/core-plugins/",
      },
      {
        text: "社区插件",
        icon: "config",
        link: "/zh/plugins/",
      },
    ],
  },
  {
    text: "Bases专栏",
    icon: "creative",
    prefix: "/zh/bases/",
    link: "/zh/bases/",
  },
  {
    text: "更新日志",
    icon: "note",
    link: "/zh/documentation/Update-Log.md",
  },
]);
