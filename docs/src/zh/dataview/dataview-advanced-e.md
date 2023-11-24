---
title: Dataview进阶(5)综合技巧
order: 5
icon: page
headerDepth: 2
---
::: tip 更新说明
- 2023-09-18 新增dataview综合技巧
:::
### 给list视图追加信息
有时候，我们希望在输出的list视图追加自定义信息，那么我们可以如下修改。 

下面会生成这样一种信息
- dataview综合信息 文件路径：


::: code-tabs#实战1
@tab list视图追加信息1#id11
````js
LIST "文件路径: " + file.folder + " _(created: " + file.cday + ")_"
FROM "Games"
````
@tab ist视图追加信息2#id22
````js
list rows.file.link   # list 后面可以跟描述，这个是表示加上链接
from "123 XMind"
sort file.ctime DESC
GROUP BY file.cday  # list可以分组，这里是隐式字段的创建时间
````
:::

::: code-tabs#实战1
@tab ist视图追加信息1#id11
````markdown
在 LIST 后面追加信息， 
"" 双引号之间是字符串，可直接显示
+ 号是拼接符号，将不同的内容拼接起来，不用管，按格式

---上面会显示为下面👇的样式---
文件名 文件路径：真实的文件路径_(created: 2023-09-19)
````
@tab ist视图追加信息2#id22
````markdown
在 LIST 后面追加信息， 
"" 双引号之间是字符串，可直接显示
+ 号是拼接符号，将不同的内容拼接起来，不用管，按格式

---上面会显示为下面👇的样式---
- 文件夹1
文件1
- 文件夹2
文件2
文件3
文件4
````
:::

### 给group by分组增加条件

有时候我们需要对 `group`分组的结果进行管理，原始的语法这里，我们可以使用两种东西

- GROUP BY field  可以通过字段，比如隐式字段file.ctime
- GROUP BY (computed_field) AS name 计算后的结果


