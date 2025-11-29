---
title: 新的开始！【Mizuki博客搭建教程~】
published: 2025-10-11
description: 这是一篇Mizuki博客搭建的教程~
tags: [教程, 通知]
image: "./cover.png"
category: 教程
draft: false
---

# Mizuki博客搭建【均来源于5.3版本，6.0+、7.0+版本有细微差异】

![Mizuki](https://docs.mizuki.mysqil.com/image.png)

## 下载项目文件

>前往仓库下载项目文件
>
>我的博客是V5.3版本，可自行选择。

::github{repo="matsuzaka-yuki/Mizuki"}

自行下载想要的版本解压即可。

# 1.安装使用

1. 环境依赖安装

    在开始使用 Mizuki 之前，您需要确保系统满足以下要求：

    - **Node.js >= 20**

      访问 [Node.js 官网](https://nodejs.org/) 下载并安装最新版本的 Node.js。建议使用 LTS 版本。

      安装完成后，打开终端或命令提示符，运行以下命令验证 Node.js 是否安装成功：

      ```
      node -v
      npm -v
      ```

      如果显示版本号，则表示安装成功。

    - **pnpm >= 9**

      如果您尚未安装 pnpm，可以通过 npm 安装：

      ```
      npm install -g pnpm
      ```

      安装完成后，打开终端或命令提示符，运行以下命令验证 pnpm 是否安装成功：

      ```
      pnpm -v
      ```

      如果显示版本号，则表示安装成功。

    - **Github Desktop**/ **Git**（可选）

      - 下载[Github Desktop](https://desktop.github.com/download/)

      :::note

      已安装**Github Desktop**无需再安装git

      :::

      - （可选）安装git

      访问 [Git 官网](https://git-scm.com/downloads) 下载并安装适合您操作系统的 Git 版本。

      安装完成后，打开终端或命令提示符，运行以下命令验证 Git 是否安装成功：

      ```
      git --version
      ```

      如果显示版本号，则表示安装成功。

2. 启动项目

    > 我们这里不选择直接克隆【国内环境克隆较慢，对小白不友好】

- 打开解压好的文件夹

- `cmd`以管理员身份运行【地址栏输入`cmd`然后`ctrl`+`shifi`+`enter`】

  - 安装依赖（使用pnpm）

  - ```
    pnpm install
    ```

- 配置博客
  - 在启动项目之前，您需要根据自己的需求进行配置【将在配置说明处进行详细说明，这里先进行部署】：
    - 编辑 `src/config.ts` 文件来自定义博客设置
    - 更新站点信息、主题颜色、横幅图片和社交链接
    - 配置翻译设置和特殊页面功能

- 启动开发服务器

  - 运行以下命令启动开发服务器：

  - ```
    pnpm dev
    ```

    启动成功后，您可以在浏览器中访问 `http://localhost:4321` 查看您的博客。



# 2.部署

> 综合所有方案，这里选择免费方案：`Netlify`+`Github Pages`部署

## Github Pages部署

1. Github Pages

如果您希望将博客托管在 GitHub Pages 上，Mizuki 项目通常会包含一个 GitHub Actions 工作流，可以帮助您自动化部署过程。您需要确保在 `astro.config.mjs` 中配置正确的 `base` 路径。

2. 请以`<Github用户名>.github.io`命名仓库

   在 `astro.config.mjs` 中配置文件设置 `site` 和 `base` 选项。

   ```
   import { defineConfig } from 'astro/config'   
   
   export default defineConfig({
     site: 'https://你自己的域名',    #用于Netlify部署。github pages部署使用<Github用户名>.github.io
     base: '/',
     })
   ```

   `site` 的值必须是以下之一：

   - 基于你的用户名的以下网址: `https://<username>.github.io`

   - 为 GitHub 组织的私有页面 自动生成的随机网址：`https://<random-string>.pages.github.io/`

   - 自定义域名：

     - 你可以选择通过将一个 ./public/CNAME 文件添加到你的项目中，来设置自定义域
       这会将你的站点部署在你的自定义域而不是 <YOUR_USERNAME>.github.io。
       不要忘记为你的域名提供商配置 DNS。

     - ```
       sub.mydomain.com
       ```

     - 要配置 Astro 以在 GitHub Pages 上使用自定义域名，请将你的域名设置为 site 的值。不要为 `base` 设置值：

       ```
       import { defineConfig } from 'astro/config'
       
       export default defineConfig({
           site: 'https://example.com',
       })
       ```

     

3. 配置**Github Action**

   1. 在你的项目中的 `.github/workflows/` 目录保留文件 `deploy.yml`，以下是 YAML 配置信息。（不用添加）

      ```
      name: Deploy to GitHub Pages
      on:
        # 每次推送到 `main` 分支时触发这个“工作流程”
        # 如果你使用了别的分支名，请按需将 `main` 替换成你的分支名
        push:
          branches: [ main ]
        # 允许你在 GitHub 上的 Actions 标签中手动触发此“工作流程”
        workflow_dispatch:
      # 允许 job 克隆 repo 并创建一个 page deployment
      permissions:
        contents: read
        pages: write
        id-token: write
      jobs:
        build:
          runs-on: ubuntu-latest
          steps:
            - name: Checkout your repository using git
              uses: actions/checkout@v4
            - name: Install, build, and upload your site
              uses: withastro/action@v3
              # with:
                # path: . # 存储库中 Astro 项目的根位置。（可选）
                # node-version: 20 # 用于构建站点的特定 Node.js 版本，默认为 20。（可选）
                # package-manager: pnpm@latest # 应使用哪个 Node.js 包管理器来安装依赖项和构建站点。会根据存储库中的 lockfile 自动检测。（可选）
        deploy:
          needs: build
          runs-on: ubuntu-latest
          environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
          steps:
            - name: Deploy to GitHub Pages
              id: deployment
              uses: actions/deploy-pages@v4
      ```

- 在 GitHub 上，跳转到存储库的 Settings 选项卡并找到设置的 Pages 部分。

- 选择 GitHub Actions 作为你网站的 Source，然后按 Save。

  :::note

  你的网站现在应该已完成发布了！当你将更改推送到 Astro 项目的存储库时，GitHub Action 将自动为你部署它们。

  :::

# 3.配置博客

## 3.1站点配置

>**站点配置说明**
>
>站点配置位于 `src/config.ts` 文件中的 `siteConfig` 对象，控制博客的基本信息和全局设置。

#### 配置详解

#### 3.1.1基本信息

```

// 定义站点语言
const SITE_LANG = "zh_CN"; // 语言代码，例如：'en', 'zh_CN', 'ja' 等。


export const siteConfig: SiteConfig = {
  title: "Mizuki",        // 网站标题
  subtitle: "One demo website",  // 网站副标题
  lang: SITE_LANG,         // 不需要配置，会根据 SITE_LANG 自动设置
}
```

- `title`：网站的主标题，显示在浏览器标签页和页面头部
- `subtitle`：网站的副标题，通常显示在主页横幅下方
- `lang`：网站的默认语言，影响日期格式、翻译等功能

#### 3.1.2主题颜色

```
  themeColor: {
    hue: 210,     // 主题色的色相值，范围 0-360
    fixed: false, // 是否隐藏访客的主题色选择器
  },
```

- `hue`：主题色的色相值，可以是 0-360 之间的任何数值
  - 红色: 0
  - 青色: 200
  - 蓝绿色: 250
  - 粉色: 345
- `fixed`：设置为 `true` 时，访客将无法更改主题色

#### 3.1.3横幅设置

横幅设置控制主页顶部的横幅显示：

```
  banner: {
    enable: true,  // 是否启用横幅
    src: {         // 横幅图片路径
      desktop: [   // 桌面端图片数组
        "assets/desktop-banner/1.webp",
        "assets/desktop-banner/2.webp",
        // 支持多张图片，自动启用轮播
      ],
      mobile: [    // 移动端图片数组
        "assets/mobile-banner/1.webp",
        "assets/mobile-banner/2.webp",
        // 移动端专用图片
      ],
    },
    position: "center", // 图片对齐方式，支持 'top', 'center', 'bottom'
    
    carousel: {
      enable: true,    // 启用轮播功能（多图片时）
      interval: 1,     // 轮播间隔时间（秒）
    },
    
    homeText: {
      enable: true,    // 在首页显示自定义文本
      title: "Mizuki", // 首页横幅主标题
      subtitle: [      // 副标题数组，支持多个文本
        "One demo website",
        "Carousel Text1",
        "Carousel Text2",
      ],
      typewriter: {
        enable: true,     // 启用打字机效果
        speed: 100,       // 打字速度（毫秒）
        deleteSpeed: 50,  // 删除速度（毫秒）
        pauseTime: 2000,  // 完整显示后的暂停时间（毫秒）
      },
    },
    
    credit: {
      enable: false,    // 显示横幅图片来源文本
      text: "Describe", // 来源文本
      url: "",          // 可选：原作品或作者页面链接
    },
  },

navbar: {
		transparentMode: "semifull", // 导航栏透明模式："semi" 半透明加圆角，"full" 完全透明，"semifull" 动态透明
	},
```

#### 3.1.4横幅配置详解

- **图片路径**：相对于 `/src` 目录，如果以 `/` 开头则相对于 `/public` 目录
- **轮播功能**：当图片数组长度大于1时自动启用轮播
- **响应式设计**：桌面端和移动端可使用不同的图片
- **打字机效果**：副标题支持动态打字机效果，可配置速度和暂停时间

#### 3.1.5目录设置

```
  toc: {
    enable: true, // 是否启用目录功能
    depth: 3,     // 目录深度，1-6，1表示只显示h1标题
  },
```

- `enable`：设置为 `false` 可禁用文章目录功能
- `depth`：控制目录显示的标题层级深度

#### 3.1.6导航栏二级折叠菜单配置 (`navBarConfig`)

此配置用于控制网站导航栏中的二级折叠菜单。您可以在 `src/config.ts` 文件中找到并修改它。

 **二级菜单示例**

```
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Links", // 一级菜单名称
			url: "/links/", // 一级菜单链接 (可选，如果只有子菜单，可以为空)
			children: [
				{
					name: "GitHub", // 二级菜单名称
					url: "https://github.com/matsuzaka-yuki/Mizuki", // 二级菜单链接
					external: true, // 外部链接
				},
				{
					name: "Bilibili",
					url: "https://space.bilibili.com/701864046",
					external: true,
				},
				{
					name: "Gitee",
					url: "https://gitee.com/matsuzakayuki/Mizuki",
					external: true,
				},
			],
		},
		{
			name: "My",
			url: "/content/",
			children: [
				LinkPreset.About,
				LinkPreset.Friends,
				LinkPreset.Anime,
				LinkPreset.Diary,
			],
		},
	],
};
```

#### 3.1.7展示社交媒体分享图片(OG)

你需要在 `src/config.ts` 文件中配置OG的开启。

```
generateOgImages: true, // 启用生成OpenGraph图片功能
```



## 3.2看板娘配置

:::note

看板娘配置文件位于 `src/config.ts` 文件中的 `pioConfig` 对象。

:::

可以按照需要开启或关闭看板娘功能。

```
// Pio 看板娘配置
export const pioConfig: import("./types/config").PioConfig = {
	enable: true, // 启用看板娘
	models: ["/pio/models/pio/model.json"], // 默认模型路径
	position: "left", // 默认位置在右侧
	width: 280, // 默认宽度
	height: 250, // 默认高度
	mode: "draggable", // 默认为可拖拽模式
	hiddenOnMobile: true, // 默认在移动设备上隐藏
	dialog: {
		welcome: "欢迎来到 Mizuki 网站！", // 欢迎词
		touch: [
			"你在干什么？",
			"再摸我就报警了！",
			"HENTAI!",
			"不可以这样欺负我啦！",
		], // 触摸提示
		home: "点击这里回到首页！", // 首页提示
		skin: ["想看看我的新衣服吗？", "新衣服真漂亮~"], // 换装提示
		close: "QWQ 下次再见吧~", // 关闭提示
		link: "https://github.com/matsuzaka-yuki/Mizuki", // 关于链接
	},
};
```

## 3.3页脚配置

现在,我们来配置页脚

```
export const footerConfig: FooterConfig = {
	enable: false, // 是否启用Footer HTML注入功能
};
```

首先把`enable`设置为`true`

编辑`FooterConfig.html`文件,添加你想要的HTML代码,例如:

```
    <p>这个一个示例页脚</p>
```

## 3.4个人资料配置

**个人资料配置说明**

个人资料配置位于 `src/config.ts` 文件中的 `profileConfig` 对象，控制网站侧边栏中的个人信息显示。

#### 配置项详解

```
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.jpg", // 头像图片路径
  name: "Mizuki",                     // 用户名
  bio: "This is a description",       // 个人简介
  links: [                             // 社交链接
    {
      name: "Bilibli",                // 链接名称
      icon: "fa6-brands:bilibili",    // 图标
      url: "https://space.bilibili.com/701864046", // 链接地址
    },
    // ... 更多链接
  ],
};
```

#### 3.4.1头像设置

- `avatar`：头像图片路径，相对于 `/src` 目录
  - 如果路径以 `/` 开头，则相对于 `/public` 目录
  - 建议使用正方形图片以获得最佳显示效果

#### 3.4.2基本信息

- `name`：显示在头像下方的用户名
- `bio`：个人简介，显示在用户名下方

#### 3.4.3社交链接

社交链接显示在个人简介下方，支持多种图标：

```
links: [
  {
    name: "Bilibli",              // 链接名称
    icon: "fa6-brands:bilibili",  // 图标名称
    url: "https://space.bilibili.com/701864046", // 链接地址
  },
  {
    name: "Gitee",                // 链接名称
    icon: "mdi:git",              // 图标名称
    url: "https://gitee.com/matsuzakayuki", // 链接地址
  },
  {
    name: "GitHub",               // 链接名称
    icon: "fa6-brands:github",    // 图标名称
    url: "https://github.com/matsuzaka-yuki", // 链接地址
  },
]
```



#### 3.4.4图标选择

Mizuka 使用 Iconify 图标库，支持多种图标集：

- `fa6-brands`：Font Awesome 6 品牌图标
- `mdi`：Material Design Icons
- `fa6-solid`：Font Awesome 6 实心图标
- `fa6-regular`：Font Awesome 6 空心图标

#### 3.4.5修改个人资料

要修改个人资料，请编辑 `profileConfig` 对象：

1. **更换头像**：替换 `avatar` 属性的图片路径
2. **修改用户名**：更改 `name` 属性
3. **更新简介**：修改 `bio` 属性
4. **管理社交链接**：编辑`links`数组
   - 添加新链接：向数组中添加新的链接对象
   - 删除链接：从数组中移除不需要的链接对象
   - 修改链接：更改现有链接对象的属性

## 3.5导航栏配置说明

**导航栏配置说明**

导航栏配置位于 `src/config.ts` 文件中的 `navBarConfig` 对象，控制网站顶部导航栏的显示内容和链接。

### 配置项详解

```
export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,      // 首页链接
    LinkPreset.Archive,   // 归档页面链接
    LinkPreset.About,     // 关于页面链接
    LinkPreset.Friends,   // 朋友页面链接
    LinkPreset.Anime,     // 番剧页面链接
    LinkPreset.Diary,     // 日记页面链接
    {
      name: "GitHub",    // 自定义链接名称
      url: "https://github.com/matsuzaka-yuki",
      external: true,     // 是否为外部链接
    },
  ],
};
```

# 4.自定义字体配置

本教程将指导您如何在 Mizuki 主题中添加和配置自定义字体。

#### 4.1准备工作

在开始之前，请确保您已经：

- 准备好要添加的字体文件（支持 `.ttf`、`.woff`、`.woff2` 等格式）
- 了解字体的名称和基本信息
- 具备基本的文件编辑能力

#### 4.2添加字体文件

1. 将您的字体文件复制到项目的字体目录：

```
public/assets/font/
```

2. 确保字体文件名称清晰易懂，例如：
   - `MyCustomFont.ttf`
   - `SpecialFont-Bold.woff2`

#### 4.3配置字体定义

1. 在CSS中定义字体

打开 `src/styles/main.css` 文件，在现有的 `@font-face` 定义后添加您的字体：

```css
/* 导入您的自定义字体 */
@font-face {
    font-family: 'YourFontName';
    src: url('/assets/font/YourFontFile.ttf') format('truetype');
    font-weight: normal;
    font-display: swap;
}
```

**参数说明：**

- `font-family`: 字体的名称，用于在 CSS 中引用
- `src`: 字体文件的路径
- `font-weight`: 字体粗细（normal、bold、100-900）
- `font-display`: 字体加载策略，建议使用 `swap`

2. 创建字体应用类

在同一文件中，添加字体应用类：

```css
/* 当启用您的自定义字体时应用为全局字体 */
.your-font-enabled {
    font-family: 'YourFontName', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

:::note

**注意：** 类名建议使用小写字母和连字符，例如 `custom-font-enabled`。

:::

3. 更新配置文件

修改主配置文件

打开 `src/config.ts` 文件，在 `font` 配置部分添加您的字体选项：

```typescript
// 字体配置
font: {
    zenMaruGothic: {
        enable: true, // 启用全局圆体
    },
    yourCustomFont: {
        enable: false, // 启用您的自定义字体
    },
},
```

**配置说明：**

- 键名应该使用驼峰命名法
- `enable` 属性控制字体是否启用
- 可以同时启用多个字体

4. 更新类型定义

```typescript
font: {
    zenMaruGothic: {
        enable: boolean; // 启用全局圆体
    };
    yourCustomFont: {
        enable: boolean; // 启用您的自定义字体
    };
};
```

5.  应用字体到布局

打开 `src/layouts/Layout.astro` 文件，找到 `<body>` 标签，在 `class:list` 中添加您的字体类：

```astro
<body class="min-h-screen" class:list={[
    {
        "lg:is-home": isHomePage, 
        "enable-banner": enableBanner,
        "zen-maru-gothic-enabled": siteConfig.font.zenMaruGothic.enable,
        "your-font-enabled": siteConfig.font.yourCustomFont.enable
    }
]}
    data-overlayscrollbars-initialize
>
```

6. 测试和使用

**应用字体**：在 `src/config.ts` 中将您的字体的 `enable` 设置为 `true`

**重启开发服务器**：

```bash
npm run dev
```

**检查效果**：打开浏览器查看字体是否正确应用

# 5.其他：文章客户端加密

:::note

博客特色配置说明请前往[Mizuki博客使用技巧 - 哈雷0V0的博客](https://v-blog.halei0v0.top/posts/guide3/)

【[更多参照](https://docs.mizuki.mysqil.com/config/other-config/)、[Umami访问量统计配置说明 ](https://docs.mizuki.mysqil.com/config/umami-config/#许可证配置)】

:::

### 概述

主题使用了 `bcryptjs` 用于密码的哈希处理，以及 `crypto-js` 用于内容的对称加密。

### 作流程

这一阶段发生在访客的浏览器里，当他们访问那个被加密的页面时：

### 1. 用户交互

访客首先看到的不是文章，而是一个密码输入界面。

### 2. 客户端验证与解密

当访客输入密码并点击"解锁"后，页面内嵌的 JavaScript 脚本会执行以下操作：

#### 验证密码

脚本会先用 `bcryptjs` 将访客输入的密码进行同样的哈希计算，然后与页面中预存的那个哈希值进行比对。如果二者匹配，证明密码正确。这是为了快速验证密码，避免用错误的密码去尝试解密，浪费计算资源。

#### 解密内容

密码验证通过后，脚本会使用访客刚刚输入的明文密码（它只存在于浏览器内存中，不会被发送到任何地方）作为密钥，调用 `crypto-js` 来解密页面中存储的文章密文。

#### 动态渲染

一旦密文被成功解密，脚本就会将还原出的、包含完整格式的 HTML 内容，动态地插入到页面的相应容器中。

### 3. 完成展示

至此，访客才能看到文章的真实内容。通过这种方式，我们成功地在没有后端的情况下，模拟出了一套安全的"验证-解密-渲染"流程，实现了对静态内容的有效保护。

#### 使用方法

在文章的 Front Matter 中添加以下配置：

```markdown
---
title: '这是一篇加密文章'
encrypted: true
password: 'your-secret-password'
---
```

这样定义后就可以实现为文章设定不可逆的文章加密，只有输入正确的密码才能查看文章内容。

```plaintext
src/content/posts/
├── post-1.md                # 文章文件（封面图使用网络图片或public目录图片）
└── post-2/                  # 包含文章和封面图的子目录
    ├── cover.png            # 封面图（相对路径：./cover.png）
    └── index.md             # 文章内容
```

# 6.软件推荐

[markdown编辑工具（Typora1.3.6）](https://kevinwu06.lanzout.com/iXkq30icv1ha)：https://kevinwu06.lanzout.com/iXkq30icv1ha

