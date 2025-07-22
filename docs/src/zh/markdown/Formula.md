---
# 这是文章的标题
title: 公式
# 这是侧边栏的顺序
order: 13
# 这是页面的图标
icon: page
---
数学公式这个东西，并不是所有的markdown编辑器都支持的很好，各家有各花，显示效果都不一致。这里只能介绍一下方法。在 Markdown 中输入数学公式需要 LaTeX 语法的支持，你的编辑器支不支持很简单。试一下就知道了。

公式的表达很复杂，我觉得完全没必要去学习这个语法，用现成的转换工具进行转换就可以了。
- 手机APP就有一些很不错的转换工具，收费和免费的都有[^app]。
- 电脑上推荐使用在线公式转换工具[^online]

**代码：**
::: code-tabs
@tab 示例1
```LaTeX
$$
\begin{pmatrix}
1&a_1&a_1^2&\cdots&a_1^n\\
1&a_2&a_2^2&\cdots&a_2^n\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
1&a_m&a_m^2&\cdots&a_m^n\\
\end{pmatrix}
$$
```
@tab 示例2
```LaTeX
$$
\begin{matrix}   
 x & y \\   
 z & v \\  
\end{matrix}
$$
```
:::


**演示：**  
示例1：
$$
\begin{pmatrix}
1&a_1&a_1^2&\cdots&a_1^n\\
1&a_2&a_2^2&\cdots&a_2^n\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
1&a_m&a_m^2&\cdots&a_m^n\\
\end{pmatrix}
$$
示例2：
$$
\begin{matrix}   
 x & y \\   
 z & v \\  
\end{matrix}
$$


**扩展阅读：**

