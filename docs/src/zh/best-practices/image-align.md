---
number headings: auto, first-level 2, max 6, start-at 1, 1.1
# 这是文章的标题
title: 我想让obsidian图片居中！
# 这是侧边栏的顺序
order: 2
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
其实图片的对齐很早就解决了，我在obsidian中已经实现了。但不知道为什么在不同的用户那里，效果不一致。于是有了今天的解决方案：

## 1 基本方案对齐
在obsidian中，利用 markdown 语法可以直接让图片居中。具体语法参考[markdown图片语法](/zh/markdown/image.md)。详细描述了，下面给出一个具体示例：

**示例：**

```markdown
![[Pasted image 20221125235721.png#pic_center|650]]
```
::: danger 语法
在你的图片调用后追加以上的命令

- 其中`#pic_center`表示图片居中，还有`pic_left`、`pic_right`
- 其中`|650` 表示宽度650
:::

::: tip 自定义标题
如果你能使用这个语法，就不用继续看了。如果不行，看下面的补充方案。
:::

## 2 补充对齐语法方案
方法比较简单，对于这个语法不支持的朋友，用我写的一段css来做支持就可以了。

**使用方法：**  
1. 复制以下代码，保存为`coffeebean-补充图片对齐语法.css`文件格式
2. 将`coffeebean-补充图片对齐语法.css`复制到库的css片段中，刷新obsidian片段。重启obsidian生效


::: tip 添加启动css片段的方法
1. 打开obsidian设置 → 外观 → CSS 代码片段，点击此处的文件夹图标📁，打开css片段文件夹
2. 复制你的css文件到这个文件夹，回到obsidian中，刷新并启动片段。偶尔需要重启ob生效
:::

**代码**  
代码框右下有复制按钮，点击自动复制代码
```css
  
/* 
@Author   : 咖啡豆  
@contact  : https://coffeetea.top/  
@File     : coffeebean-补充图片对齐语法.css  
@Software : vscode  
@Date     : 2023-02-13 17:53:32  
@upDate   : 2023-02-13 17:53:37  
@Desc     : 强制增加图片对齐语法  
            在md文件中，图片的对齐语法是：![[Pasted image 20221125235721.png#pic_center|500]]  
*/  
  
/* 正则匹配，如果图片的链接中包含 #pic_center 的，图片居中显示 */.markdown-preview-view .image-embed[src*="#pic_center"] {  
    display: block;  
    margin-left: auto;  
    margin-right: auto;  
    width: 50%;  
}  
  
/* 正则匹配，如果图片的链接中包含 #pic_left 的，图片居左显示 */.markdown-preview-view .image-embed[src*="#pic_left"] {  
    display: block;  
    margin-left: 0;  
    margin-right: auto;  
    width: 50%;  
}  
  
/* 正则匹配，如果图片的链接中包含 #pic_right 的，图片居右显示 */.markdown-preview-view .image-embed[src*="#pic_right"] {  
    display: block;  
    margin-left: auto;  
    margin-right: 0;  
    width: 50%;  
}  
  
/*实时编辑模式，如果图片的链接中包含 #pic_center 的，图片居中显示*/  
.markdown-source-view.mod-cm6.is-live-preview .image-embed[src$="center"] {  
    display: block;  
    margin-left: auto !important;  
    margin-right: auto !important;  
    width: 50%;  
}  
  
/*实时编辑模式，如果图片的链接中包含 #pic_left 的，图片居左显示*/  
.markdown-source-view.mod-cm6.is-live-preview .image-embed[src$="left"] {  
    display: block;  
    margin-left: 0 !important;  
    margin-right: auto !important;  
    width: 50%;  
}  
  
/*实时编辑模式，如果图片的链接中包含 #pic_right 的，图片居右显示*/  
.markdown-source-view.mod-cm6.is-live-preview .image-embed[src$="right"] {  
    display: block;  
    margin-left: auto !important;  
    margin-right: 0 !important;  
    width: 50%;  
}
```


