import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "obsidian指南",
      icon: "note",
      prefix: "documentation/",
      link: "documentation/",
      collapsible: false,
      children: "structure",
    },
    {
      text: "markdown语法",
      icon: "note",
      prefix: "markdown/",
      link: "markdown/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "核心插件",
      icon: "config",
      prefix: "core-plugins/",
      link: "core-plugins/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "社区插件",
      icon: "creative",
      prefix: "community-plugins/",
      link: "community-plugins/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "obsidian工作流",
      icon: "note",
      prefix: "workflow/",
      link: "workflow/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "进阶用法",
      icon: "note",
      prefix: "advanced/",
      link: "advanced/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "css代码片段",
      icon: "note",
      prefix: "css-snippets/",
      link: "css-snippets/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "dataview代码片段",
      icon: "note",
      prefix: "dataview-snippets/",
      link: "dataview-snippets/",
      collapsible: true,
      children: "structure",
    },

  ],
});