---
**在线LaTeX公式编辑器**
- [codecogs.com](https://editor.codecogs.com/) 在线LaTeX公式编辑器
- [在线LaTeX公式编辑器-编辑器 (latexlive.com)](https://www.latexlive.com/) 在线LaTeX公式编辑器

**参考文档**
- [Supported Functions · KaTeX](https://katex.org/docs/supported.html) 语法在线查询
- [帮助:数学公式 - 维基百科，自由的百科全书 (wikipedia.org)](https://zh.wikipedia.org/wiki/Help:%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F)

[^app]:  notability 识别手写公式、
[^online]:  在线LaTeX公式编辑器  
[codecogs.com](https://editor.codecogs.com/) 在线LaTeX公式编辑器  
[在线LaTeX公式编辑器-编辑器 (latexlive.com)](https://www.latexlive.com/) 在线LaTeX公式编辑器

**补充在线编辑器**
✨ 2024-07-22 更新在线编辑器

以下是几个知名且功能丰富的在线 LaTeX 编辑器：

1. **LaTeX Live**: 提供了一个在线 LaTeX 公式编辑器，可以识别图片中的公式，并支持多种格式的导出，如 SVG、PNG、JPG 和 MathML 等。 https://www.latexlive.com/ 
    
2. **Overleaf**: 这是一个易于使用的在线 LaTeX 编辑平台。它提供了一个简洁且直观的界面来编写和编辑复杂的 LaTeX 文档。Overleaf 支持实时协作功能，并提供了数百个模板供用户选择。它可以导出为多种格式，包括 PDF、HTML 和 PowerPoint。 https://www.overleaf.com/
    
3. **ShareLaTeX**: ShareLaTeX 后被 Overleaf 吸收合并，其功能与 Overleaf 类似，提供了一个强大且易于使用的在线 LaTeX 编辑器，支持实时预览和多人协作编辑。 https://www.sharelatex.com/
    
4. **Authorea**：除了 LaTeX 文档外，Authorea 还支持 Markdown、HTML 和多种科学计算格式。适合撰写科学论文、数据报告等文档，并支持在线协作。 https://www.authorea.com/

    
5. **MikTeX Online Editor**：这是一个网页版的 TeX 环境，不仅可以编辑 LaTeX 代码，而且可以直接运行 TeX 命令生成 PDF 输出。 https://miktex.org/
    
6. **Jupyter Notebook**: 虽然 Jupyter 不是专门用于 LaTeX 的编辑器，但它支持 LaTeX 格式输出，并且结合 Markdown 和 Python、R 或 Julia 等编程语言进行数据分析和报告撰写非常高效。 https://jupyter.org/

这些在线工具主要帮助用户在不需要安装任何本地软件的情况下编写数学公式、科学文档和其他需要 LaTeX 格式的文本内容。每个平台都有自己的特性和优点.

---

## LaTeX 公式语法详解

以下是 Obsidian 中 LaTeX 公式语法的详细介绍，帮助您掌握各种数学公式的编写方法。

## 1. 基础语法

### 行内公式

使用单个 `$` 符号包围公式，可以在文本中插入行内公式。

```markdown
这是一个行内公式：$E = mc^2$
```

**效果：** 这是一个行内公式：$E = mc^2$

### 块级公式

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

## 2. 基本运算符

### 四则运算

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

### 比较运算符

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

## 3. 分数与根式

### 分数

```latex
简单分数：\frac{分子}{分母}
复杂分数：\frac{a+b}{c+d}
连分数：\cfrac{1}{1+\cfrac{1}{2+\cfrac{1}{3}}}
```

**示例：**
- $\frac{1}{2}$
- $\frac{a+b}{c+d}$
- $\cfrac{1}{1+\cfrac{1}{2+\cfrac{1}{3}}}$

### 根式

```latex
平方根：\sqrt{x}
n次根：\sqrt[n]{x}
```

**示例：**
- $\sqrt{x}$
- $\sqrt[3]{8}$
- $\sqrt[n]{x}$

## 4. 上标与下标

### 基本语法

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

### 复杂示例

```latex
指数：e^{i\pi} + 1 = 0
对数：\log_2 8 = 3
极限：\lim_{x \to \infty} \frac{1}{x} = 0
```

**示例：**
- $e^{i\pi} + 1 = 0$
- $\log_2 8 = 3$
- $\lim_{x \to \infty} \frac{1}{x} = 0$

## 5. 求和与积分

### 求和符号

```latex
简单求和：\sum x_i
带范围：\sum_{i=1}^{n} x_i
双重求和：\sum_{i=1}^{m} \sum_{j=1}^{n} a_{ij}
```

**示例：**
- $\sum x_i$
- $\sum_{i=1}^{n} x_i$
- $\sum_{i=1}^{m} \sum_{j=1}^{n} a_{ij}$

### 积分符号

```latex
不定积分：\int f(x) dx
定积分：\int_a^b f(x) dx
多重积分：\iint_D f(x,y) dxdy
```

**示例：**
- $\int f(x) dx$
- $\int_a^b f(x) dx$
- $\iint_D f(x,y) dxdy$

## 6. 矩阵与向量

### 矩阵

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

### 行列式

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

## 7. 特殊符号

### 希腊字母

```latex
小写：\alpha, \beta, \gamma, \delta, \epsilon, \pi, \sigma, \theta
大写：\Alpha, \Beta, \Gamma, \Delta, \Pi, \Sigma, \Theta
```

**示例：**
- 小写：$\alpha, \beta, \gamma, \delta, \epsilon, \pi, \sigma, \theta$
- 大写：$\Alpha, \Beta, \Gamma, \Delta, \Pi, \Sigma, \Theta$

### 数学符号

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

## 8. 方程组与对齐

### 方程组

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

### 对齐公式

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

## 9. 常用公式示例

### 物理公式

```latex
牛顿第二定律：F = ma
能量守恒：E = mc^2
薛定谔方程：i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi
```

**示例：**
- 牛顿第二定律：$F = ma$
- 能量守恒：$E = mc^2$
- 薛定谔方程：$i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi$

### 数学公式

```latex
二次公式：x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
欧拉公式：e^{i\theta} = \cos\theta + i\sin\theta
泰勒展开：f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n
```

**示例：**
- 二次公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
- 欧拉公式：$e^{i\theta} = \cos\theta + i\sin\theta$
- 泰勒展开：$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$

## 公式编写实用技巧

> [!tip] 💡 公式编写技巧
> - 使用在线 LaTeX 编辑器预览复杂公式
> - 善用括号确保运算优先级正确
> - 对于复杂公式，先写简单部分再逐步完善
> - 使用 `\text{}` 在公式中插入普通文本

> [!note] 📝 常见问题
> - 大括号需要转义：`\{` 和 `\}`
> - 百分号需要转义：`\%`
> - 下划线在公式外需要转义：`\_`

> [!example] 🎯 练习建议
> 尝试复现您学科中的经典公式，这是最好的练习方法！

::: tip 欢迎投稿
公式这玩意用的不多，欢迎熟悉的同学投稿用法和纠错，评论区留言或者联系站长@咖啡豆
:::