---
# 这是文章的标题
title: 快捷调整图片尺寸
# 这是侧边栏的顺序
order: 35
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**插件简介：**  `@山人`投稿  
mousewheel image zoom，该插件可以在预览模式下，通过鼠标滚轮控制按键（默认为左Alt）来放大/缩小图片。可以通过修改配置文件来更改控制按键的设置。

::: warning
在实时预览模式下，也可以生效。

可以看到，是通过增加`|600`的参数来调整图片尺寸。我以前在Markdown图片语法中提到过。这个是变成了自动，更方便一些
:::

**插件安装：**
::: tip 插件安装
打开 obsidian → 设置 ⚙️ → 第三方插件 → 社区插件市场，搜索关键字安装

注意：你需要关闭第三方插件的**安全模式**，才能安装社区插件，建议关闭。
:::

**插件使用：**  
按住alt键，滑动鼠标滚轮即可放大缩小，效果是一直保持的。
::: tip
如果要取消图片尺寸控制，可在源码模式下，删除图片链接后的`|600`之类的数值即可
:::

