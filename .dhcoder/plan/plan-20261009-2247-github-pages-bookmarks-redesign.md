# GitHub Pages 收藏链接站点改版计划

## 目标与产品决策

- 将当前 `https://xukyle.github.io/` 从旧 Hexo 静态博客改为个人收藏入口站：不再维护旧文章；首页以一份 Markdown 收藏清单为唯一内容源，自动生成按类型分类、可搜索筛选的视觉链接页。
- 采用 **Astro 静态生成 + GitHub Actions + GitHub Pages**。用户只维护 Markdown；推送到 `master` 后自动校验、构建并发布。
- 首页使用当前选定的 **Atlas 瑞士编辑排版**方向：克制衬线标题、编辑式网格、留白和清晰分类；不保留六套预览切换器、演示文案或无意义统计。标签使用轻玻璃胶囊，而非厚重方框。
- 删除旧内容前先确保 Git 历史可回滚，并建立本地/远端备份。旧文章不会迁移到新站；若 URL 无对应的新收藏内容，不把旧路径错误重定向到任意收藏项目。

## 已知仓库现状

- 远端仓库为 `XuKyle/XuKyle.github.io.git`，默认工作分支配置为 `master`；现有站点是 Hexo 生成的静态 HTML 产物，而非可直接编辑 Markdown 后自动发布的源码工程。
- 当前旧文章位于 `2020/**`，包含 9 篇；另有 `archives/**`、`categories/**`、`tags/**`、旧 `index.html`、`css/**`、`js/**` 和 `img/**` 等旧站页面与资源。
- `_redesign/**` 与 `design-lab/index.html` 是方案/原型资源，不是生产构建流程。`design-lab` 现有示例引用旧文章路径，不应作为新站文章数据源。
- 仓库未找到 `package.json`、Astro 配置、Jekyll `_config.yml`、GitHub Actions Pages 工作流或完整 Hexo 源码；单纯添加 Markdown 并 push 不会自动形成新的收藏站。
- Pages 的当前 Source、分支和目录设置仅凭仓库无法确定；实施时必须进入 GitHub 仓库 Settings → Pages 核对并切换为 GitHub Actions。

## 收藏链接初步清单

按页面实测内容组织，不只依据域名猜测。正式内容源应保存完整 URL（包括 Pong 的房间参数），但不要把会话密钥或私人房间参数公开；先确认 `52Z3SF` 是否为公开可分享房间。

- **动作 / 对战**
  - Pong Online Battle：`https://pong-online-battle.app.workbuddy.host/?room=52Z3SF`。首屏显示“链路实测”，为双人联机 Pong；页面标题与房间是否适合公开仍需确认。
  - 萤火七夜：`https://yinghuo-seven-nights.app.workbuddy.host/`。动作/闯关，含攻击、格挡、跳跃、冲刺操作。
- **竞速**
  - 极速狂飙 / Turbo Rush：`https://turbo-rush-racer.app.workbuddy.host/`。3 圈计时赛，转向、刹车、氮气和暂停。
  - 霓虹狂飙 / Neon Rush：`https://neon-rush-racer.app.workbuddy.host/`。霓虹赛车，支持手机虚拟按键和单圈记录。
- **卡牌 / 策略**
  - Cardforge：`https://cardforge.app.workbuddy.host/`。卡组构筑和对战参数配置；完整产品标题需确认。
- **Roguelike / 构筑**
  - Witch Roguelike V01：`https://witch-roguelike-v01.app.workbuddy.host/`。首屏为初始元素选择，后续有升级/解锁构筑；正式显示名称需确认。
- **艺术 / 知识**
  - 西方绘画史：`https://western-painting-history.app.workbuddy.host/`。从洞窟到当代的图文浏览，有大图与字号调节。
  - Nations History：`https://nations-history.app.workbuddy.host/`。当前 DNS 无法解析，名称与内容均待核实；在验证前不要伪造介绍，可暂时显示“待确认”或先不公开。

## 目标信息架构与内容模型

- `/`：主收藏页，顶部站点名和极简导航；首屏随机展示一条有出处的短句（如启用此设计），下面进入分类目录、搜索和收藏卡片。
- 页面组织原则：分类是主入口，标签是横向快速筛选；收藏卡片优先展示名称、类型、简短说明、可选操作提示，点击打开原站新标签。
- 使用一个易编辑的 Markdown 内容源，例如 `src/content/bookmarks.md` 或由单一 `src/data/bookmarks.md` 解析。为 Astro 内容集合定义 schema：`title`、`url`、`category`、`tags`、`description`、`status`、可选 `controls`/`featured`。校验 HTTPS、允许的类别和重复 URL；待核实项目明确标为 pending。
- GitHub Pages 是静态主机，没有后端服务。搜索与分类筛选必须在构建产物中由轻量客户端脚本完成，所有收藏内容应预渲染进 HTML；不依赖运行时 API、远端数据库或链接站点跨域抓取。
- 外链使用新标签打开，并设置 `rel="noopener noreferrer"`；卡片可键盘访问，提供可见 focus、足够触控面积、语义标题与屏幕阅读器可读的标签/筛选状态。

