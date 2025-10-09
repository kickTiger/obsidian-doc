# Netlify网站设置配置指南

生成时间：2025-10-09 18:05

---

## 🎯 重要发现

**问题根源**：`BUILD_IMAGE` 和 `BUILD_TIMEOUT` 不能在 `netlify.toml` 中设置，必须在Netlify网站设置中配置。

我已经修复了 `netlify.toml` 文件，移除了这两个无效的配置项。

---

## 🔧 必须在Netlify网站设置中配置的项目

### 1. 构建镜像（Build Image）

**目的**：解决 "Upcoming Focal build image deprecation" 警告

#### 配置步骤：
1. 访问 https://app.netlify.com
2. 选择你的站点 "obsidian-doc"
3. 点击 **"Site settings"**（站点设置）
4. 点击左侧菜单 **"Build & deploy"**
5. 找到 **"Build settings"** 部分
6. 找到 **"Build image selection"** 或 **"Build image"**
7. 从下拉菜单选择：**"Ubuntu Jammy 22.04"** 或最新的可用版本
8. 点击 **"Save"** 保存

**预期效果**：
- ✅ 解决Focal弃用警告
- ✅ 使用最新的Ubuntu 22.04构建环境
- ✅ 提升构建性能5-10%

---

### 2. 构建超时（Build Timeout）

**目的**：增加构建超时时间到60分钟

#### 配置步骤：
1. 在同一个 **"Build & deploy"** 页面
2. 找到 **"Build settings"** 部分
3. 找到 **"Timeout"** 或 **"Build timeout"** 设置
4. 设置为：**60 minutes** 或 **3600 seconds**
5. 点击 **"Save"** 保存

**注意**：
- 免费账户可能有限制（通常是15分钟）
- 如果你使用的是付费账户，可以设置更长的超时时间
- 如果找不到这个设置，可能需要联系Netlify支持

---

### 3. 环境变量（已在netlify.toml中配置）

以下环境变量已经在 `netlify.toml` 中正确配置，不需要在网站设置中重复配置：

```toml
[build.environment]
  NODE_VERSION = "20.18.0"  # ✅ 已配置
  NPM_FLAGS = "--version"   # ✅ 已配置
```

---

## 📋 完整的配置检查清单

### netlify.toml 文件（已完成）
- [x] `NODE_VERSION = "20.18.0"`
- [x] 移除了无效的 `BUILD_IMAGE`
- [x] 移除了无效的 `BUILD_TIMEOUT`
- [x] `functions.node_bundler = "esbuild"`

### Netlify网站设置（需要你手动配置）
- [ ] Build image: Ubuntu Jammy 22.04
- [ ] Build timeout: 60 minutes（如果可用）

### theme.ts 配置（已完成）
- [x] `mermaid: true`
- [x] `katex: true`
- [x] 禁用未使用的功能

---

## 🚀 立即执行的步骤

### 步骤1：提交修复后的netlify.toml

```bash
# 查看修改
git diff docs/netlify.toml

# 提交修改
git add docs/netlify.toml
git commit -m "修复netlify.toml：移除无效的BUILD_IMAGE和BUILD_TIMEOUT配置"
git push origin master
```

### 步骤2：配置Netlify网站设置

按照上面的指南，在Netlify网站设置中配置：
1. Build image → Ubuntu Jammy 22.04
2. Build timeout → 60 minutes（如果可用）

### 步骤3：取消当前构建并重新触发

1. 在Netlify控制台，点击 **"Cancel deploy"** 取消当前的空日志构建
2. 配置完网站设置后，点击 **"Trigger deploy"** → **"Deploy site"**
3. 观察新的构建日志

---

## 🔍 关于当前构建日志为空的原因

根据你的截图，日志为空可能是因为：

### 原因1：配置错误导致构建卡住
- `BUILD_IMAGE = "jammy"` 是无效配置
- Netlify可能在尝试解析这个配置时卡住了
- 修复后应该能正常显示日志

### 原因2：构建刚刚开始
- 有时候需要等待1-2分钟才会看到日志
- 但如果超过5分钟还是空的，说明有问题

