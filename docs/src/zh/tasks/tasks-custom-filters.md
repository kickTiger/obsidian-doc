---
# 这是文章的标题
title: tasks自定义过滤器
# 这是侧边栏的顺序
order: 5
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
::: tip 更新说明
- Tasks 4.2.0 中引入了自定义过滤器 Custom Filters
- 2023-09-30 tasks更新之后添加了 `自定义过滤器`
:::

自定义过滤器，是一个很灵活的过滤器，给tasks增加更多有意思的玩法。所以特地把这个拿出来开一篇。

我不想把这个变成另一个官方文档，所以我只写出来直接能用的东西，简单明了的好。其实这个就是允许你在 tasks 插件内置的语法基础上，创造你自己的查询语法。（因为他类似于JavaScript的语法了）


### 案例1：日期属性

::: danger 注意
利用新的 自定义过滤器，我们可以很容易实现
- 查询本周的相关任务，到期，创建，开始，重复等等
- 查询本月的相关任务，
- 查询指定**某一天**所在的周/月的相关任务
:::

注意：下面👇的2个代码块是联动的，点击上面，下面的会显示对应的注解。

::: code-tabs#实战1
@tab 1 任务描述长度#id11
````js
filter by function task.description.length > 100
````
@tab 2 所有星期二的任务#id22
````js
filter by function task.due.format('dddd') === 'Tuesday'
````
@tab 3 查找今天或之前到期#id33
````js
filter by function task.due.moment?.isSameOrAfter(moment(), 'day') || false
````
@tab 4 查找2023-09-30所在周到期#id44
````js
filter by function task.due.moment?.isSame(moment('22023-09-30'), 'week') || false
````


:::

::: code-tabs#实战1
@tab 1 任务描述长度#id11
````markdown
查找描述较长的任务。
````
@tab 2 所有星期二的任务#id22
````markdown
查找周二到期的任务，也就是任何周二。
在非英语系统中，您可能需要以当地语言提供星期几
````
@tab 3 查找今天或之前到期#id33
````markdown
查找今天或更早到期的所有任务
````
@tab 4 查找2023-09-30所在周到期#id44
````markdown
查找2023-09-30这天，所在周，到期的所有任务
````

:::

注意上面函数中可**替换**的地方：

1. **日期**
	- due 到期时间，可替换为，created/starts/scheduled/happens
2. **时间范围函数**
	- isSame：一样的日期
	- isSameOrAfter：一样的日期或者之前
	- isSameOrBefore：一样的日期或者之后
3. **日期单位**
	- day：日
	- week：周
	- month：月
	- quarter：季度
	- year：年

### 案例2:文件夹
```js
//查找所有截止日期为 2023-10-01 的任务。
filter by function task.due.moment?.isSame(moment('2023-10-01'), 'day') || false

//查找所有 2023-10-01 当周的所有任务
filter by function task.due.moment?.isSame(moment('2023-10-01'), 'week') || false

//只查询指定目录下任务，不包括子文件夹
filter by function task.file.folder === "Work/Projects/"

//查询指定目录下所有任务，包括子文件夹
filter by function task.file.folder.includes("Work/Projects/")


```