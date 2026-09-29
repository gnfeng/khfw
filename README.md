# 课后服务专干助手（afterschool-helper）

广南县城区第三小学校 · 课后服务数字化工作台小程序脚手架。聚焦**课程管理、选课报名、家校通知**三件套，Ocean 校办风配色，原生微信小程序 + 本地 Mock 数据，导入微信开发者工具即可预览。

> 适用：课后服务专干 / 教务老师管理特色课与非特色课、学生选课、家校通知发布。

---

## 一、功能模块

| 模块 | 页面 | 说明 |
|------|------|------|
| 首页 | `pages/index` | 校名 + 对接人 + 课程/报名/通知统计 + 三件套入口 |
| 课程管理 | `pages/course/list`、`detail` | 课程卡片列表、新增/编辑课程（含特色课/非特色课、教师、地点、时段、教学周数） |
| 选课报名 | `pages/selection/list`、`form` | 报名记录、正常/代课筛选、新增报名（含代课口径） |
| 家校通知 | `pages/notice/list`、`detail` | 通知列表（普通/重要/紧急）、详情查阅 |

可复用组件：`components/course-card`（课程卡片）。

---

## 二、目录结构

```
afterschool-helper/
├── project.config.json        # 小程序项目配置（appid 现为 touristappid，请替换）
├── app.js / app.json / app.wxss / sitemap.json
├── components/
│   └── course-card/           # 课程卡片组件
├── pages/
│   ├── index/                 # 首页
│   ├── course/                # 课程管理（list / detail）
│   ├── selection/             # 选课报名（list / form）
│   └── notice/                # 家校通知（list / detail）
└── utils/
    ├── mock.js                # 课后服务场景模拟数据
    └── api.js                 # 数据接口层（预留后端/云开发）
```

---

## 三、如何运行

1. 下载/克隆本仓库到本地。
2. 打开**微信开发者工具** → 导入项目 → 选择本目录。
3. AppID 选择「测试号」(touristappid) 或填入自有小程序 AppID（修改 `project.config.json` 的 `appid`）。
4. 编译即可在模拟器预览。数据现由 `utils/mock.js` 提供，无需后端。

---

## 四、代课填报口径（已内置校验提示）

依据学校课后服务津贴结算口径，小程序在「选课报名 → 新增报名」中内置代课标注：

- **是否代课** 开关开启后，需填写：
  - **被代课人**：课表**原定教师**
  - **代课人**：实际**上课教师**
- 列表以「代课」橙色标签单独标注，便于结算区分。
- 同班同科目中途换人：履职时间短的一方以代课形式上报考。
- 开学首日（如 8 月 31 日）等特殊时段：预算归属《非特色课课程安排表》登记教师。

---

## 五、接入后端 / 云开发

当前 `utils/api.js` 的 `USE_REMOTE = false`，数据走本地 Mock。接入真实后端时：

1. 将 `USE_REMOTE` 改为 `true`，填写 `BASE_URL`（或云函数名）。
2. 实现 `wxRequest` 内的接口路径（`/courses`、`/selections`、`/notices` 等）。
3. 删除 `utils/mock.js` 依赖即可，页面调用方式不变。

---

## 六、GitHub

- 仓库：`git@github.com:gnfeng/afterschool-helper.git`（SSH，已配密钥免密）
- 校名、对接人、配色等校办规范维护于 `app.js` 的 `globalData`。

---

*广南县城区第三小学校 · 课后服务专干 程令冈 18087698482*
