---
title: tasks常用示例汇总
order: 3
icon: page
headerDepth: 2
---
## 1 拿来就用

如果你就是简单使用，可以不用看后面的语法了。直接在这个页面里面复制粘贴就OK了，一般的使用应该是完全够用了。

## 2024-08-10
**✨新增** <Badge text="Features" type="tip" />  
- 鉴于被好些群友发现这个篇章偷懒了，所以决定把这里的资料补上
- 还有不懂的，建议加群交流，毕竟这里不可能把所有的特性都写上。

::: danger 加群交流
如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看[咖啡豆豆龙_哔哩哔哩](https://space.bilibili.com/618777356)) 视频教程。😜**关注、👍点赞、📀投币一键三连**
- 关注公众号(文章很多)：`蹦跶的咖啡豆
- 示例库（筹备中）
- 网站启用新域名：https://obsidian.vip 给VIP的你，很好记
:::

## 1 查询所有未完成的任务
```tasks
not done
```
**解释**: 这个查询会返回所有未完成的任务。`not done` 是最常见的过滤条件，用来筛选所有还没有标记为完成的任务。

## 2 查询创建日期为特定时间的任务
```tasks
created on 2024-08-01
```
**解释**: 这个查询会返回所有创建日期为 `2024-08-01` 的任务。`created on` 用于筛选在某个特定日期创建的任务。

## 3 查询指定日期之前完成的任务
```tasks
done before 2024-08-09
```
**解释**: 这个查询会返回所有在指定日期 `2024-08-09` 之前完成的任务。`done before` 是用来筛选在特定日期之前完成的任务。

## 4 查询特定截止日期的任务
```tasks
due on 2024-08-15
```
**解释**: 这个查询会返回所有截止日期为 `2024-08-15` 的任务。`due on` 用来筛选截止日期在某一天的任务。

## 5 查询7天内创建的任务
```tasks
created after -7 days

```
**解释**: 这个查询会返回所有在过去7天内创建的任务。`created after` 用于根据任务的创建日期进行过滤。

## 6 查询下周的任务
```tasks
due after this week
due before next week
```
**解释**: 这个查询会返回所有下周内需要完成的任务。通过 `due after this week` 和 `due before next week` 组合来筛选下一周的任务。


## 7 查询在特定时间段内完成的任务
```tasks
done after 2024-01-01
done before 2024-07-01
```
**解释**: 这个查询会返回所有在 `2024-01-01` 和 `2024-07-01` 之间完成的任务。`done after` 和 `done before` 的组合用于定义一个时间范围。


## 8 查询计划在未来7天内完成的任务
```tasks
due after today
due before in 7 days
```
**解释**: 这个查询会返回所有计划在未来7天内完成的任务。通过 `due after today` 和 `due before in 7 days` 可以精准地找到接下来一周需要处理的任务。

## 9 查询没有指定截止日期的任务
```tasks
no due date
```
**解释**: 这个查询会返回所有没有设置截止日期的任务。`no due date` 用于筛选出那些没有明确截止时间的任务。

## 10 查询某个标签的任务
```tasks
tag includes #蹦哒的咖啡豆 
```
**解释**: 这个查询会返回所有带有 `#work` 标签的任务。`tag includes` 用于筛选包含特定标签的任务。

## 11 查询某个文件夹中的任务
```tasks
not done
path includes 蹦哒的咖啡豆
```
**解释**: 这个查询会返回所有位于 `蹦哒的咖啡豆` 文件夹中的任务。`path includes` 用来根据任务所在文件的路径进行过滤。

## 12 查询指定优先级的任务
```tasks
priority is high
```
**解释**: 这个查询会返回所有优先级为 `high`（高）的任务。`priority is` 用于筛选特定优先级的任务（可以是 `low`、`medium`、`high`）。

## 13 查询任务标题中包含特定关键字的任务
```tasks
description includes 蹦哒的咖啡豆
```
**解释**: 这个查询会返回所有任务描述中包含 `蹦哒的咖啡豆` 这个关键词的任务。`description includes` 用于根据任务的标题或描述中的关键词进行过滤。


## 14 查询优先级为中等并且未完成的任务
```tasks
not done
priority is medium
```
**解释**: 这个查询会返回所有优先级为 `medium`（中等）且未完成的任务。通过组合 `not done` 和 `priority is medium` 可以筛选出同时满足两个条件的任务。

## 15 查询排除带有子任务的任务
```tasks
exclude sub-items
limit 10
```
**解释**: 这个查询会返回所有不包含子任务的任务。`exclude sub-items` 用于筛选出那些任务清单中没有子任务的父任务。 `limit 10` 这个是显示数量，为了防止演示代码太卡，请自行调整。

## 16 查询任务状态为“已取消”的任务
```tasks
filter by function task.status.symbol === '-'
```
**解释**: 这个自定义过滤器会返回所有状态为“已取消”（即带有 `[-]` 符号）的任务。`filter by function` 允许你使用 JavaScript 表达式来定义更复杂的过滤条件。




