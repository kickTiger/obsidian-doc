---
title: 4. Bases实用示例
icon: code
order: 4
category:
  - Bases
  - 代码实例
tag:
  - Bases
  - 示例
  - 实战
---

# Bases实用示例

本文提供了丰富的 Obsidian Bases 实用示例，帮助您更好地理解和应用 Bases 功能来管理不同类型的信息和项目。

## 1 项目管理系统

### 1.1 基础项目追踪

创建一个完整的项目管理 Base：

```yaml
# 项目管理.base
views:
  - name: "活跃项目"
    filters:
      and:
        - file.hasTag("project")
        - status == "active"
    properties:
      - name
      - status
      - priority
      - deadline
      - progress
      - assignee

  - name: "即将到期"
    filters:
      and:
        - file.hasTag("project")
        - deadline <= today() + "7d"
        - status != "completed"
    properties:
      - name
      - deadline
      - days_remaining: "formula"
      - priority
      - status

  - name: "高优先级"
    filters:
      and:
        - file.hasTag("project")
        - priority >= 8
        - status != "completed"
    properties:
      - name
      - priority
      - deadline
      - assignee
      - progress_bar: "formula"
```

### 1.2 项目公式示例

```javascript
// 计算剩余天数
days_remaining: (deadline - today()).days()

// 进度条显示
progress_bar: progress >= 100 ? "✅ 完成" : 
              progress >= 75 ? "🟢 " + progress + "%" : 
              progress >= 50 ? "🟡 " + progress + "%" : 
              progress >= 25 ? "🟠 " + progress + "%" : 
              "🔴 " + progress + "%"

// 状态优先级
status_icon: status == "completed" ? "✅" : 
             status == "active" ? "🚀" : 
             status == "paused" ? "⏸️" : 
             status == "planning" ? "📋" : "❓"
```

## 2 个人任务管理

### 2.1 每日任务视图

```yaml
# 任务管理.base
views:
  - name: "今日任务"
    filters:
      and:
        - file.hasTag("task")
        - due_date == today()
    properties:
      - name
      - priority
      - estimated_time
      - category
      - completed: "checkbox"

  - name: "本周任务"
    filters:
      and:
        - file.hasTag("task")
        - due_date >= today()
        - due_date <= today() + "7d"
    properties:
      - name
      - due_date
      - priority
      - time_to_deadline: "formula"
      - category

  - name: "逾期任务"
    filters:
      and:
        - file.hasTag("task")
        - due_date < today()
        - completed != true
    properties:
      - name
      - due_date
      - days_overdue: "formula"
      - priority
      - urgency_level: "formula"
```

### 2.2 任务管理公式

```javascript
// 截止时间倒计时
time_to_deadline: due_date <= today() ? "已过期" : 
                  (due_date - today()).days() + " 天后"

// 逾期天数
days_overdue: (today() - due_date).days()

// 紧急程度
urgency_level: days_overdue > 7 ? "🔥 极紧急" : 
               days_overdue > 3 ? "⚠️ 紧急" : 
               days_overdue > 0 ? "⏰ 超期" : "⭐ 正常"

// 任务时间估算
time_display: estimated_time <= 30 ? estimated_time + "分钟" : 
              estimated_time <= 480 ? (estimated_time / 60).round(1) + "小时" : 
              (estimated_time / 480).round(1) + "天"
```

## 3 知识库管理

### 3.1 笔记分类系统

```yaml
# 知识库.base
views:
  - name: "最新笔记"
    filters:
      and:
        - file.ctime >= today() - "30d"
        - !file.hasTag("template")
    properties:
      - name
      - tags
      - created: "file.ctime"
      - word_count: "formula"
      - quality_score

  - name: "待完善"
    filters:
      and:
        - file.hasTag("draft")
        - quality_score < 7
    properties:
      - name
      - quality_score
      - last_modified: "file.mtime"
      - improvement_needed: "formula"

  - name: "高质量笔记"
    filters:
      and:
        - quality_score >= 8
        - !file.hasTag("draft")
    properties:
      - name
      - quality_score
      - tags
      - backlink_count: "formula"
      - influence_score: "formula"
```

