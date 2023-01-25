```ts
// docs/src/.vuepress/sidebar/zh.ts 侧边栏配置

export const zhSidebar = sidebar({  
  "/zh/": [  
    "",  
    {  
      // 栏目标题
      text: "obsidian指南",  
      // 栏目图标,估计是emoji
      icon: "note",  
      // 前缀?没太弄明白,反正要加不然出问题,和link先一致再说
      prefix: "documentation/",  
      // 链接
      link: "documentation/",  
      //是否允许目录页折叠
      collapsible: true,  
      // 开启从目录下自动生成索引
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
  
  ],  
});
```