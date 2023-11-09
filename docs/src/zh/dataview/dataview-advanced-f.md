---
title: dataview常用语法速查🚀
order: 6
icon: page
headerDepth: 2
number headings: auto, first-level 3, max 6, start-at 1, 1.1
---
::: tip 更新说明
- 2023-10-20 ✨新增 dataview和dataviewjs常用语法速查表，方便一键复制。节省时间。

注意，鼠标在代码块上右侧会有个复制图标，可直接复制代码。推荐复制避免出错

主打一个拿来就用，请直接复制使用。
:::


## dataview语法速查表

### 1 查询文件夹和标签

::: warning 代码可复制
注意，鼠标在代码块上右侧会有个复制图标，可直接复制代码。推荐复制避免出错
:::

::: code-tabs
@tab 查询指定文件夹内容
````lua
```dataview
list
from "咖啡豆子文件夹"
```
````
@tab 查询指定标签的内容
````lua
```dataview
list
from #咖啡豆子标签
```
````
@tab 查询文件夹下+标签的内容(同时满足)
````lua
list
from "咖啡豆子文件夹" and #咖啡豆子标签
````
:::

### 2 排除某个文件夹或者标签from语法
::: code-tabs
@tab 排除指定文件夹内容
````lua
```dataview
list
from -"排除文件夹的名字"
```
````
@tab 排除指定标签的内容
````lua
```dataview
list
from -#咖啡豆子标签
```
````
@tab 查询文件夹+并排除指定标签的内容(同时满足)
````lua
list
from "咖啡豆子文件夹" -#咖啡豆子标签
````
:::

::: danger 筛选条件
我们可以使用几个条件进行筛选，非常容易理解。  
注意英文符号，前后有一个空格
- `and` ：和，同时满足
- `or` ：或者，任选其一
- `-`：  减去，排除掉这个条件
:::


### 3 排除文件夹或文件使用where语法

::: code-tabs
@tab 排除指定文件夹内容
````lua
```dataview
list
from #标签名
where file.folder != "咖啡豆的文件夹"
```
````
@tab 排除当前文件
````lua
```dataview
list
from "咖啡豆的文件夹"
where file.name != this.file.name
```
````

:::

## dataviewjs代码速查

因为 dataviewjs 代码都比较的复杂，所以不直接在这里放出来，每个代码一个页面，从下面的列表链接过去。

- [dataviewjs查关键字所在行的内容](/zh/dataview-snippets/dvjs-inline-keywords.md)
- [dataview-限定标签-显示关键字所在行](/zh/dataview-snippets/Dvjs-QueryTags-inlineKeywords.md)