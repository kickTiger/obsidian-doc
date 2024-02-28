---
title: dataview-查询所有类型的文件
order: 6
icon: page
headerDepth: 2
---
::: warning 致谢
感谢群友
- 原始思路：`@不是朱蒂`
- 代码优化：`@！`
:::
**说明：**  
实现通过 dataview 查询指定文件夹下，所有类型的文件。对dataview的插件进行补足

**使用方法：**  
1. 复制以下代码，在任意md文件中插入即可。
2. 注意修改文件路径为自己库中的路径，否则会报错

::: tip 添加dataview查询的方法
1. 用代码块包裹查询代码（第一行注明语言 `dataview`和最后一行对应结尾）
2. 任意位置插入即可，注意修改文件路径和查询条件
:::



::: danger 加群交流

如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 示例库（筹备中）
- 网站启用新域名：https://obsidian.vip 给VIP的你，很好记
:::

::: details 🌱【点我-扫码加群】
![加群交流！先加在拉](/assets/WeChat-QRcode.jpg =300x) 
::: 

::: details 🍻【点我-打赏】
![随缘支持](/assets/WeChat-Pay.jpg =x400)
::: 



### 查询任意文件类型（以 PDF 文件为例）

代码框右下有复制按钮，点击自动复制代码
````js
```dataviewjs
// 定义要输出的字符串
let str = "";

// 指定要查询的文件类型
let fileType = '.pdf';

// 获取 vault 中的所有文件
let files = this.app.vault.getAllLoadedFiles("");

// 遍历所有文件，判断是否是 PDF，把 PDF 文件链接拼接进字符串
files.forEach(file => {
if (file.path.endsWith(fileType)) {
str = str + "- [[" + file.name + "]]" + "\n";
}
});

// 输出字符串
dv.paragraph(str);

```
````

### 查询指定文件夹下的任意文件类型（以 assets 文件夹下的 PDF 文件为例）
代码框右下有复制按钮，点击自动复制代码
````
```dataviewjs
// 定义要输出的字符串
let str = "";

// 获取 vault 中的所有文件
let files = this.app.vault.getAllLoadedFiles();

// 指定要查询的文件夹路径
let folderPath = 'assets';

// 指定要查询的文件类型
let fileType = '.jpg';

// 遍历所有文件，将 PDF 文件链接拼接进字符串
files.forEach(file => {
if (file.path.startsWith(folderPath) && file.path.endsWith(fileType)) {
str = str + "- [[" + file.name + "]]\n";
}
});

// 输出字符串

dv.paragraph(str);
```
````