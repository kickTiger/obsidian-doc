---
# 这是文章的标题
title: obsidian网页剪藏
# 这是侧边栏的顺序
order: 10
# 这是页面的图标
icon: page
---
**说明**  
因为 obsidian 里面是纯 md 文件，所以考虑用一个简单的方法实现网页的剪藏。

::: info
基本上不会失去排版。插件会自动剪藏正文内容，不会剪藏菜单广告等，接近于印象笔记的效果。
:::

## 需要插件
- chrome 浏览器
- chrome 浏览器插件 [MarkDownload - Markdown Web Clipper](https://chrome.google.com/webstore/detail/markdownload-markdown-web/pcmpcfapbekmbjjkdalcgopdkipoggdi) 保存网页为 md 文件，支持 **Front-matter** 模板，以及丰富的语法规范
- obsidian 插件 Local Images **商店下载**| [GitHub - aleksey-rezvov/obsidian-local-images](https://github.com/aleksey-rezvov/obsidian-local-images) 用来将 markdown 中的远程图片下载到本地。

## 使用方法
1. 打开需要剪藏的网页，点击 MarkDownload 插件或者页面点击右键菜单，保存到 obsidian 的文件目录。
2. 打开 obsidian，打开刚刚保存的文件，Ctrl+P 命令面板搜 img，选择`Local images:Download images locally`回车。会把 md 文件的远程图片自动下载到 obsidian 本地。

## 进阶设置
1. MarkDownload 插件提供了丰富的模板语法，支持插入**Front-matter** 模板。设置方法是，插件上点击右键->选项。
2. 还有其他丰富的模板语法，可以让下载的 md 文件符合你的需要。可以在设置里定制。

::: tip 支持Frontmatter语法
这里支持Frontmatter的语法，可以自由的设定
:::