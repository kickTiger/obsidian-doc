---
# 这是文章的标题
title: 公式
# 这是侧边栏的顺序
order: 13
# 这是页面的图标
icon: page
---

## 1 公式简介

::: warning 📝 更新日志
- 2025-07-23 更新，全新的公式语法演示，增加了大量的公式示例，方便大家使用。优化了排版。
:::


数学公式在 Markdown 中需要使用 LaTeX 语法，不同的编辑器支持程度可能不同。在 Obsidian 中输入数学公式需要 LaTeX 语法的支持，测试方法很简单，试一下就知道是否支持。

::: tip 实用建议
公式语法很复杂，完全没必要去学习这个语法，用现成的转换工具进行转换就可以了。
- 手机APP就有一些很不错的转换工具，收费和免费的都有，比如：[Mathpix Snip](https://mathpix.com/)
- 电脑上推荐使用在线公式转换工具，比如：[LaTeX Live](https://www.latexlive.com/)
:::

## 2 基础语法

### 2.1 行内公式

使用单个 `$` 符号包围公式，可以在文本中插入行内公式。

```markdown
这是一个行内公式：$E = mc^2$
```

**效果：** 这是一个行内公式：$E = mc^2$

### 2.2 块级公式

使用双 `$$` 符号包围公式，创建独立的公式块。

```markdown
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$
```

**效果：**
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

## 3 基本运算符

### 3.1 四则运算

```latex
加法：a + b
减法：a - b
乘法：a \times b 或 a \cdot b
除法：a \div b 或 \frac{a}{b}
```

**示例：**
- $a + b$
- $a - b$
- $a \times b$ 或 $a \cdot b$
- $a \div b$ 或 $\frac{a}{b}$

### 3.2 比较运算符

```latex
等于：a = b
不等于：a \neq b
大于：a > b
小于：a < b
大于等于：a \geq b
小于等于：a \leq b
约等于：a \approx b
```

**示例：**
- $a = b$
- $a \neq b$
- $a > b$, $a < b$
- $a \geq b$, $a \leq b$
- $a \approx b$

## 4 分数与根式

### 4.1 分数

```latex
简单分数：\frac{分子}{分母}
复杂分数：\frac{a+b}{c+d}
连分数：\cfrac{1}{1+\cfrac{1}{2+\cfrac{1}{3}}}
```

**示例：**
- $\frac{1}{2}$
- $\frac{a+b}{c+d}$
- $\cfrac{1}{1+\cfrac{1}{2+\cfrac{1}{3}}}$

### 4.2 根式

```latex
平方根：\sqrt{x}
n次根：\sqrt[n]{x}
```

**示例：**
- $\sqrt{x}$
- $\sqrt[3]{8}$
- $\sqrt[n]{x}$

## 5 上标与下标

### 5.1 基本语法

```latex
上标：x^2
下标：x_1
上下标：x_1^2
多字符：x_{10}^{20}
```

**示例：**
- $x^2$
- $x_1$
- $x_1^2$
- $x_{10}^{20}$

### 5.2 复杂示例

```latex
指数：e^{i\pi} + 1 = 0
对数：\log_2 8 = 3
极限：\lim_{x \to \infty} \frac{1}{x} = 0
```

**示例：**
- $e^{i\pi} + 1 = 0$
- $\log_2 8 = 3$
- $\lim_{x \to \infty} \frac{1}{x} = 0$

## 6 求和与积分

### 6.1 求和符号

```latex
简单求和：\sum x_i
带范围：\sum_{i=1}^{n} x_i
双重求和：\sum_{i=1}^{m} \sum_{j=1}^{n} a_{ij}
```

**示例：**
- $\sum x_i$
- $\sum_{i=1}^{n} x_i$
- $\sum_{i=1}^{m} \sum_{j=1}^{n} a_{ij}$

### 6.2 积分符号

```latex
不定积分：\int f(x) dx
定积分：\int_a^b f(x) dx
多重积分：\iint_D f(x,y) dxdy
```

**示例：**
- $\int f(x) dx$
- $\int_a^b f(x) dx$
- $\iint_D f(x,y) dxdy$

## 7 矩阵与向量

### 7.1 矩阵

```latex
基本矩阵：
\begin{matrix}
a & b \\
c & d
\end{matrix}

带括号的矩阵：
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}

带方括号的矩阵：
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
```

**示例：**

基本矩阵：
$$
\begin{matrix}
a & b \\
c & d
\end{matrix}
$$

带括号的矩阵：
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$

带方括号的矩阵：
$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

### 7.2 行列式

```latex
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix} = ad - bc
```

**示例：**
$$
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix} = ad - bc
$$

## 8 特殊符号

### 8.1 希腊字母

```latex
小写：\alpha, \beta, \gamma, \delta, \epsilon, \pi, \sigma, \theta
大写：\Alpha, \Beta, \Gamma, \Delta, \Pi, \Sigma, \Theta
```

**示例：**
- 小写：$\alpha, \beta, \gamma, \delta, \epsilon, \pi, \sigma, \theta$
- 大写：$\Alpha, \Beta, \Gamma, \Delta, \Pi, \Sigma, \Theta$

### 8.2 数学符号

```latex
无穷大：\infty
偏导数：\partial
梯度：\nabla
属于：\in
不属于：\notin
子集：\subset
交集：\cap
并集：\cup
```

**示例：**
- $\infty, \partial, \nabla$
- $\in, \notin, \subset$
- $\cap, \cup$

## 9 方程组与对齐

### 9.1 方程组

```latex
\begin{cases}
x + y = 5 \\
x - y = 1
\end{cases}
```

**示例：**
$$
\begin{cases}
x + y = 5 \\
x - y = 1
\end{cases}
$$

### 9.2 对齐公式

```latex
\begin{align}
f(x) &= x^2 + 2x + 1 \\
&= (x + 1)^2
\end{align}
```

**示例：**
$$
\begin{align}
f(x) &= x^2 + 2x + 1 \\
&= (x + 1)^2
\end{align}
$$

## 10 常用公式示例

### 10.1 物理公式

```latex
牛顿第二定律：F = ma
能量守恒：E = mc^2
薛定谔方程：i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi
```

**示例：**
- 牛顿第二定律：$F = ma$
- 能量守恒：$E = mc^2$
- 薛定谔方程：$i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi$

### 10.2 数学公式

```latex
二次公式：x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
欧拉公式：e^{i\theta} = \cos\theta + i\sin\theta
泰勒展开：f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n
```

**示例：**
- 二次公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
- 欧拉公式：$e^{i\theta} = \cos\theta + i\sin\theta$
- 泰勒展开：$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$

## 11 实用工具

### 11.1 在线LaTeX公式编辑器

以下是一些知名且功能丰富的在线 LaTeX 编辑器：

1. **[LaTeX Live](https://www.latexlive.com/)** - 在线 LaTeX 公式编辑器，可以识别图片中的公式，支持多种格式导出
2. **[Overleaf](https://www.overleaf.com/)** - 易于使用的在线 LaTeX 编辑平台，支持实时协作
3. **[CodeCogs](https://editor.codecogs.com/)** - 简单易用的在线公式编辑器
4. **[Jupyter Notebook](https://jupyter.org/)** - 支持 LaTeX 格式输出，适合数据分析和报告撰写

### 11.2 参考文档

- [Supported Functions · KaTeX](https://katex.org/docs/supported.html) - 语法在线查询
- [帮助:数学公式 - 维基百科](https://zh.wikipedia.org/wiki/Help:%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F)

## 12 实用技巧

::: tip 💡 公式编写技巧
- 使用在线 LaTeX 编辑器预览复杂公式
- 善用括号确保运算优先级正确
- 对于复杂公式，先写简单部分再逐步完善
- 使用 `\text{}` 在公式中插入普通文本
:::

::: warning 📝 常见问题
- 大括号需要转义：`\{` 和 `\}`
- 百分号需要转义：`\%`
- 下划线在公式外需要转义：`\_`
:::

::: warning 🎯 练习建议
尝试复现您学科中的经典公式，这是最好的练习方法！
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

::: tip 欢迎投稿
公式这玩意用的不多，欢迎熟悉的同学投稿用法和纠错，评论区留言或者联系站长@咖啡豆
:::