### 3.2 知识库公式

```javascript
// 字数统计（模拟）
word_count: file.size > 1000 ? "长文" : 
            file.size > 500 ? "中等" : "短文"

// 改进建议
improvement_needed: quality_score < 5 ? "需要重写" : 
                    quality_score < 7 ? "需要完善" : 
                    quality_score < 8 ? "小幅优化" : "优秀"

// 反向链接计数（示例）
backlink_count: file.inlinks.length

// 影响力评分
influence_score: (quality_score * 0.6) + (backlink_count * 0.4)
```

## 4 读书管理系统

### 4.1 阅读追踪

```yaml
# 读书清单.base
views:
  - name: "当前阅读"
    filters:
      and:
        - file.hasTag("book")
        - reading_status == "reading"
    properties:
      - title
      - author
      - current_page
      - total_pages
      - progress_percentage: "formula"
      - daily_pages: "formula"
      - estimated_completion: "formula"

  - name: "待读书单"
    filters:
      and:
        - file.hasTag("book")
        - reading_status == "to-read"
    properties:
      - title
      - author
      - priority
      - category
      - pages
      - estimated_reading_time: "formula"
      - added_date

  - name: "已完成"
    filters:
      and:
        - file.hasTag("book")
        - reading_status == "completed"
    properties:
      - title
      - author
      - rating
      - completion_date
      - reading_duration: "formula"
      - favorite: "checkbox"
```

### 4.2 阅读管理公式

```javascript
// 阅读进度百分比
progress_percentage: total_pages > 0 ? 
                     (current_page / total_pages * 100).round(1) + "%" : "0%"

// 每日阅读页数（假设）
daily_pages: reading_start_date ? 
             (current_page / (today() - reading_start_date).days()).round(1) : 0

// 预计完成时间
estimated_completion: daily_pages > 0 ? 
                      today() + ((total_pages - current_page) / daily_pages) + "d" : 
                      "未知"

// 阅读时长
reading_duration: completion_date && reading_start_date ? 
                  (completion_date - reading_start_date).days() + " 天" : "进行中"

// 预估阅读时间（每页2分钟）
estimated_reading_time: pages ? (pages * 2 / 60).round(1) + " 小时" : "未知"
```

## 5 健康生活管理

### 5.1 习惯追踪系统

```yaml
# 生活管理.base
views:
  - name: "今日习惯"
    filters:
      and:
        - file.hasTag("habit")
        - date == today()
    properties:
      - habit_name: "name"
      - completed: "checkbox"
      - target_value
      - actual_value
      - completion_rate: "formula"
      - streak_status: "formula"

  - name: "习惯统计"
    filters:
      and:
        - file.hasTag("habit")
        - date >= today() - "30d"
    properties:
      - habit_name: "name"
      - total_attempts: "formula"
      - success_count: "formula"
      - success_rate: "formula"
      - longest_streak: "formula"
      - current_streak: "formula"

  - name: "健康指标"
    filters:
      and:
        - file.hasTag("health")
        - date >= today() - "7d"
    properties:
      - date
      - weight
      - exercise_minutes
      - sleep_hours
      - mood_score
      - health_trend: "formula"
```

### 5.2 健康管理公式

```javascript
// 完成率计算
completion_rate: target_value > 0 ? 
                 (actual_value / target_value * 100).round(1) + "%" : "0%"

// 连续天数状态
streak_status: completed ? "🔥 继续保持" : "💔 中断了"

// 成功率统计
success_rate: total_attempts > 0 ? 
              (success_count / total_attempts * 100).round(1) + "%" : "0%"

// 健康趋势
health_trend: weight <= target_weight && 
              exercise_minutes >= 30 && 
              sleep_hours >= 7 ? "📈 向好" : 
              "📉 需改善"

// 心情图标
mood_display: mood_score >= 8 ? "😊 很好" : 
              mood_score >= 6 ? "🙂 不错" : 
              mood_score >= 4 ? "😐 一般" : 
              mood_score >= 2 ? "😟 不好" : "😢 很糟"
```

