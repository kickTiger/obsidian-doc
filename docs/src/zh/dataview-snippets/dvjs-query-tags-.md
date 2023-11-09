---
title: dataviewjs-列出标签所在段容落内容
order: 5
icon: page
headerDepth: 2
number headings: auto, first-level 3, max 6, start-at 1, 1.1
---
### 1 说明
实现通过 Dataview 列出标签所在段落的内容。本代码由咖啡豆社群 `@劉同學` 原创发布。注意几个点：
- 这个是列出了标签所在的段落，就是p元素。也就是 Obsidian 中的自然段落。
- 这个是单一标签的代码，还有同时限定多个标签条件的，是另外一段代码。


> 来自刘同学的说明：
> - 本段代码适用于收集独立知识片段和语录查询与展示（或其他需要查询的地方），之前找了好久，好多都是展示包含标签内容的所在文件夹，并不包括笔记内容，最后在搜索引擎和GPT的帮助下合成此代码。
> - 这样在收集知识片段的时候，如果暂时不知该如何给他设置文件夹分类，可以直接在文字后边加上所关联的标签。
> - 如果标签所在段落有回车可用引号或者方括号把整段文字引起来。

### 2 使用方法
1. 复制以下代码，在任意md文件中插入即可。
2. 注意修改文件路径为自己库中的路径，否则会报错

::: tip 添加dataview查询的方法
1. 用代码块包裹查询代码（第一行注明语言 `dataviewjs`和最后一行对应结尾）
2. 任意位置插入即可，注意修改文件路径和查询条件
:::

### 3 代码 
代码框右下有复制按钮，点击自动复制代码
````sql
```dataviewjs
//使用时修改关键词即可
const term ="#标签"
let folderpath="限定文件夹"
//更改为限定文件夹即可，留空为遍历所有笔记
const files = app.vault.getMarkdownFiles().filter(file=>file.path.includes(folderpath))
const arr = files.map(async ( file) => {
const content = await app.vault.cachedRead(file)
const lines = content.split("\n").filter(line => line.contains(term))
return lines
})
Promise.all(arr).then(values => 
dv.list(values.flat()))
```
````


::: code-tabs
@tab 1. 查询单一标签
````sql
```dataviewjs
//使用时修改关键词即可
const term ="#标签"
let folderpath="限定文件夹"
//更改为限定文件夹即可，留空为遍历所有笔记
const files = app.vault.getMarkdownFiles().filter(file=>file.path.includes(folderpath))
const arr = files.map(async ( file) => {
const content = await app.vault.cachedRead(file)
const lines = content.split("\n").filter(line => line.contains(term))
return lines
})
Promise.all(arr).then(values => 
dv.list(values.flat()))
```
````
@tab 2. 同时查询多个标签
````js

// 使用时修改关键词即可
const terms = ["#语录", "#笔记目录", "#标签3"]; // 要查询的多个标签
let folderPath = ""; // 更改为限定文件夹即可，留空为遍历所有笔记

const files = app.vault.getMarkdownFiles().filter(file => file.path.includes(folderPath));
const arr = files.map(async (file) => {
  const content = await app.vault.cachedRead(file);
  const lines = content.split("\n").filter(line => {
    return terms.map(term => line.includes(term)).every(result => result);
  });
  return lines;
});

Promise.all(arr).then(values => 
  dv.list(values.flat()));

````

:::