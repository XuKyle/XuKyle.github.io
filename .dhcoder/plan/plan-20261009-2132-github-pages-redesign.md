# GitHub Pages 博客改版实施方案

## 目标与决策

- 将线上 `https://xukyle.github.io/` 从现有 Hexo 4.2 / Butterfly 静态产物切换为 `_redesign/index.html` 选定的 **E5 玻璃侧栏**：浅色极光玻璃、固定身份侧栏、文章 / 时间线 / 标签视图、侧栏标签云与字体切换；移动端改为可用的响应式导航。
- 使用 **Astro 静态构建 + GitHub Actions 部署到 GitHub Pages**。本站是 `XuKyle.github.io` 用户站点仓库，目标域名部署在根路径，不配置项目站点子路径。
- 按 `_redesign/index.html` 的既定说明，旧 9 篇文章不直接作为新站内容复刻；改版前先保存可恢复快照，旧站 URL 不得误指向不相关的新文章。新文章从 Markdown 开始维护。
- `_redesign/` 当前定位为设计稿和素材，不是上线入口：E5 卡片、时间线、标签仍有 `href="#"`，文章数据写死在 HTML 中，字体按钮也没有持久化；线上访问 `/_redesign/demos/e5-sidebar.html` 返回 GitHub Pages 404。

## 仓库现状与风险

- Git 远端为 `XuKyle/XuKyle.github.io.git`，当前分支 `master`；仓库根目录直接存放旧站生成后的 HTML、CSS、JS、图片和 `_redesign/`。
- 当前线上首页仍是旧 Hexo 站，包含 9 篇文章和 `/archives/`、`/tags/`、`/categories/` 等旧路由。现有 HTML 有错误的 `yoursite.com` canonical/OG 地址及第三方 CDN 依赖；新站应重建真实 SEO 元信息并尽量自托管字体。
- 目前未发现 `package.json`、Astro 配置、Markdown 内容源、README、GitHub Actions 工作流、`404.html` 或 `CNAME`。GitHub Pages 的现有发布设置未能从仓库文件确认，实施前须在仓库 Settings 核对并切换为 GitHub Actions。
- `_redesign/data/posts.json` 只有旧文章的摘要、统计和路径元数据，不包含可作为完整文章源的正文；样板中的部分代码片段是演示文案，不能直接当作可信文章内容发布。

## 目标结构

- `package.json`、lock 文件、`.nvmrc`：固定 Node LTS、Astro 及检查/构建命令，保证本地与 CI 可重复构建。
- `astro.config.mjs`：配置站点 URL `https://xukyle.github.io`、静态输出及稳定的尾斜杠 URL 规则。
- `src/content.config.ts`：定义文章 collection schema，至少校验标题、发布日期、描述、标签、草稿状态；拒绝无效日期和缺失必填元数据。
- `src/content/posts/*.md`：新文章唯一事实源，正文、代码、标签和摘要均以 Markdown/frontmatter 维护；不从 demo 中复制占位代码。
- `src/layouts/`、`src/components/`：拆分全站外壳、玻璃侧栏、导航、标签云、文章卡片、时间线、代码块和字体控制，复用 E5 的视觉变量及自托管字体。
- `src/pages/`：实现首页、文章详情、归档/时间线、标签列表及标签详情；文章卡片和标签使用真实静态路由，不依赖运行时 `fetch` 或客户端硬编码文章数组。
- `public/`：只放需原样复制到 `dist/` 的头像、favicon、字体等静态资源；复用 `_redesign/assets/fonts/` 前核验授权、文件名、字体子集与体积。
- `.github/workflows/deploy.yml`：CI 检查、构建并发布 `dist/` 到 GitHub Pages；首次启用 Pages 时把 Source 设为 GitHub Actions。

## 分阶段实施

### 阶段一：备份与迁移边界

1. 将当前线上静态站及其 9 个旧文章 URL 清单保存为仓库历史可恢复快照；另导出可离线恢复副本，确认能从快照还原。不得在这一步覆盖现网。
2. 记录旧文章 URL 与 tag/archive/category 路由清单，供上线前后检查；明确旧文章正文不迁移到新站，只有用户之后提供或新写的 Markdown 才进入新站。
3. 旧路径若没有语义明确的新内容，不创建误导性的重定向。上线后通过自定义 404 给出返回首页、文章列表和搜索/标签入口；搜索引擎 sitemap 仅列新站实际页面。若后续要求保留旧文章或做一对一迁移，先另行确认文章内容及 URL 对应关系。

### 阶段二：建立 Astro 与内容模型