## 6 财务管理系统

### 6.1 支出追踪

```yaml
# 财务管理.base
views:
  - name: "本月支出"
    filters:
      and:
        - file.hasTag("expense")
        - date >= today().startOf("month")
    properties:
      - description: "name"
      - amount
      - category
      - date
      - payment_method
      - necessity: "formula"

  - name: "分类统计"
    filters:
      and:
        - file.hasTag("expense")
        - date >= today().startOf("month")
    group_by: "category"
    properties:
      - category
      - total_amount: "formula"
      - transaction_count: "formula"
      - average_amount: "formula"
      - budget_status: "formula"

  - name: "大额支出"
    filters:
      and:
        - file.hasTag("expense")
        - amount >= 1000
    properties:
      - description: "name"
      - amount
      - date
      - category
      - justification
      - impact_level: "formula"
```

### 6.2 财务管理公式

```javascript
// 支出必要性评估
necessity: category == "食物" || category == "住房" || category == "交通" ? 
           "🟢 必需" : 
           category == "娱乐" || category == "购物" ? 
           "🟡 可选" : "🔴 奢侈"

// 预算状态
budget_status: total_amount <= budget_limit ? 
               "✅ 预算内" : 
               total_amount <= budget_limit * 1.1 ? 
               "⚠️ 接近预算" : "🚫 超预算"

// 影响程度
impact_level: amount >= 5000 ? "💰 重大支出" : 
              amount >= 1000 ? "💳 较大支出" : 
              amount >= 500 ? "💵 中等支出" : "💶 小额支出"

// 平均金额
average_amount: total_amount / transaction_count

// 月度对比
month_comparison: total_amount > last_month_total ? 
                  "📈 增加 " + ((total_amount - last_month_total) / last_month_total * 100).round(1) + "%" : 
                  "📉 减少 " + ((last_month_total - total_amount) / last_month_total * 100).round(1) + "%"
```

## 7 学习进度管理

### 7.1 课程学习追踪

```yaml
# 学习管理.base
views:
  - name: "当前课程"
    filters:
      and:
        - file.hasTag("course")
        - status == "learning"
    properties:
      - course_name: "name"
      - instructor
      - completed_lessons
      - total_lessons
      - progress_bar: "formula"
      - estimated_completion: "formula"
      - difficulty_level

  - name: "学习计划"
    filters:
      and:
        - file.hasTag("learning")
        - planned_date >= today()
        - planned_date <= today() + "7d"
    properties:
      - topic: "name"
      - planned_date
      - estimated_duration
      - priority
      - prerequisites
      - learning_status: "formula"

  - name: "知识掌握度"
    filters:
      and:
        - file.hasTag("topic")
        - mastery_level > 0
    properties:
      - topic: "name"
      - mastery_level
      - last_reviewed
      - review_needed: "formula"
      - practice_count
      - confidence_score
```

### 7.2 学习管理公式

```javascript
// 学习进度条
progress_bar: total_lessons > 0 ? 
              "█".repeat((completed_lessons / total_lessons * 10).round()) + 
              "░".repeat(10 - (completed_lessons / total_lessons * 10).round()) + 
              " " + (completed_lessons / total_lessons * 100).round() + "%" : 
              "未开始"

// 预计完成时间
estimated_completion: lessons_per_week > 0 ? 
                      today() + ((total_lessons - completed_lessons) / lessons_per_week * 7) + "d" : 
                      "未知"

// 学习状态
learning_status: planned_date == today() ? "🔥 今日学习" : 
                 planned_date == today() + "1d" ? "📅 明日计划" : 
                 planned_date < today() ? "⏰ 已逾期" : "📋 未来计划"

// 复习提醒
review_needed: mastery_level < 8 && 
               (today() - last_reviewed).days() > 
               (mastery_level <= 5 ? 3 : mastery_level <= 7 ? 7 : 14) ? 
               "🔔 需要复习" : "✅ 掌握良好"

// 学习难度显示
difficulty_display: difficulty_level >= 8 ? "🔴 困难" : 
                     difficulty_level >= 6 ? "🟡 中等" : 
                     difficulty_level >= 4 ? "🟢 简单" : "⭐ 基础"
```

