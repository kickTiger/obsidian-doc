---
# 这是文章的标题
title: dataview-限定标签-显示关键字所在行
# 这是侧边栏的顺序
order: 4
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
::: warning 致谢
感谢群友 `@Simon` ，此代码由他二次修改并发布
:::
**说明：**  
实现通过 dataview 查询指定文件夹下，指定标签下的所有文件，并显示指定关键字所在行，汇总数据

**使用方法：**  
1. 复制以下代码，在任意md文件中插入即可。
2. 注意修改文件路径为自己库中的路径，否则会报错

::: tip 添加dataview查询的方法
1. 用代码块包裹查询代码（第一行注明语言 `dataview`和最后一行对应结尾）
2. 任意位置插入即可，注意修改文件路径和查询条件
3. 注意此代码中需要修改几个地方
	1. file.path.includes("123")，其中的文件夹路径`123`
	2. const tag = "#tag1"，其中的文件标签名称`tag1`
	3. line.includes("#tag2"),其中的行内标签名称`tag2`，这里也可以修改为指定的关键字修改`#tag2`
:::



::: danger 加群交流

如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 示例库（筹备中）
:::

::: details 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =300x) 
::: 

::: details 🍻【点我-打赏】
![随缘支持](/assets/WeChat-Pay.jpg =x400)
::: 



**代码**  
代码框右下有复制按钮，点击自动复制代码
````js
```dataviewjs
// 整个代码是先筛选符合标签的笔记，再筛选笔记中的行内容是否具有标签，然后将文件名和行显示在表中。 
// 参考用//注释开关指定查询范围
//tag1限定笔记文件，tag2限定行内容

// 获取指定文件夹中的所有md文件,支持二级目录
const files = app.vault.getMarkdownFiles().filter(file => file.path.includes("123"))
// 预设标签1，从而限定笔记文件
const tag = "#tag1"
// 将指定文件夹中,带有标签1的文件筛选出来
const taggedFiles = new Set(files.reduce((acc, file) => {
    const tags = app.metadataCache.getFileCache(file).tags
    if (tags) {
      let filtered = tags.filter(t => t.tag === tag)
      if (filtered) {
        return [...acc, file]
      }
    }
    return acc
}, []))

//创建一个包含文件名和包含所需标记的行的数组
let arr = files.map(async(file) => {
  // 读取限定后的文件，并将其所有内容作为字符串获取
  const content = await app.vault.cachedRead(file)
  //将所有内容转换为行的数组，并提取包含标签“#tag2”的行 
  let lines = await content.split("\n").filter(line => line.includes("#tag2")) 
    // 删除行中的标记和前置空格,以便于在表中显示。其中“-”是为了删除行中的“-”，“#tag2”是为了删除行中的“#DEF”，“  ”是为了删除行中的空格。
  for(var i=0; i < lines.length; i++) { 
    lines[i] = lines[i].replace(/- /g, '');
    lines[i] = lines[i].replace(/  /g, '');
    lines[i] = lines[i].replace("#tag2", '');
  }
  //删除被上步骤替换后形成的空行
  console.log(lines)
  // 返回包含标记的行的文件名和行的数组 
  return ["[["+file.name.split(".")[0]+"]]", lines]
})

//解析promises并构建表 
Promise.all(arr).then(values => {
console.log(values)
// 过滤掉没有“#tag2”的行
const exists = values.filter(value => value[1][0])
//构建表，显示文件名和行 
dv.table(["File", "Lines"], exists)
})
```
````