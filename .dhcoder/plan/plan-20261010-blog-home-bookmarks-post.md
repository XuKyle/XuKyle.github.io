# 博客首页与收藏文章调整计划（修订）

> 本计划修订并取代 `plan-20261009-2247-github-pages-bookmarks-redesign.md` 中“整个网站以收藏页为唯一公开内容”的产品方向。依据用户澄清：本站必须保留正常博客首页与持续发文能力，收藏只是其中一篇文章。

## 正确目标

- 首页 `/`：Atlas 编辑风的博客首页，显示最近文章摘要、日期、标签和可用导航；后续新增 Markdown 文章后自动出现在首页。
- 收藏文章 `/posts/bookmarks/`：一篇普通 Markdown 博文，正文按动作/对战、竞速、卡牌/构筑、艺术/历史等类型组织链接。
- 新文章放在 `src/pages/posts/*.md`，由 Astro 生成独立页面；推送到 `master` 后由 GitHub Actions 部署。
- 旧 9 篇文章按用户原决定不出现在新站；备份标签 `backup/pre-bookmark-redesign-20261009` 保留用于恢复。

## 要修改/新增

- 将 `src/pages/index.astro` 改为文章列表首页，不再直接铺出完整收藏目录。
- 新增 `src/layouts/BlogPost.astro` 统一渲染文章标题、日期、标签与正文。
- 新增 `src/pages/posts/bookmarks.md` 作为完整收藏文章，链接按类型分组。
- 移除只服务于单页收藏站的 `src/data/bookmarks.md` 与 `src/content.config.ts` 自定义收藏集合配置。
- 更新 `README.md` 为博客说明：未来发文只需在 `src/pages/posts/` 添加 Markdown 文件。
- 保留 Astro/GitHub Pages 工作流，确认首页与 `/posts/bookmarks/` 均静态生成。

## 验收

- 首页呈现博客文章卡片，不再显示整套收藏目录。
- `/posts/bookmarks/` 是单独可刷新访问的文章页，8 个链接按类别完整出现。
- 新增一篇 Markdown 文件后首页能自动列出，构建生成对应静态路由。
- `npm run check`、`npm run build` 成功；Actions 工作流仍部署 `dist/`。
- 旧站备份标签可读，且旧文章没有被恢复到新首页。
