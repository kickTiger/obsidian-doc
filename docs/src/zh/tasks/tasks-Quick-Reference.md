---
# 这是文章的标题
title: tasks语法快速参考
# 这是侧边栏的顺序
order: 7
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
## task语法查速查表
建议多看这个里面的内容，这个就是所有的tasks语法发的一览表，忘记语法的时候查询比较方便一点。

::: tip 更新说明
- 2023-09-30 更新，包括新版中的自定义过滤器等新特性
:::

|                                                              |                                          |                        |                        |                                                           |
| :----------------------------------------------------------- | :--------------------------------------- | :--------------------- | :--------------------- | :-------------------------------------------------------- |
| **Filters\|过滤器**                                          | **Sort\|排序**                           | **Group\|分组**        | **Display\|展示**      | **Scripting \| JavaScript脚本**                           |
| **Status**\|状态                                             |                                          |                        |                        |                                                           |
| `done` `not done`                                            | `sort by status`                         | `group by status`      |                        | `task.isDone`                                             |
| `status.name (includes, does not include) <string>` `status.name (regex matches, regex does not match) /regex/i` | `sort by status.name`                    | `group by status.name` |                        | `task.status.name`                                        |
| `status.type (is, is not) (TODO, DONE, IN_PROGRESS, CANCELLED, NON_TASK)` | `sort by status.type`                    | `group by status.type` |                        | `task.status.type`                                        |
|                                                              |                                          |                        |                        | `task.status.symbol`                                      |
|                                                              |                                          |                        |                        | `task.status.nextSymbol`                                  |
| **Dates**\|日期                                              |                                          |                        |                        |                                                           |
| `done (on, before, after, on or before, on or after) <date>` `done (in, before, after, in or before, in or after) ...` `... YYYY-MM-DD YYYY-MM-DD` `... (last, this, next) (week, month, quarter, year)` `... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)` `has done date` `no done date` `done date is invalid` | `sort by done`                           | `group by done`        | `hide done date`       | `task.done`                                               |
| `created (on, before, after, on or before, on or after) <date>` `created (in, before, after, in or before, in or after) ...` `... YYYY-MM-DD YYYY-MM-DD` `... (last, this, next) (week, month, quarter, year)` `... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)` `has created date` `no created date` `created date is invalid` | `sort by created`                        | `group by created`     | `hide created date`    | `task.created`                                            |
| `starts (on, before, after, on or before, on or after) <date>` `starts (in, before, after, in or before, in or after) ...` `... YYYY-MM-DD YYYY-MM-DD` `... (last, this, next) (week, month, quarter, year)` `... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)` `has start date` `no start date` `start date is invalid` | `sort by start`                          | `group by start`       | `hide start date`      | `task.start`                                              |
| `scheduled (on, before, after, on or before, on or after) <date>` `scheduled (in, before, after, in or before, in or after) ...` `... YYYY-MM-DD YYYY-MM-DD` `... (last, this, next) (week, month, quarter, year)` `... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)` `has scheduled date` `no scheduled date` `scheduled date is invalid` | `sort by scheduled`                      | `group by scheduled`   | `hide scheduled date`  | `task.scheduled`                                          |
| `due (on, before, after, on or before, on or after) <date>` `due (in, before, after, in or before, in or after) ...` `... YYYY-MM-DD YYYY-MM-DD` `... (last, this, next) (week, month, quarter, year)` `... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)` `has due date` `no due date` `due date is invalid` | `sort by due`                            | `group by due`         | `hide due date`        | `task.due`                                                |
| `happens (on, before, after, on or before, on or after) <date>` `happens (in, before, after, in or before, in or after) ...` `... YYYY-MM-DD YYYY-MM-DD` `... (last, this, next) (week, month, quarter, year)` `... (YYYY-Www,YYYY-mm, YYYY-Qq, YYYY)` `has happens date` `no happens date` | `sort by happens`                        | `group by happens`     |                        | `task.happens`                                            |
| **Recurrence**\|重复                                         |                                          |                        |                        |                                                           |
| `is recurring` `is not recurring`                            | `sort by recurring`                      | `group by recurring`   |                        | `task.isRecurring`                                        |
| `recurrence (includes, does not include) <string>` `recurrence (regex matches, regex does not match) /regex/i` |                                          | `group by recurrence`  | `hide recurrence rule` | `task.recurrenceRule`                                     |
| **Priority** and **urgency** 重要\|紧急                      |                                          |                        |                        |                                                           |
| `priority is (above, below, not)? (lowest, low, none, medium, high, highest)` | `sort by priority`                       | `group by priority`    | `hide priority`        | `task.priorityName` `task.priorityNumber`                 |
|                                                              | `sort by urgency`                        | `group by urgency`     | `show urgency`         | `task.urgency`                                            |
| **File properties**\|文件属性                                |                                          |                        |                        |                                                           |
| `path (includes, does not include) <path>` `path (regex matches, regex does not match) /regex/i` `path includes {{query.file.path}}` `path includes {{query.file.pathWithoutExtension}}` | `sort by path`                           | `group by path`        |                        | `task.file.path` `task.file.pathWithoutExtension`         |
| `root (includes, does not include) <root>` `root (regex matches, regex does not match) /regex/i` `root includes {{query.file.root}}` |                                          | `group by root`        |                        | `task.file.root`                                          |
| `folder (includes, does not include) <folder>` `folder (regex matches, regex does not match) /regex/i` `folder includes {{query.file.folder}}` |                                          | `group by folder`      |                        | `task.file.folder`                                        |
| `filename (includes, does not include) <filename>` `filename (regex matches, regex does not match) /regex/i` `filename includes {{query.file.filename}}` `filename includes {{query.file.filenameWithoutExtension}}` | `sort by filename`                       | `group by filename`    |                        | `task.file.filename` `task.file.filenameWithoutExtension` |
| `heading (includes, does not include) <string>` `heading (regex matches, regex does not match) /regex/i` | `sort by heading`                        | `group by heading`     |                        | `task.hasHeading` `task.heading`                          |
|                                                              |                                          | `group by backlink`    | `hide backlink`        |                                                           |
| **Description**, **Tags** and other odds and ends 描述，标签和其他 |                                          |                        |                        |                                                           |
| `description (includes, does not include) <string>` `description (regex matches, regex does not match) /regex/i` | `sort by description`                    |                        |                        | `task.description` `task.descriptionWithoutTags`          |
| `has tags` `no tags` `tag (includes, does not include) <tag>` `tags (include, do not include) <tag>` `tag (regex matches, regex does not match) /regex/i` `tags (regex matches, regex does not match) /regex/i` | `sort by tag` `sort by tag <tag_number>` | `group by tags`        | `hide tags`            | `task.tags`                                               |
|                                                              |                                          |                        |                        | `task.originalMarkdown`                                   |
| **Scripting**  JavaScript脚本                                |                                          |                        |                        |                                                           |
| `filter by function`                                         |                                          | `group by function`    |                        |                                                           |
| **Combining Filters**组合过滤器                              |                                          |                        |                        |                                                           |
| `(filter 1) AND (filter 2)`                                  |                                          |                        |                        |                                                           |
| `(filter 1) OR (filter 2)`                                   |                                          |                        |                        |                                                           |
| `NOT (filter 1)`                                             |                                          |                        |                        |                                                           |
| `(filter 1) XOR (filter 2)`                                  |                                          |                        |                        |                                                           |
| `(filter 1) AND NOT (filter 2)`                              |                                          |                        |                        |                                                           |
| `(filter 1) OR NOT (filter 2)`                               |                                          |                        |                        |                                                           |
| `(filter 1) AND ((filter 2) OR (filter 3))`                  |                                          |                        |                        |                                                           |
| **Other Filter Options** 其他过滤器选项                      |                                          |                        |                        |                                                           |
| `exclude sub-items`                                          |                                          |                        |                        |                                                           |
| `limit to <number> tasks` `limit <number>`                   |                                          |                        |                        |                                                           |
| `limit groups to <number> tasks` `limit groups <number>`     |                                          |                        |                        |                                                           |
| **Other Layout Options**其他布局选项                         |                                          |                        |                        |                                                           |
| `hide edit button`                                           |                                          |                        |                        |                                                           |
| `hide task count`                                            |                                          |                        |                        |                                                           |
| `short mode`                                                 |                                          |                        |                        |                                                           |                                        | 短模式(简洁显示任务信息) |                        |                        |


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

