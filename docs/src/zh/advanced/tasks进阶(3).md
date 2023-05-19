---
number headings: auto, first-level 2, max 6, start-at 1, 1.1
# 这是文章的标题
title: tasks进阶(3)
# 这是侧边栏的顺序
order: 3
# 这是页面的图标
icon: page
# 控制左侧显示层数(只显示2层)，但是右侧会显示3级
headerDepth: 2
---
## 1 Sorting 排序
可用的参数，可以用下面这些排序：
- **File locations**  文件位置
	- `sort by path `
	- `sort by filename`
- **File contents** 文件内容
	- `sort by heading` 
- **Task date properties** 任务日期属性
	- `created` : 创建时间
	- `start`：开始时间
	- `scheduled`：预定 
	- `due`：到期时间
	- `done`：完成时间
	- `happens`：开始日期、预定日期和到期日期中最早的日期
- **Task statuses**  任务状态
	- 1.  `status` (done or todo)  任务状态
	-  2. `status.name` (Done, Todo, Cancelled, In Progress, Unknown, My very important custom status, etc - sorted alphabetically) 状态.名称
	-  3. `status.type` (Sorted in the order , , , then `IN_PROGRESS``TODO``DONE``CANCELLED``NON_TASK`) 状态.类型
- **Other task properties** 其他任务属性
	-  `priority` (priority of the task; "low" is below "none": ) 优先级
	-  `urgency`  迫切性
	-  `recurring` (经常性任务排在非经常性任务之前: ) 反复出现的
	-  `tag` (the description of the task) 标签
	-  `description` (the description of the task) 描述

## 2 backlinks 反向链接
反向链接如下样式，可以看到任务从哪里来。
- `show backlinks` 显示反向链接
- `hide backlinks`  隐藏反向链接
![](/assets/2023051201010800.png)

## 3 多重排序
你可以添加多个查询选项，每个选项都在一个额外的行上。第一个排序具有最高的优先权。之后的每一个将在现有的排序中进行排序。

````sql
```tasks
sort by status
sort by due
sort by path
```
````

## 4 Examples 举例

````md
```tasks
not done
due today
sort by due
```

```tasks
done
sort by done reverse
```

```tasks
not done
due before next monday
sort by status
sort by description reverse
sort by path
```
````

## 5 高级设置
### 5.1 Daily Agenda 每日议程



| Daily Notes 每日笔记     | Calendar 日历                    | Periodic Notes 定期报告          |                                  |
| :----------------------- | :------------------------------- | :------------------------------- | -------------------------------- |
| template syntax 模板语法 | `due on {{date+14d:YYYY-MM-DD}}` | `due on {{date+14d:YYYY-MM-DD}}` | `due on {{date+14d:YYYY-MM-DD}}` |
| output 输出              | `due on {{date+14d:YYYY-MM-DD}}` | `due on 2021-08-28`              | `due on 2021-08-28`              |



### 5.2 每日日程模板示例
````md
## Tasks
### Overdue
```tasks
not done
due before {{date:YYYY-MM-DD}}
```

### Due today
```tasks
not done
due on {{date:YYYY-MM-DD}}
```

### Due in the next two weeks
```tasks
not done
due after {{date:YYYY-MM-DD}}
due before {{date+14d:YYYY-MM-DD}}
```

### No due date
```tasks
not done
no due date
```

### Done today
```tasks
done on {{date:YYYY-MM-DD}}
```
````

## 6 Quickadd
quickadd插件可以帮助创建任务。除了用于创建任务的正式命令之外，您还可以使用具有自定义捕获格式的quickadd命令

### 6.1 栗子1🌰
```markdown
#task {{VALUE:task name}} ⏰ {{VDATE:reminder date and time,YYYY-MM-DD HH:mm}} {{VALUE:⏫,🔼,🔽, }} 🔁 {{VALUE:recurrence}} 🛫 {{VDATE:start date,YYYY-MM-DD}} ⏳ {{VDATE:scheduled date,YYYY-MM-DD}} 📅 {{VDATE:due date,YYYY-MM-DD}}
```

### 6.2 栗子2🌰
#### 6.2.1 仅具有截止日期的任务
```markdown
#task {{VALUE:task name}} 📅 {{VDATE:due date,YYYY-MM-DD}}
```

#### 6.2.2 具有优先级、提醒日期和到期日的任务：
```markdown
#task {{VALUE:task name}} ⏰ {{VDATE:reminder date and time,YYYY-MM-DD HH:mm}} {{VALUE:⏫,🔼,🔽, }} 📅 {{VDATE:due date,YYYY-MM-DD}}
```

#### 6.2.3 具有重复性、计划日期和开始日期的任务
```markdown
#task {{VALUE:task name}} 🔁 {{VALUE:recurrence}} 🛫 {{VDATE:start date,YYYY-MM-DD}} ⏳ {{VDATE:scheduled date,YYYY-MM-DD}}
```

### 6.3 如何添加quickadd命令
1.  Install [Natural Language Dates](https://github.com/argenos/nldates-obsidian) and [quickadd](https://github.com/chhoumann/quickadd)  
    安装 Natural Language Dates 和quickadd
2.  选择 `capture` 选项，然后单击flash emoji使其在命令面板上可见
3.  启用 `save as task` 选项，然后启用 `capture format` 选项并粘贴自定义格式

## 7 Tasks API
Tasks公开了一个API，可用于将Tasks集成到其他插件、脚本或动态代码块中

### 7.1 使用QuickAdd
最常见的使用场景之一可能是与QuickAdd插件结合使用，以自动向特定文件添加任务。为此，您需要输入以下代码作为捕获格式：

````markdown

```js quickadd
return await this.app.plugins.plugins['obsidian-tasks-plugin'].apiV1.createTaskLineModal();
```  

````

#### 7.1.1 创建快速添加捕获
![](/assets/2023051201014117.png)
#### 7.1.2 配置快速添加捕获
![](/assets/2023051201014142.png)
QuickAdd捕获设置的屏幕截图（示例）

![](/assets/2023051201014156.png)
