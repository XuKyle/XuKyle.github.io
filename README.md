# Kyle Xu · 收藏页

按类型整理的链接收藏站，基于 Astro 静态生成，部署到 GitHub Pages（`https://xukyle.github.io/`）。

## 新增 / 修改收藏

唯一数据源是 `src/data/bookmarks.md`。在 `items` 下追加一条即可：

```yaml
- key: my-link            # 唯一标识，必填
  title: 显示名称          # 必填
  url: https://example.com # 必填，必须是 https
  category: 竞速           # 必填，决定分栏
  tags: [赛车, 计时赛]      # 可选
  description: 一句话说明   # 可选
  status: verified         # verified 或 pending（待核实会显示标记）
  note: 补充说明            # 可选
```

保存并提交后，GitHub Actions 会自动校验、构建并发布。

## 本地开发

```bash
npm install
npm run dev       # 本地预览
npm run check     # 类型与内容校验
npm run build     # 生成 dist/
```

## 部署

- 工作流：`.github/workflows/deploy.yml`，推送到 `master` 或手动触发。
- 首次启用：仓库 Settings → Pages → Source 选择 **GitHub Actions**。
- 旧 Hexo 站点的备份标签：`backup/pre-bookmark-redesign-20261009`。

## 目录

- `src/pages/index.astro`：收藏首页（分类、搜索、标签筛选）。
- `src/content.config.ts`：内容集合与字段校验。
- `src/styles/global.css`：Atlas 编辑风样式。
- `_redesign/`、`design-lab/`：改版设计参考，不参与生产构建。