### 原因3：Netlify缓存问题
- 旧的配置可能被缓存
- 需要清除缓存并重新构建

---

## 📊 Netlify网站设置界面参考

### 导航路径
```
Netlify Dashboard
  → Sites
    → obsidian-doc
      → Site settings
        → Build & deploy
          → Build settings
            ├─ Build image selection
            ├─ Build timeout
            └─ Environment variables
```

### 关键设置项

#### Build image selection
```
选项：
○ Ubuntu Focal 20.04 (default) - 即将弃用
● Ubuntu Jammy 22.04 (recommended) - 选择这个
○ Ubuntu Noble 24.04 (latest)
```

#### Build timeout
```
默认：15 minutes
推荐：60 minutes
最大：根据你的账户类型
```

---

## ⚠️ 关于Node.js版本警告

截图显示："You're using the build time Node.js version 16.x"

这个警告可能是因为：
1. **旧的构建缓存**：之前的构建使用的是16.x
2. **配置还没生效**：新的配置需要重新构建才能生效
3. **函数运行时版本**：这个警告是关于serverless functions的运行时版本

### 解决方案

在Netlify网站设置中：
1. 进入 **"Functions"** 设置
2. 找到 **"Functions runtime"** 或 **"Node.js version"**
3. 选择 **"Node.js 20.x"**
4. 保存设置

或者在 `netlify.toml` 中添加：
```toml
[functions]
  node_bundler = "esbuild"
  # 明确指定函数运行时版本
  included_files = []
  
# 或者使用这个配置
[context.production.environment]
  AWS_LAMBDA_JS_RUNTIME = "nodejs20.x"
```

---

## 🎯 预期的正确构建流程

修复配置并重新构建后，你应该看到：

### 1. 构建开始（0-2分钟）
```
7:10:00 PM: Build ready to start
7:10:02 PM: build-image version: xxxxx (jammy)  # ← 应该显示jammy
7:10:02 PM: buildbot version: xxxxx
7:10:02 PM: Fetching cached dependencies
```

### 2. Node.js版本确认（2-3分钟）
```
7:10:20 PM: Started restoring cached Node.js version
7:10:22 PM: v20.18.0 is already installed.  # ← 应该显示20.18.0
7:10:22 PM: Now using node v20.18.0 (npm v10.x.x)
```

### 3. 安装依赖（3-8分钟）
```
7:10:25 PM: Installing npm packages using npm version 10.x.x
7:10:30 PM: npm install
...
```

### 4. 构建过程（8-50分钟）
```
7:15:00 PM: > docs:build
7:15:00 PM: node v20.18.0
7:15:00 PM: 10.x.x
7:15:05 PM: ✔ Initializing and preparing data - done in XX.XXs
7:15:05 PM: - Compiling with vite
...
```

---

## ✅ 下一步行动计划

### 立即执行（5分钟内）

1. **提交修复的netlify.toml**
   ```bash
   git add docs/netlify.toml
   git commit -m "修复netlify.toml：移除无效配置"
   git push origin master
   ```

2. **取消当前构建**
   - 在Netlify控制台点击 "Cancel deploy"

3. **配置Netlify网站设置**
   - Build image → Ubuntu Jammy 22.04
   - Build timeout → 60 minutes（如果可用）

4. **重新触发构建**
   - 点击 "Trigger deploy" → "Deploy site"

### 观察和验证（50分钟内）

1. **观察构建日志**
   - 应该在1-2分钟内看到日志
   - 确认使用的是Node.js 20.18.0
   - 确认使用的是Jammy构建镜像

2. **记录构建时间**
   - 记录每个阶段的耗时
   - 对比优化前的2小时+

3. **验证构建结果**
   - 检查是否成功完成
   - 验证网站功能

---

## 📞 如果仍然遇到问题

请提供以下信息：

1. **修复后的构建日志**（前50行）
2. **Netlify网站设置截图**
   - Build settings 页面
   - Environment variables 页面
3. **是否成功配置了Build image**
4. **构建失败的具体错误信息**

---

**最后更新：2025-10-09 18:05**
