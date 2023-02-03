---
# 这是文章的标题
title: CSS片段-隐藏-#标题符号
# 这是侧边栏的顺序
order: 6
# 这是页面的图标
icon: page
---
**说明：**  
根据群友的需求，嫌弃编辑模式下的`#`号标题碍眼。这段代码就是隐藏编辑模式下标题的 `#`号。
::: tip 自定义标题
使用之后，意外的发现编辑时候，确实清爽了。

但是标题的等级就不容易看了，这个时候可以使用另外一段代码，显示 h 等级。
:::

**使用方法：**  
1. 复制以下代码，保存为`coffeebean-隐藏-编辑模式的#标题符号.css`文件格式
2. 将`coffeebean-隐藏-编辑模式的#标题符号.css`复制到库的css片段中，刷新obsidian片段。重启obsidian生效

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
@File     : coffeebean-隐藏-编辑模式的标题符号.css  
@Software : vscode  
@Date     : 2023-02-02  
@upDate   : 2023-02-02  
@Desc     : 隐藏编辑模式下的标题符号，比如：#、##、###、####、#####、######、  
*/  
.cm-formatting-header{  
    display: none;  
}
```