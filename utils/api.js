// utils/api.js —— 数据接口层
// 当前从本地 mock 读取；后续接后端/云开发时，把内部实现替换为 wx.request / 云函数即可，
// 页面调用方式保持不变（均返回 Promise）。

const mock = require('./mock.js');

// 是否启用远程后端（接好后改为 true，并填 BASE_URL）
const USE_REMOTE = false;
const BASE_URL = ''; // 例：'https://your-api.com' 或云开发云函数名

function delay(data, ms = 200) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

/* ---------------- 课程 ---------------- */
function getCourses() {
  if (USE_REMOTE) {
    return wxRequest('/courses');
  }
  return delay(mock.courses);
}

function getCourseById(id) {
  if (USE_REMOTE) {
    return wxRequest('/courses/' + id);
  }
  return delay(mock.courses.find((c) => c.id === id) || null);
}

/* ---------------- 选课/报名 ---------------- */
function getSelections() {
  if (USE_REMOTE) {
    return wxRequest('/selections');
  }
  return delay(mock.selections);
}

function createSelection(payload) {
  if (USE_REMOTE) {
    return wxRequest('/selections', 'POST', payload);
  }
  // 本地模拟：追加一条记录
  const item = Object.assign(
    { id: 's' + Date.now(), selectedAt: formatDate(new Date()), status: 'normal', substitute: null },
    payload
  );
  mock.selections.unshift(item);
  return delay(item);
}

/* ---------------- 通知 ---------------- */
function getNotices() {
  if (USE_REMOTE) {
    return wxRequest('/notices');
  }
  return delay(mock.notices);
}

function getNoticeById(id) {
  if (USE_REMOTE) {
    return wxRequest('/notices/' + id);
  }
  return delay(mock.notices.find((n) => n.id === id) || null);
}

/* ---------------- 底层请求（预留） ---------------- */
function wxRequest(path, method = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + path,
      method,
      data,
      success: (res) => resolve(res.data),
      fail: (err) => reject(err)
    });
  });
}

function formatDate(d) {
  const p = (n) => (n < 10 ? '0' + n : '' + n);
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

module.exports = {
  getCourses,
  getCourseById,
  getSelections,
  createSelection,
  getNotices,
  getNoticeById
};
