// utils/api.js —— 数据接口层
// 两种模式：
//   USE_REMOTE = false → 读取本地 mock（打开即用，便于预览/调试，无需后端）
//   USE_REMOTE = true  → 走微信云开发 CloudBase（需在开发者工具开通云开发并填 CLOUD_ENV）
// 页面调用方式不变（均返回 Promise；list 返回数组、byId 返回对象）。
// 注意：云开发记录主键为 _id，本层已统一补 id 字段，页面 wx:key="id" 无需改动。

const mock = require('./mock.js');

// ====== 切换开关 ======
const USE_REMOTE = false;  // 接好云开发后改为 true
const CLOUD_ENV = '';      // 云开发环境 ID（开发者工具「云开发」控制台获取，形如 xxxx-env-abc123）

function delay(data, ms = 200) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function formatDate(d) {
  const p = (n) => (n < 10 ? '0' + n : '' + n);
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// 云记录主键 _id 归一化为 id，保证 wx:key / 跳转参数一致
function withId(doc) {
  return Object.assign({ id: doc._id }, doc);
}
function withIdList(list) {
  return list.map(withId);
}

// 获取云数据库引用（USE_REMOTE 为 true 时可用）
function getDB() {
  return wx.cloud.database();
}

/* ---------------- 课程 ---------------- */
function getCourses() {
  if (USE_REMOTE) {
    return getDB().collection('courses').orderBy('weekday', 'asc').get().then((r) => withIdList(r.data));
  }
  return delay(mock.courses);
}

function getCourseById(id) {
  if (USE_REMOTE) {
    return getDB().collection('courses').doc(id).get().then((r) => withId(r.data));
  }
  return delay(mock.courses.find((c) => c.id === id) || null);
}

/* ---------------- 选课/报名 ---------------- */
function getSelections() {
  if (USE_REMOTE) {
    return getDB().collection('selections').orderBy('selectedAt', 'desc').get().then((r) => withIdList(r.data));
  }
  return delay(mock.selections);
}

function createSelection(payload) {
  const base = {
    selectedAt: formatDate(new Date()),
    status: 'normal',
    substitute: null
  };
  if (USE_REMOTE) {
    const data = Object.assign({}, base, payload);
    return getDB()
      .collection('selections')
      .add({ data })
      .then((res) => Object.assign({ id: res._id }, data));
  }
  const item = Object.assign({ id: 's' + Date.now() }, base, payload);
  mock.selections.unshift(item);
  return delay(item);
}

/* ---------------- 通知 ---------------- */
function getNotices() {
  if (USE_REMOTE) {
    return getDB().collection('notices').orderBy('publishAt', 'desc').get().then((r) => withIdList(r.data));
  }
  return delay(mock.notices);
}

function getNoticeById(id) {
  if (USE_REMOTE) {
    return getDB().collection('notices').doc(id).get().then((r) => withId(r.data));
  }
  return delay(mock.notices.find((n) => n.id === id) || null);
}

module.exports = {
  USE_REMOTE,
  CLOUD_ENV,
  getCourses,
  getCourseById,
  getSelections,
  createSelection,
  getNotices,
  getNoticeById
};
