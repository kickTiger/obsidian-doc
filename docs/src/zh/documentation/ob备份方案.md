---
# 这是文章的标题
title: 备份方案
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 3
---
# 备份的必要性
obsidian作为一个本地优先的软件，带来了便利，也带来了风险。当本地环境出现问题，会发生丢失文件，或者文件损坏的情况。当然也存在小概率硬件灭失的风险。

数据是无价的，而作为笔记/日记存在的obsidian文件更加的珍贵。我们需要使用比较稳妥的方法做好文件的备份。

::: danger 一定要做备份
重要的事说三遍，一定要做备份！  
重要的事说三遍，一定要做备份！  
重要的事说三遍，一定要做备份！  
重要的事说三遍，一定要做备份！  
:::

## 备份方案
```mermaid
  flowchart TB
      A("备份方案") -->|"单机"| B["1 单机备份<br>GoodSync"]
      A -->|"异地"| C("2 多机备份<br>syncthing")
      A -->|"本地"| D("3 快照备份<br>KopiaUl")
      A -->|"本地"| E("4 版本管理<br>GitHub")
      A -->|"网盘"| F("5 各大网盘<br>OneDrive")
	  
```

不要被这些名词吓唬住了，其实就是些简单的软件。按要求配置好就可以了，下面手把手介绍一下使用方法。
::: info
当然可能不止这些方案，如果你有好的方案可以投稿或者留言
:::

## 1 单机备份 GoodSync
GoodSync是一款易于使用的工具，可跨多个目的地和平台进行自动数据备份和同步。它适用于所有设备和操作系统，包括服务器、NAS和移动的设备。
::: tip
老牌的同步软件，功能很多，稳定可靠，可设置自动运行。定价30美金/年，就知道他有多好用。

他可以单机同步，也可以和其他电脑同步，也可以和服务器，NAS，网盘、WEBDAV同步
:::
**1/3 下载并安装**  
首先你找一个 **能用** 的版本下载，当然我知道你肯定有办法的。绿色版或者安装版，默认安装好即可。

**2/3 设置同步任务**  
1. 打开 GoodSync ，在顶部菜单 ➕ 新建任务，点开后添加任务
2. 输入任务名称，然后选择“单向任务”，或者“双向任务”。一般我们选择“单向任务”，做个备份就够了。
	1. 单向任务，就是只从一个文件夹覆盖另一个。
	2. 双向任务，就是两个文件夹，有更改都会覆盖另一边，保持一致。
3. 选择左右文件夹，在GoodSync右侧，顶部请“点击这里选择文件夹” 📁，选择文件夹，一般左侧备份到右侧，注意方向不要错了。选好了点击“应用”✔️

**3/3 设置自动同步**
1. 点击右侧添加的任务，在右侧顶部有个时钟🕑的图标“自动”。
2. 设置自动运行的策略，按需设置：
	1. 文件更改时，自动运行。(一般单向同步这个不选，有点时间差好)🚫
	2. GoodSync起动时，延迟自动运行同步任务✅
	3. 定期，每1小时(或其他)自动运行。✅ 

::: warning 冲突的解决
冲突在所难免，如果发生了冲突。
- 可以看看两边的时间和文件大小。
- 选择从左到右还是从右到左的覆盖。注意方向不要错了。

也可以使用文件内容对比软件，对两个文件对比后选择留下哪一个。推荐对比神器 **BCompare**
:::

## 2 多机备份 Syncthing
这是一款新型的备份软件，也可以说是同步软件。现在比较流行，支持多个平台，Windows、macOS、Linux。

Syncthing 是基于web界面管理的，也有UI界面。不过web界面也很好用，支持单向和双向同步备份。

::: tip 推荐
他免费开源，稳定可靠。如果家中有多台设备，可以用 Syncthing 做同步备份，比较安全保险，非常推荐。
:::

### 1/3 下载安装
> GitHub：https://github.com/syncthing/syncthing

::: tip 找对应系统安装包
Windows的选择 syncthing-windows-amd64，其他系统一般下载 amd64 的安装包即可
:::

::: warning 支持 docker 部署
Syncthing 支持 docker 部署，如果有 docker 环境的话，推荐docker部署。
:::

### 2/3 启动软件
- Windows打开压缩包里面的 `exe` 文件，可自行添加到开机启动项。
- macOS打开压缩包里的 `终端` 文件。
- Linux 系统需要使用 `apt` 安装，并加入系统启动项。具体方法见下面 

然后就启动服务器，会弹出对应的网址，在这个web界面里进行配置和操作。

### 3/3 配置同步
- 首先设置用户名和密码，打开 web 界面，提示创建用户名和密码。是为了机器识别和安全，需要设置。
- 在下面选择文件夹， `共享`就是发布出去，`接受`就是同步对方共享的文件。就是同步软件的同步的概念。

