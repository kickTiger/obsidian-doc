---
title: Templater进阶用法
order: 3
icon: page
headerDepth: 2
---
这里增加一些进阶的用法，现临时放在这里，然后后面在详细的分类。

### 光标位置

插入模板后将光标设置到此位置

::: code-tabs
@tab 面板1
````js
<% tp.file.cursor(1) %>
````
@tab 面板2
````markdown
<% tp.file.cursor(2) %>
````
@tab 面板3
````markdown
<% tp.file.cursor(3) %>
````
:::

### tp的动态语法

有时候，我们需要的不仅仅是在调用模板的时候，或者新建为文件的时候生效。

动态语法就是在普通语法的 `%` 号后面加上 `+`.就会变成实时获取的模板语法了，比如下面的日期获取函数。

::: code-tabs#实战1
@tab 普通语法1#id11
````js
<% tp.date.now("YYYY-MM-DD") %>
````
@tab 普通语法2#id22
````js
<% tp.date.now %>
````
:::

::: code-tabs#实战1
@tab 动态语法1#id11
````js
<%+ tp.date.now("YYYY-MM-DD") %>
````
@tab 动态语法2#id22
````js
<%+ tp.date.now %>
````
:::

