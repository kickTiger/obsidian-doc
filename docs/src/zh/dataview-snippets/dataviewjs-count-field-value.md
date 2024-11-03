---
title: dataviewjs统计今天喝水总量
order: 5
icon: page
headerDepth: 2
---
### 说明

假设你今天喝水无数次，每次若干，然后在当前页面统计今天喝水的总数。

喝水量:: 50 
喝水量:: 100

查询结果：

> 今天的总喝水量为 150 ml
### 使用方法

1. 在正文中插入喝水的数量，使用dataview的内联字段，格式是 `喝水量:: 50`，使用英文的两个冒号，后面跟上值，和其他内容之间要有空格。或者单独一行
2. 查询代码如下，复制以下代码，在任意md文件中插入即可。

::: tip 添加dataview查询的方法
1. 用代码块包裹查询代码（第一行注明语言 `dataview`和最后一行对应结尾）
2. 任意位置插入即可，注意修改文件路径和查询条件
:::
### 代码

代码框右下有复制按钮，点击自动复制代码

````sql
```dataviewjs
// 公众号 #蹦跶的咖啡豆 www.obsidian.vip 制作，访问获取最新版
let totalWater = 0;

// 获取当前文件中所有“喝水量”字段的值
let waterEntries = dv.current().喝水量;

// 检查“喝水量”字段是否存在且有内容
if (waterEntries) {
    // 如果喝水量是单个数字，将其直接转为数组形式
    if (!Array.isArray(waterEntries)) {
        waterEntries = [waterEntries];
    }

    // 遍历所有喝水量条目并求和
    for (let amount of waterEntries) {
        let num = parseInt(amount);
        if (!isNaN(num)) {
            totalWater += num;
        }
    }
}

// 输出今天的总喝水量
dv.paragraph(`今天的总喝水量为 ${totalWater} ml`);

```
````