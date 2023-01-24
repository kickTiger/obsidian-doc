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
      text: "核心插件",
      icon: "config",
      prefix: "core-plugins/",
      link: "core-plugins/",
      children: "structure",
    },
    {
      text: "社区插件",
      icon: "creative",
      prefix: "community-plugins/",
      link: "community-plugins/",
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
