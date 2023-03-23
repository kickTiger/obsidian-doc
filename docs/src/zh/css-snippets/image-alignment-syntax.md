---
# 这是文章的标题
title: CSS片段-图片对齐语法增强
# 这是侧边栏的顺序
order: 12
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
**说明：**  
为Obsidian新增图片对齐的语法，详见[图片语法](/zh/markdown/图片.md)
::: warning 这样调用
这个是加上图片尺寸
```markdown
![[Pasted image 20221125235721.png#pic_center|500]]
```
:::

::: danger 注意最大宽度
正文最大宽度是700，超过了也就不生效了
:::

**使用方法：**  
1. 复制以下代码，保存为`coffebean-图片对齐语法增强.css`文件格式
2. 将`coffebean-图片对齐语法增强.css`复制到库的css片段中，刷新obsidian片段。重启obsidian生效


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

/* 正则匹配，如果图片的链接中包含 #pic_center 的，图片居中显示 */
.markdown-preview-view .image-embed[src*="#pic_center"] {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
}

/* 正则匹配，如果图片的链接中包含 #pic_left 的，图片居左显示 */
.markdown-preview-view .image-embed[src*="#pic_left"] {
    display: block;
    margin-left: 0;
    margin-right: auto;
    width: 50%;
}

/* 正则匹配，如果图片的链接中包含 #pic_right 的，图片居右显示 */
.markdown-preview-view .image-embed[src*="#pic_right"] {
    display: block;
    margin-left: auto;
    margin-right: 0;
    width: 50%;
}

```