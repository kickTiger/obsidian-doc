---
# 这是文章的标题
title: dataviewjs-查关键字所在行内容
# 这是侧边栏的顺序
order: 3
# 这是页面的图标
icon: page
---
**说明：**  
实现通过 dataviewjs 查关键字所在行的数据

**使用方法：**  
1. 复制以下代码，在任意md文件中插入即可。
2. 注意修改文件路径为自己库中的路径，否则会报错

::: tip 添加dataviewjs查询的方法
1. 用代码块包裹查询代码（第一行注明语言 `dataviewjs`和最后一行对应结尾）
2. 任意位置插入即可，注意修改文件路径和查询条件
:::

**代码**  
代码框右下有复制按钮，点击自动复制代码

::: tip
此代码来源于网络，群友`@小汤园壹號`推荐，代码我重新注解了一下，可能更容易看清楚
:::

````markdown
```dataviewjs
// 整个代码是为了获取所有的md文件，然后过滤掉没有“#zk”的行，然后将文件名和行显示在表中  
  
//获取库中的所有md文件 const files = app.vault.getMarkdownFiles() // //创建一个包含文件名和包含所需标记的行的数组  
let arr = files.map(async(file) => {  
  // 读取文件并将内容作为字符串获取  
  const content = await app.vault.cachedRead(file)  //将所有内容转换为行的数组，并过滤掉包含标记“#zk”的行   
  let lines = await content.split("\n").filter(line => line.includes("#zk"))   
// 删除行中的标记和前置空格,以便于在表中显示。其中“-”是为了删除行中的“-”，“#zk”是为了删除行中的“#zk”，“  ”是为了删除行中的空格，  
  for(var i=0; i < lines.length; i++) {    lines[i] = lines[i].replace(/- /g, '');  
    lines[i] = lines[i].replace(/  /g, '');    lines[i] = lines[i].replace("#zk", '');  }    //删除空行  
  console.log(lines)  // 返回包含标记的行的文件名和行的数组   
  return ["[["+file.name.split(".")[0]+"]]", lines]  
})  
//解析promises并构建表   
Promise.all(arr).then(values => {  
console.log(values)  
// 过滤掉没有“#zk”的行,并且过滤掉zk log和timeline log ,因为zk log和timeline log是我自己的文件，不需要显示在表中,所以我过滤掉了,如果你不需要过滤掉zk log和timeline log，可以删除这两行代码  
const exists = values.filter(value => value[1][0] && value[0] != "[[ZK Log]]" && value[0] != "[[+ Timeline Log]]")  
//构建表，显示文件名和行 dv.table(["File", "Lines"], exists)  
})
```
````

下面重新着色一次，就不用 dataviewjs 标签包裹了  
```js
// 整个代码是为了获取所有的md文件，然后过滤掉没有“#zk”的行，然后将文件名和行显示在表中  
  
//获取库中的所有md文件 const files = app.vault.getMarkdownFiles() // //创建一个包含文件名和包含所需标记的行的数组  
let arr = files.map(async(file) => {  
  // 读取文件并将内容作为字符串获取  
  const content = await app.vault.cachedRead(file)  //将所有内容转换为行的数组，并过滤掉包含标记“#zk”的行   
  let lines = await content.split("\n").filter(line => line.includes("#zk"))   
// 删除行中的标记和前置空格,以便于在表中显示。其中“-”是为了删除行中的“-”，“#zk”是为了删除行中的“#zk”，“  ”是为了删除行中的空格，  
  for(var i=0; i < lines.length; i++) {    lines[i] = lines[i].replace(/- /g, '');  
    lines[i] = lines[i].replace(/  /g, '');    lines[i] = lines[i].replace("#zk", '');  }    //删除空行  
  console.log(lines)  // 返回包含标记的行的文件名和行的数组   
  return ["[["+file.name.split(".")[0]+"]]", lines]  
})  
//解析promises并构建表   
Promise.all(arr).then(values => {  
console.log(values)  
// 过滤掉没有“#zk”的行,并且过滤掉zk log和timeline log ,因为zk log和timeline log是我自己的文件，不需要显示在表中,所以我过滤掉了,如果你不需要过滤掉zk log和timeline log，可以删除这两行代码  
const exists = values.filter(value => value[1][0] && value[0] != "[[ZK Log]]" && value[0] != "[[+ Timeline Log]]")  
//构建表，显示文件名和行 dv.table(["File", "Lines"], exists)  
})
```