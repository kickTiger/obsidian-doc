---
title: Kopia详细配置Win和mac
order: 13
icon: page
headerDepth: 2
---
>这篇文章是为了解决很多群友在配置Kopia的疑问，因为以前的文章时间有点久，一般都是在群里直接回答的问题。为了方便没有进群的同学，特地更新此篇，更推荐直接进群，得到更及时的解答。

基础的信息请查看原始的Kopia文章，两个结合起来看，[obsidian备份方案](/zh/documentation/ob备份方案.md#_3-快照备份-kopiaul-推荐) 

## 1 安装完毕，默认界面

点击 `Local Directory or NAS` 创建本地路径

![](/assets/2024022213010432.png)

会提示需要你填写**本地仓库路径**

- enter directory path where you want to store repository files
- 输入存储库文件的目录路径

注意：这里是要你自己去创建一个文件夹，然后输入文件夹路径即可


![](/assets/2024022213010633.png)

## 2 创建仓库/store repository files

任意找个文件夹创建仓库（路径一定不要包含中文和空格特殊符号等），创建一个容易识别的文件夹，比如`Kopia_repository`

1. 路径一定不要包含中文和空格特殊符号等，建议之用英文和短横线，其他都不要
2. 文件夹一定不要直接创建在网盘里(iCloud、OneDrive等等），避免错误。
3. 其他的网络地址先不要去折腾。（进阶再说）

## 3 输入仓库地址

1. 输入完整的仓库路径`C:\Users\coffee\Desktop\Kopia_repository`
2. 点击**Next/下一步**

![](/assets/2024022213010740.png)
## 4 输入仓库密码

然后会要求你输入仓库的密码，和确认一次密码，然后点击 `created`创建就创建成功了

> [!attention]
> 仓库密码一定要保存好，在某些时候会需要，很重要！

![](/assets/2024022213010806.png)

## 5 成功后的界面和创建新的快照

创建仓库成功后，界面如下，我们开始创建新的快照

1. 快照是针对每一个需要备份的文件夹，点击 ① `New Snapshot` 新快照

![](/assets/2024022213010832.png)

2. 然后点击下图中的①📂，选择需要备份的文件夹，选择好之后，点击后面的 ②`Snapshot Now`

![](/assets/2024022213010843.png)