1. 在仓库根增加 Astro 工程配置及锁文件，使用兼容 GitHub Actions 的 Node LTS；设置 `site` 为上述正式域名、静态生成和尾斜杠约定。
2. 建立文章 schema 与 Markdown 模板，加入草稿过滤、按日期倒序排序、tag slug 规范化及无文章时的友好空状态。
3. 把站点身份信息（作者名、简介、社交链接、站点描述）集中配置，避免散落在组件中。初次上线可以没有旧文正文，但首页/时间线/标签页须在零文章时仍可正常访问。

### 阶段三：实现 E5 正式界面与路由

1. 将 E5 视觉与交互拆成 Astro 组件，保留浅色紫粉玻璃侧栏、身份卡、三个浏览视图、侧栏标签云、日期时间线和三组字体选择；按方案不引入暗黑模式。
2. 文章列表与时间线数据统一从 Markdown collection 生成。每个卡片标题、标签、时间线项都链接到有效详情或标签页；去除所有 `href="#"`、伪造统计及写死的旧演示代码。
3. 文章详情页提供标题、日期、标签、正文、代码块、目录（有标题时）、上一篇/下一篇与返回列表。代码块保留可读性和窄屏横向滚动，不以截断方式隐藏内容。
4. 字体选项使用可访问的按钮语义，键盘可操作；将用户选择安全地保存在 localStorage，读取失败时优雅回退。优先自托管字体，按需加载并提供系统字体 fallback。
5. 响应式覆盖桌面、平板和手机：侧栏在窄屏转为紧凑身份区与可触达导航；确保无横向页面溢出、焦点可见、文字对比和 reduced-motion 偏好可用。

### 阶段四：SEO、兼容与质量门禁

1. 设置每页唯一 title/description、canonical、Open Graph、favicon、中文语言属性；生成 `sitemap.xml`、`robots.txt` 和 404 页面。正式域名统一使用 HTTPS 与 `https://xukyle.github.io`。
2. 对旧路由逐一测试：如无对应新内容，展示自定义 404 和清晰导航，不将所有失效路径重定向到首页；检查根路径部署时 CSS、字体、图片及页面内链接均使用正确 URL。
3. 增加 `npm run check` 与 `npm run build` 门禁。提交前本地检查 TypeScript/Astro、Markdown schema、构建产物、404、资源引用、内外链和关键页面标题；在桌面与移动视口手动验证导航、字体偏好、空状态、代码块及标签筛选。
4. 用 GitHub Actions 在 push 到 `master` 和手动触发时运行：检出代码、设置 Node、安装锁文件依赖、运行检查和构建、上传 `dist/` Pages artifact、部署 Pages。使用最小 `pages: write` / `id-token: write` 权限、串行部署并避免并发覆盖。

### 阶段五：预览、切换与回滚

1. 在正式替换前，先通过 Actions 验证构建并使用临时分支/预览环境检查；预览时专门核对正式域名 canonical、资源根路径、移动版和 404。
2. 经确认后在仓库 Settings 将 Pages 来源改为 GitHub Actions，再合并/推送发布。观察 Actions 部署结果，并检查首页、详情、标签、时间线、字体、404 和 sitemap。
3. 发布后抽查浏览器控制台及网络请求，确认没有资源 404、错误跳转或 demo 占位链接；清理旧 Hexo 生成产物时必须确认构建由 Astro 接管、快照可恢复。
4. 若部署失败或出现严重线上问题，回滚到上一个已验证提交并重新运行 Pages workflow；保留失败构建日志，修复后先在预览检查再重发。

## 验收标准

- `https://xukyle.github.io/` 展示 E5 玻璃侧栏正式版，视觉与 `_redesign/demos/e5-sidebar.html` 一致且响应式可用。
- 所有文章列表、标签、时间线和详情链接均由 Markdown 内容生成并可直接刷新访问；不存在占位 `#` 链接或无效演示内容。
- 无旧文时空状态清晰；旧站文章内容有可恢复备份，旧 URL 不会误导至不相关页面。
- `npm run check` 和 `npm run build` 成功，Actions 可自动发布 `dist/`；SEO 文件、真实 canonical、404、静态资源及移动端交互通过验收。
- 发布可通过 Git 提交回滚恢复，且不依赖本地手工生成并提交整站静态产物。

## 实施前需要用户确认

- “旧 9 篇全部清空重来”是否确定表示不在新站公开旧正文；本方案默认是，并要求先备份。
- 新站上线时是否先以空文章站点发布，还是会同时提供首批新文章 Markdown。若要保留现有读者可访问的文章，应先确认保留文章清单与重定向规则。
