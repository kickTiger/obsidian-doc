---
# 这是文章的标题
title: dataview-查指定标签的文件
# 这是侧边栏的顺序
order: 2
# 这是页面的图标
icon: page
---
**说明：**  
实现通过 dataview 查询指定标签的文件，一个多多个标签

**使用方法：**  
1. 复制以下代码，在任意md文件中插入即可。
2. 注意修改文件路径为自己库中的路径，否则会报错

::: tip 添加dataview查询的方法
1. 用代码块包裹查询代码（第一行注明语言 `dataview`和最后一行对应结尾）
2. 任意位置插入即可，注意修改文件路径和查询条件
:::

**代码**  
代码框右下有复制按钮，点击自动复制代码
>注意：**以下是选项栏，可点击多个代码框**

::: code-tabs
@tab 查询指定标签名
````markdown
```dataview
list
from "文件夹名称" and #标签名
sort file.ctime desc
```
````
@tab 同时包括多个标签名
````markdown
```dataview
list
from "文件夹名称" and #标签名 and #标签名2
sort file.ctime desc
```
````
@tab 任意一个标签名
````markdown
```dataview
list
from #标签名 or #标签名2
sort file.ctime desc
```
````
@tab 排除标签名
````markdown
```dataview
list
from - #标签名
sort file.ctime desc
```
````
:::
