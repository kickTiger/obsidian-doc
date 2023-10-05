---
# 这是文章的标题
title: CSS片段-清除任务的删除线
# 这是侧边栏的顺序
order: 11
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**说明：**  
实现去除待办的删除线样式，方便在回顾任务的时候使用，避免干扰。


**使用方法：**  
1. 复制以下代码，保存为`CSS片段-清除任务的删除线`文件格式
2. 将`CSS片段-清除任务的删除线`复制到库的css片段中，刷新obsidian片段。重启obsidian生效
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
@File     : coffeebean-去除删除线-任务回顾专用.css
@Software : vscode
@Date     : 2022-10-17
@upDate   : 2022-10-17
@Desc     : CSS提供给系统yaml调用，调用格式如下
            ---
            cssclass: coffeebean-del-checklist-done-decoration
            ---
*/

/* 去除删除线效果 */
.coffeebean-del-checklist-done-decoration ul > li.task-list-item[data-task="x"], ul > li.task-list-item[data-task="X"]{
    text-decoration: none !important;
}
```