## 分阶段实施

### 阶段一：核实内容并备份

1. 再次确认“全部旧文章不迁移到新站”，并确认 Pong 房间 URL 是否可公开分享、Witch Roguelike 与 Cardforge 的正式名称，以及 Nations History 的可访问链接。
2. 给当前 Git 提交打可读备份 tag，并将旧静态产物另存归档分支或仓库内独立备份（依用户决定）；至少验证能通过提交还原 `index.html`、`2020/**`、`archives/**`、`categories/**`、`tags/**`。
3. 把旧路径和站点资产记录为清理清单。未完成备份前禁止删除旧站文件。

### 阶段二：构建内容站和 Atlas 页面

1. 在仓库根目录初始化 Astro 静态工程、锁文件、Node LTS 版本、检查/构建脚本；设置 `site: https://xukyle.github.io`、根路径部署和固定尾斜杠。
2. 实现单一 Markdown 收藏源和严格 schema；按上述类型生成分类区块，待确认链接不会被误标成已验证内容。
3. 用 Atlas 网格实现桌面与移动首页。增加前端搜索、类别切换、tag 速查、精选收藏入口和空结果状态；交互基于 Markdown 构建的数据，不维护多个重复数组。
4. 加入真实 favicon、站点标题/描述、canonical、Open Graph、`sitemap.xml`、`robots.txt`、自定义 404；按需沿用已授权且适合的 `img/avatar.png` 与自托管字体。移除遗留的旧 Hexo CDN 和错误 canonical 地址。
5. 实现无结果/链接失效的清晰反馈。旧 URL 未有等价替代内容时返回 404，不将所有旧文章地址统一导向首页。

### 阶段三：检查和发布

1. 增加 `.github/workflows/deploy.yml`：检出、设置 Node、按 lockfile 安装、运行 schema/静态检查、构建 Astro、上传 Pages artifact 并部署。
2. 设置最小 Actions 权限（`pages: write`、`id-token: write`）、并发策略和失败时保留日志；在 Settings → Pages 把 Source 设置为 GitHub Actions。
3. 先在分支/预览中检查，再合并到 `master`。验证 Actions 成功后检查正式域名首页、外链、筛选、搜索、刷新、404、移动端布局与 HTTPS。
4. 清理旧文章和旧 Hexo 产物只在构建链已接管根首页、备份已验证、预览验收通过后执行。归档清单与设计参考是否保留为非公开源码资源，由实施时明确决定；`_redesign`/`design-lab` 不作为生产站内容自动发布。

### 阶段四：回滚与维护

- 若部署失败或首页严重异常，回滚到上一个成功提交并重跑 Pages workflow；不得通过手动覆盖 `dist/` 掩盖构建失败。
- 新增收藏只改 Markdown：补标题、HTTPS URL、准确类别、tags 和实测描述；提交后 Actions 自动校验并部署。
- 定期复查失效外链和待确认链接；无访问权限时保留明确状态，不从 URL 名称臆测内容。

## 验收标准

- 首页发布在 `https://xukyle.github.io/`，旧 9 篇文章不再出现在新站首页/归档中，收藏链接成为唯一公开内容主体。
- 8 个收藏条目都有准确名称、类别、HTTPS URL 和简短说明；无法核实项显示待确认或经确认后再发布。
- Markdown 是唯一内容源，新增一条可通过修改 Markdown、push、Actions 构建成功而出现在站点。
- 按类别与标签筛选、搜索、外链打开、键盘导航、手机布局、页面刷新和 404 均通过测试。
- GitHub Actions 自动部署成功、正式域名 HTTPS 正常、旧站可从 Git 快照恢复。

## 实施前需用户确认

- 确认旧文章只从新站下线，还是也要从仓库中彻底删除；建议 Git 历史/离线归档保留以便恢复。
- 确认 Pong 链接中的 `room=52Z3SF` 是否公开，以及是否有专属分享链接。
- 补充 Witch Roguelike、Cardforge 的正式标题；确认 `nations-history` 正确域名或暂不发布此条。
