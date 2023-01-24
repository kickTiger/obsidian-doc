import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "obsidian指南",
      icon: "note",
      prefix: "documentation/",
      link: "documentation/",
      children: "structure",
    },
    {
      text: "markdown语法",
      icon: "note",
      prefix: "markdown/",
      link: "markdown/",
      children: "structure",
    },
    {
      text: "obsidian插件",
      icon: "note",
      prefix: "plugin/",
      link: "plugin/",
      children: "structure",
    },
    {
      text: "obsidian工作流",
      icon: "note",
      prefix: "workflow/",
      link: "workflow/",
      children: "structure",
    },

  ],
});