## 8 团队协作管理

### 8.1 团队项目视图

```yaml
# 团队协作.base
views:
  - name: "团队概览"
    filters:
      and:
        - file.hasTag("team-project")
        - status != "archived"
    properties:
      - project_name: "name"
      - team_members
      - project_lead
      - status
      - deadline
      - team_health: "formula"
      - completion_rate: "formula"

  - name: "个人任务"
    filters:
      and:
        - file.hasTag("task")
        - assignee.contains(this)
    properties:
      - task_name: "name"
      - project
      - priority
      - due_date
      - status
      - blocking_issues: "formula"

  - name: "团队负载"
    group_by: "assignee"
    filters:
      and:
        - file.hasTag("task")
        - status != "completed"
    properties:
      - assignee
      - active_tasks: "formula"
      - overdue_tasks: "formula"
      - workload_status: "formula"
```

### 8.2 团队协作公式

```javascript
// 团队健康度
team_health: completed_tasks > 0 && overdue_tasks == 0 ? "🟢 健康" : 
             overdue_tasks <= total_tasks * 0.1 ? "🟡 注意" : 
             "🔴 风险"

// 完成率
completion_rate: total_tasks > 0 ? 
                 (completed_tasks / total_tasks * 100).round() + "%" : "0%"

// 阻塞问题
blocking_issues: dependencies.filter(dep => dep.status != "completed").length > 0 ? 
                 "🚫 被阻塞" : "✅ 无阻塞"

// 工作负载状态
workload_status: active_tasks <= 3 ? "🟢 轻松" : 
                 active_tasks <= 6 ? "🟡 正常" : 
                 active_tasks <= 10 ? "🟠 繁忙" : "🔴 超负荷"

// 优先级排序
priority_sort: priority == "critical" ? 1 : 
               priority == "high" ? 2 : 
               priority == "medium" ? 3 : 
               priority == "low" ? 4 : 5
```

## 9 高级应用技巧

### 9.1 动态过滤器

```javascript
// 相对时间过滤
今日创建: file.ctime.date() == today()
本周修改: file.mtime >= today().startOf("week")
本月文件: file.ctime >= today().startOf("month")

// 条件组合
重要且紧急: priority >= 8 && deadline <= today() + "3d"
我的待办: assignee.contains(this) && status != "completed"
```

### 9.2 自定义显示

```javascript
// 状态图标
status_icon: status == "completed" ? "✅" : 
             status == "in-progress" ? "🔄" : 
             status == "blocked" ? "🚫" : 
             status == "pending" ? "⏳" : "❓"

// 截止日期警告
deadline_warning: deadline < today() ? "🔴 已逾期" : 
                  deadline <= today() + "1d" ? "🟡 今明到期" : 
                  deadline <= today() + "3d" ? "🟠 3天内到期" : ""

// 进度可视化
progress_visual: "▓".repeat((progress / 10).round()) + 
                 "░".repeat(10 - (progress / 10).round())
```

## 10 最佳实践总结

::: tip 💡 设计建议
- 从简单的用例开始，逐步增加复杂性
- 使用有意义的视图名称和属性名称
- 合理利用公式增强数据的可读性
- 定期回顾和优化 Base 结构
:::

::: danger 📝 维护提醒
- 保持属性命名的一致性
- 定期备份重要的 Base 配置
- 记录复杂公式的含义和用途
- 与团队成员分享最佳实践
:::

## 11 扩展学习

学完这些示例后，您可以：

- 结合其他插件创建更强大的工作流
- 探索更高级的公式和计算方法
- 构建适合您特定需求的管理系统
- 分享和交流您的创新应用


