---
# 这是文章的标题
title: CSS片段-满屏无边距
# 这是侧边栏的顺序
order: 8
# 这是页面的图标
icon: page
---
**说明：**  
实现全屏的效果，两边没有边框。比如嵌入整个网页。

::: danger 
这个代码需要配合你的主题，有一些特殊的主题需要调试
:::


**使用方法：**  
1. 复制以下代码，保存为`coffebean-嵌入网页全屏.css`文件格式
2. 将`coffebean-嵌入网页全屏.css`复制到库的css片段中，刷新obsidian片段。重启obsidian生效
3. 在你需要引用的笔记中，在顶部 frontmatter 处，输入引用的代码
```
---
cssclass: coffeebean-full-screen
---
```


::: tip 添加启动css片段的方法
1. 打开obsidian设置 → 外观 → CSS 代码片段，点击此处的文件夹图标📁，打开css片段文件夹
2. 复制你的css文件到这个文件夹，回到obsidian中，刷新并启动片段。偶尔需要重启ob生效
:::

**代码**  
代码框右下有复制按钮，点击自动复制代码
```css
/* 
@Author   : 咖啡豆  
@contact  : https://obsidian.vip/  
@File     : 满屏无边距.css  
@Software : vscode  
@Date     : 2022-10-16  
@upDate   : 2022-10-16  
@Desc     : CSS提供给系统yaml调用，调用格式如下  
            ---            
            cssclass: coffeebean-full-screen            
            ---
@Desc     : 定义格式如 .markdown-preview-view .mianban_width 下面的都加此前缀  
@Desc     : 用来嵌入各种网页，无任务边距，满屏的效果  
*/  
.coffeebean-full-screen.markdown-preview-view.is-readable-line-width .markdown-preview-sizer{  
    max-width: 100% !important;  
    margin: 0 !important;  
    padding: 0px !important;  
}  
  
.coffeebean-full-screen.markdown-preview-view{  
    max-width: 100% !important;  
    margin: 0 !important;  
    padding: 0px !important;  
}
```