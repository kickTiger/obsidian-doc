---
# 这是文章的标题
title: CSS片段-自定义右侧文件列表文件夹和文件图标
# 这是侧边栏的顺序
order: 10
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**说明：**  
实现自定义右侧文件列表文件夹和文件图标

**使用方法：**  
1. 复制以下代码，保存为`coffebean-自定义右侧文件列表文件夹和文件图标.css`文件格式
2. 将`coffebean-自定义右侧文件列表文件夹和文件图标.css`复制到库的css片段中，刷新obsidian片段。重启obsidian生效


::: tip 添加启动css片段的方法
1. 打开obsidian设置 → 外观 → CSS 代码片段，点击此处的文件夹图标📁，打开css片段文件夹
2. 复制你的css文件到这个文件夹，回到obsidian中，刷新并启动片段。偶尔需要重启ob生效
:::

**代码**  
代码框右下有复制按钮，点击自动复制代码
```css
/* @Author   : 咖啡豆  
@contact  : https://obsidian.vip/  
@File     : 自定义右侧文件列表文件夹和文件图标.cs  
@Software : vscode  
@Date     : 2022-08-09 17:03:03  
@upDate   : 2022-08-09 17:03:08  
@Desc     : 修改右侧文件列表，文件夹和文件的图标 */  
  
/* Emoji */  
/* .nav-file-title-content::before { content: '🗒 '; }.nav-folder-title-content::before { content: '📂 '; } */  
/* 文件图标 */.nav-folder-children .nav-file-title-content:first-child::before {  
  /* content: "📄 "; */  content: "🥩 ";  
  content: "🍖 ";  
  content: "🥕 ";  
  content: "🍹 ";  
  content: "🍋 ";  
  content: "🥒 ";  
  content: "🍌 ";  
}  
/* 文件夹图标 */.nav-folder-children .nav-folder-title-content::before {  
  /* content: "📂 "; */  /* content: "🦞 "; */  /* content: "🍧 "; */  /* content: "🍨 "; */  content: "🍦 ";  
  content: "🍆 ";  
  content: "🦑 ";  
  content: "🍽️ ";  
  content: "🥢 ";  
  content: "🍜 ";  
  content: "🍱 ";  
  content: "🍲 ";  
  content: "🥒🥦🍄🌶️🌽 ";  
  content: "🍚 ";  
  content: "🍓 ";  
}
```