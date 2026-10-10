# Kyle Xu · 个人博客

基于 Astro 静态生成并部署到 GitHub Pages（`https://xukyle.github.io/`）。首页展示文章列表；每篇文章以 Markdown 保存，收藏链接也作为一篇普通文章发布。

## 新增文章

在 `src/pages/posts/` 新建 Markdown 文件，例如 `my-note.md`：

```markdown
---
title: 文章标题
pubDate: 2026-10-10
description: 一句话摘要
tags:
  - 随笔
layout: ../../layouts/BlogPost.astro
---

正文从这里开始。
```

文章会生成 `/posts/my-note/` 页面，并自动出现在首页文章列表。当前收藏文章位于 `src/pages/posts/bookmarks.md`。

## 本地开发

```bash
npm install
npm run dev       # 本地预览
npm run check     # 类型检查
npm run build     # 生成 dist/
```

## 部署

- 工作流：`.github/workflows/deploy.yml`，推送 `master` 后自动发布。
- GitHub 仓库 Settings → Pages → Source 应选择 **GitHub Actions**。
- 旧 Hexo 站点可从备份标签 `backup/pre-bookmark-redesign-20261009` 恢复。

## 目录

- `src/pages/index.astro`：正常博客首页，自动列出 Markdown 文章。
- `src/pages/posts/*.md`：文章内容；`bookmarks.md` 是收藏文章。
- `src/layouts/BlogPost.astro`：文章详情页布局。
- `src/styles/global.css`：站点基础样式。
- `_redesign/`、`design-lab/`：本地设计参考，不进入生产构建。
