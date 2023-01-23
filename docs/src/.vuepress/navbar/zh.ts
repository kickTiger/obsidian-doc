import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  { text: "obsidian指南", icon: "discover", link: "/zh/demo/" },
  {
    text: "markdown语法",
    icon: "creative",
    prefix: "/zh/guide/",
    children: [
      {
        text: "Bar",
        icon: "creative",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "more", link: "" }],
      },
      {
        text: "Foo",
        icon: "config",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "more", link: "" }],
      },
    ],
  },
  {
    text: "obsidian插件",
    icon: "creative",
    prefix: "/zh/guide/",
    children: [
      {
        text: "核心插件",
        icon: "creative",
        link: "foo/",
      },
      {
        text: "社区插件",
        icon: "config",
        link: "bar/",
      },
    ],
  },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
