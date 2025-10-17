---
title: Mizuki博客搭建教程~
published: 2025-10-14
description: Mizuki博客搭建的教程，详情参照官方文档：https://docs.mizuki.mysqil.com
tags: [教程, 通知]
image: "./cover.png"
category: 教程
draft: false
---

# 1.主题介绍

![图片](https://docs.mizuki.mysqil.com/image.png)

**欢迎使用Mizuki主题👏!**

Astro-theme-Mizuki 是一个基于`Astro`的现代化静态博客模板，具有丰富的功能和美观的设计，无论您是想写 **生活类博客**、**技术类博客**、 或者是 **知识库、系列文档** 等，主题都可以满足您的需求。

如果能给我一个star那将是对我莫大的鼓励。使用这个主题之前，你应该明白它是一个Astro主题，它的基本逻辑离不开Astro，关于如何新建分类，如何新建标签这些问题应该在使用之前就从互联网或官方文档了解详情🔎。

主题 GitHub: https://github.com/matsuzaka-yuki/Mizuki

::github{repo="matsuzaka-yuki/Mizuki"}

QQ群1007524064 (主题交流群)
Discord频道(面向全世界的Mizuki用户): https://discord.gg/MqW6TcQtVM



# 1.1安装/使用

Mizuki 项目入门指南由哈雷0V0制作。

::github{repo="halei0v0/halei0v0.github.io"}

> [!NOTE]
>
> 本教程目前只讲解Mizuki的Github Pages部署和一些基本的设置和Markdwn语法教程。



## 环境依赖

在开始使用 Mizuki 之前，您需要确保系统满足以下要求：

- **Node.js >= 20**
- **pnpm >= 9**
- **Github Desktop**

### 安装 Node.js

访问 [Node.js 官网](https://nodejs.org/) 下载并安装最新版本的 Node.js。建议使用 LTS 版本。

安装完成后，打开终端或命令提示符，运行以下命令验证 Node.js 是否安装成功：



```bash
node -v
npm -v
```

如果显示版本号，则表示安装成功。

### 安装 pnpm

如果您尚未安装 pnpm，可以通过 npm 安装：



```bash
npm install -g pnpm
```

安装完成后，打开终端或命令提示符，运行以下命令验证 pnpm 是否安装成功：



```bash
pnpm -v
```

如果显示版本号，则表示安装成功。

### 安装 Github Desktop

访问 Github官网下载并安装适合您操作系统的软件版本。

安装完成后，打开软件登录长好即可。

## 项目启动步骤

### 1. 克隆项目

首先，克隆 Mizuki 项目到本地：

运行Github Desktop点击克隆选项，选择你新建的`Mizuki`项目。



### 2. 安装依赖

使用 pnpm 安装项目依赖：

```bash
pnpm install
```

### 3. 配置博客

在启动项目之前，您需要根据自己的需求进行配置：

- 编辑 `src/config.ts` 文件来自定义博客设置
- 更新站点信息、主题颜色、横幅图片和社交链接
- 配置翻译设置和特殊页面功能

### 4. 启动开发服务器

运行以下命令启动开发服务器：

```bash
pnpm dev
```

启动成功后，您可以在浏览器中访问 `http://localhost:4321` 查看您的博客。

# 1.2部署

## 部署到 GitHub Pages

如果您希望将博客托管在 GitHub Pages 上，Mizuki 项目通常会包含一个 GitHub Actions 工作流，可以帮助您自动化部署过程。您需要确保在 `astro.config.mjs` 中配置正确的 `base` 路径。

### 部署到 github.io 网址

在 `astro.config.mjs` 中配置文件设置 `site` 和 `base` 选项。

```
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/',
})
```

> [!NOTE]
> 这里演示的是部署到仓库名为`<username>.github.io`！
>
> （如果出现了以下情况，则不要设置 base 参数：
>
> 你的页面是由根文件夹所提供。
> 你的源码存储库是位于 https://github.com/<USERNAME>/<USERNAME>.github.io）
>
> 如果你要更改仓库名请将`base:'/'`更改为`base:'仓库名'`。当配置了这个值后，你所有的内部页面链接都必须以你的 base 值作为前缀：
>
> ```
> <a href="/my-repo/about">关于本站</a>
> ```

**Site**

`site` 的值必须是以下之一：

- 基于你的用户名的以下网址: `https://<username>.github.io`
- 为 GitHub 组织的私有页面 自动生成的随机网址：`https://<random-string>.pages.github.io/`



**Base**【非<username>.github.io】

* `base`的值请更改为项目名

* 运行项目

* ```
  pnpm dev
  ```

* > [!NOTE]
  >
  > 这里项目运行会有报错，请通过VS Code搜索项目中报错句段路径，在调取的路径前添加
  >
  > `/项目名称`我这里是`/Mizuki`
  >
  > 全部更改完成即无报错显示
  >
  > 【不熟悉请不要更改此选项！！默认`'/'`即可】

## 上传代码

1.在 GitHub 上，跳转到存储库的 Settings 选项卡并找到设置的 Pages 部分。

2.选择 GitHub Actions 作为你网站的 Source，然后按 Save。 **小tips:** 提交前记得把workflows里的另外两个文件删了，不然action会报错喔OvO

3.将更改好的项目粘贴到Github Desktop克隆的文件夹中，点击上传





你的网站现在应该已完成发布了！当你将更改推送到 Astro 项目的存储库时，GitHub Action 将自动为你部署它们。