更细致的配置，可以看配置选项还有[官方文档]( https://docs.syncthing.net/intro/getting-started.html)

### 补充:Ubuntu安装启动syncthing
**1/2 安装**
```bash
# 1.添加PGP 密钥，验证软件发行 
sudo curl -o /usr/share/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg

# 2.添加稳定版更新源到本地apt
echo "deb [signed-by=/usr/share/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list

# 3.安装软件
sudo apt-get update
sudo apt-get install syncthing
```
**2/2 添加开机启动**  
使用 `systemctl` 命令手动启用它，然后使用 `127.0.0.1:8384` 访问 Syncthing Web UI 
```bash
# 1.替换`username`使用您的**实际用户名**
sudo systemctl enable syncthing@username.service

# 2.启动，替换`username`使用您的**实际用户名**
sudo systemctl start syncthing@username.service
```

## 3 快照备份 KopiaUl (推荐)
强烈推荐的一款开源免费软件，用来做快照镜像备份，就是把指定文件夹备份多个版本。这个比其他软件优势在于有完整的多个版本，让你有后悔药吃。 

>Windows、macOS 和 Linux 的跨平台备份工具，具有快速增量备份、客户端端到端加密、压缩和重复数据删除功能

### 1/2 下载和安装
打开官网 [kopia(github.com)](https://github.com/kopia/kopia) 下载对应的版本。

::: warning 自定义标题
Windows 下载 KopiaUI-Setup.exe 才会有安装界面
:::

### 2/2 配置
1. **新建仓库**，安装后会让你选择一个仓库文件夹 Repository，保存好仓库的密码
2. **新建快照**，打开菜单 Snapshots|快照，在 `My Repository|我的资料库` 下，选择 `New Snapshot|新的快照`， 新建一个备份快照。
3. **设置备份文件**，选择**要备份**的文件夹路径，Enter path to snapshot
4. **设置备份频率**，点击`Scheduling|安排时间表`，设定自动备份的频率，我设定的`every 3 hours`每3个小时一次。

::: danger 记录好仓库地址和密码
第1步的`仓库地址和密码`，请记录好。以后可能会用到！
:::

::: tip 自定义标题
这样 KopiaUl 每3个小时，会自动保存一份你的 obsidian 整个库文件，比较保险。

KopiaUl 已经帮助我恢复了几次出错的文件和配置文件了。推荐 ⭐️⭐️⭐️⭐️⭐️
:::

## 4 基于Git 的版本管理
Git 是程序开发使用的版本管理软件，他可以备份你所提交的各个版本文件。可以创建分支、合并分支。现在我们简单地使用他的版本管理。

::: tip Git不是GitHub 
Git 是版本管理，GitHub是个网站是云端的Git，我们暂时不提交GitHub，有需要的其他文章介绍同步方法
:::

### 1/3 下载安装Git
a. 安装
以 Windows 为例，从 [Git官网](https://git-scm.com/) 下载对应版本，默认安装。

::: danger
安装路径不要有中文名
:::
b. 查看 Git 是否安装成功
-   任意文件下点击右键，出现 `Git GUI here` 和 `Git Bash here`，说明安装好了。
-   在命令行下输入命令 `git --version` 返回版本号就是安装好了

```bash
git --version
```
c. 配置 Git 用户名和邮箱【必须】
打开命令行，依次输入下面两条命令：**注意**替换 `username` 和 `email` 为你自己的用户名和邮件

```bash
git config --global user.name "username"
git config --global user.email "email"
```
::: warning 自定义标题
**注意**替换 `username` 和 `email` 为你自己的用户名和邮件
:::

### 2/3 初始化Git项目
打开需要备份的文件夹，点击右键，出现 `Git Bash here`，打开命令行，输入命令初始化项目。
```bash
git init
```

### 3/3 使用git备份
**a.使用UI界面管理Git（推荐）**
打开需要备份的文件夹，点击右键，出现 `Git GUI here`，打开Git GUI。
- **查看变更**：左上区域“`Unstaged Changes`” 未存储变更，这里显示此次有改动的文件列表，在右侧对应窗口“`Modified, not staged`”显示具体变动的内容。
- **提交更改**：右下角 `按钮 Commit `，是提交到暂存区，在 `Commit Message`输入框输入此次提交的描述。点击按钮就提交了更改了。
- **查看主分支的历史变更记录**：在顶部菜单“`Repository`”→ “`Visualize master's History`”`可视化主分支的历史`，可以查看**主分支的历史变更记录**

**b.使用命令行管理Git**  
需要使用一些命令来实现上面的操作。暂时不写了，避免误操作。结果都是一样的

## 5 使用网盘备份

::: tip
过于简单，懒得写了！

推荐 OneDrive 备份，免费速度快，手机 obsidian 也可以使用。
:::

::: danger 建议收藏用时查询
不用全记住，建议收藏[咖啡豆文档](https://coffeetea.top)，有需要的时候回来查询
:::
## 交个朋友
::: danger 交个朋友
如果在使用和学习中有不明白的地方，或者想看看别人的经验
- 可以查看[进阶用法](/zh/advanced)
- 可以加群和大家聊聊，加微信 `coffeebean1688` 蹦跶的咖啡豆，然后进群
- 可以查看B站视频、YouTube了解（筹备）
- 示例库（筹备中）
:::
