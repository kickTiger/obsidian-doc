---
# 这是文章的标题
title: 图片
# 这是侧边栏的顺序
order: 8
# 这是页面的图标
icon: page
---
## 基础图片语法
可以插入图片，语法如下：
::: code-tabs
@tab 图片
```markdown
![图片名称](http://图片网址/images/logo.png)
```
@tab 带链接的图片
```markdown
[![GitHub Logo](/images/logo.png)](https://github.com/)

[![替代文字](image_url)](link_url)
```
@tab 参考风格
```markdown
![替代文字][logo]

[logo]: /images/logo.png "Logo Title"
```
:::

## 图片对齐和尺寸
在基础图片语法的图片链接后面，加上控制语法，可以控制图片的居中方式和尺寸大小。

::: code-tabs
@tab 图片居中和左右对齐
```markdown
#pic_center 图片居中
#pic_left 图片靠左
#pic_right 图片靠右

示例
![图片名称](http://图片网址/images/logo.png#pic_center)
```
@tab 图片尺寸
```markdown
|180x180 宽度 x 高度
|650 宽度，高度自适应
#pic_center|650 图片居中，宽度650，高度自适应

示例
![图片名称](http://图片网址/images/logo.png#pic_center|650)
```
:::

::: danger 在obsidian中用下面的方法
强烈建议在obsidian中，使用内链的方式嵌入图片！如下！  
强烈建议在obsidian中，使用内链的方式嵌入图片！如下！   
强烈建议在obsidian中，使用内链的方式嵌入图片！如下！ 
:::

## obsidian中的图片语法🎁
::: danger 完全体用法
```markdown
![[Pasted image 20221125235721.png#pic_center|650]]
```

如果不生效，那么请打补丁，使用我写的增强css即可。
- 🚀[新增图片对齐语法](/zh/css-snippets/image-alignment-syntax.md) 对于不能使用对齐语法的，可以使用这个css片段，然后对齐语法就会生效

:::


在 obsidian 中，会有一些特殊的语法。比如**内链的图片格式**中。
```markdown
![[Pasted image 20221125235721.png]] 
```

对这个图片居中：   
但是这个代码会显示图片的名称，有一点点瑕疵
```
![[Pasted image 20221125235721.png#pic_center]] 
```

::: tip 优化图片居中代码
在代码的最后加一个 `|` ，就会不显示文件名了
````markdown
![[Pasted image 20221125235721.png#pic_center|]] 
````
:::

::: info 图片居中加上尺寸控制
````markdown
![[Pasted image 20221125235721.png#pic_center|650]]
````
:::

## 给图片加描述 Caption
在html语言中，会给图片加一个`Alt`参数，表示图片的描述。在有些编辑器里，会在图片的底下加上一个描述并显示。

::: tip
obsidian 中原生并不支持这样的语法，所以我们需要借助插件来简单的实现这个过程
:::

::: info 
此方法来自：群友`@BCS` 
:::

**简单两步操作即可：**
1. 安装插件：`obsidian-image-captions` ，未上架插件可使用`Obsidian42 - BRAT`插件进行安装体验。
2. 在图片链接按以下格式添加即可
```markdown
![[Pasted image 20230106152713.png|咖啡豆文档]]
```

