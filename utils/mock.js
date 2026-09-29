// utils/mock.js —— 贴合广南三小课后服务场景的模拟数据
// 后续接后端/云开发时，本文件可整体移除，由 api.js 改为网络请求。

// 课程类型：特色课 / 非特色课（对应《非特色课课程安排表》）
const COURSE_TYPES = ['特色课', '非特色课'];

// 课程数据
const courses = [
  {
    id: 'c001',
    name: '创意美术',
    type: '特色课',
    category: '艺术',
    teacher: '李老师',
    location: '美术室(二)',
    gradeScope: '一~三年级',
    capacity: 30,
    enrolled: 28,
    weekday: '周一',     // 上课星期
    timeSlot: '16:30-17:30', // 课后服务时段
    weeks: 16,          // 完整教学周数（预算基准）
    status: 'open'       // open 招生中 / full 满额 / closed 已结课
  },
  {
    id: 'c002',
    name: '快乐篮球',
    type: '特色课',
    category: '体育',
    teacher: '王老师',
    location: '篮球场',
    gradeScope: '四~六年级',
    capacity: 24,
    enrolled: 24,
    weekday: '周二',
    timeSlot: '16:30-17:30',
    weeks: 16,
    status: 'full'
  },
  {
    id: 'c003',
    name: '硬笔书法',
    type: '特色课',
    category: '书法',
    teacher: '程令冈',
    location: '书法教室',
    gradeScope: '全校',
    capacity: 36,
    enrolled: 31,
    weekday: '周三',
    timeSlot: '16:30-17:30',
    weeks: 16,
    status: 'open'
  },
  {
    id: 'c004',
    name: '作业辅导（非特色）',
    type: '非特色课',
    category: '看护',
    teacher: '各班原任教师',
    location: '本班教室',
    gradeScope: '按班级',
    capacity: 45,
    enrolled: 40,
    weekday: '周一至周五',
    timeSlot: '16:30-17:30',
    weeks: 18,
    status: 'open'
  }
];

// 选课/报名记录（含代课口径示例）
const selections = [
  {
    id: 's001',
    studentName: '张小明',
    className: '三(2)班',
    courseId: 'c001',
    courseName: '创意美术',
    selectedAt: '2026-09-01',
    status: 'normal',   // normal 正常 / substitute 代课
    // 代课口径示例（平时不填，仅代课时记录）
    substitute: null
  },
  {
    id: 's002',
    studentName: '李华',
    className: '四(1)班',
    courseId: 'c002',
    courseName: '快乐篮球',
    selectedAt: '2026-09-01',
    status: 'normal',
    substitute: null
  },
  {
    id: 's003',
    studentName: '王芳',
    className: '五(3)班',
    courseId: 'c003',
    courseName: '硬笔书法',
    selectedAt: '2026-09-02',
    status: 'substitute', // 代课形式上报
    // 8月31日开学首日示例：被代课人=课表原定教师，代课人=实际授课教师
    substitute: {
      byCourseTeacher: '程令冈',   // 被代课人：课表原定教师
      byActualTeacher: '赵老师'    // 代课人：实际上课教师
    }
  }
];

// 通知（家校沟通）
const notices = [
  {
    id: 'n001',
    title: '课后服务选课开始通知',
    level: 'important', // normal / important / urgent
    content: '各位家长：本学期课后服务选课通道已开启，请在9月5日前完成报名。特色课名额有限，先到先得。',
    publishAt: '2026-08-28 09:00',
    publisher: '广南三小教务处'
  },
  {
    id: 'n002',
    title: '关于开学首日（8月31日）课后服务安排的说明',
    level: 'urgent',
    content: '8月31日为开学首日，无常规课表但对应周一。该时段预算归属《非特色课课程安排表》登记教师。如填报代课，被代课人填课表原定教师，代课人填实际上课教师。',
    publishAt: '2026-08-30 15:30',
    publisher: '课后服务专干 程令冈'
  },
  {
    id: 'n003',
    title: '同班同科目中途换人结算口径',
    level: 'normal',
    content: '同一班级同一科目中途换人的，履职时间较长的一方按课表常规课时入预算；履职时间较短的一方以代课形式上报考。',
    publishAt: '2026-09-10 11:00',
    publisher: '课后服务专干 程令冈'
  }
];

module.exports = {
  COURSE_TYPES,
  courses,
  selections,
  notices
};
