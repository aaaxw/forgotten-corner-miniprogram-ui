const STORAGE_KEY = "forgotten_corner_records";
const MESSAGE_KEY = "forgotten_corner_messages";

const seedRecords = [
  {
    id: "r001",
    type: "found",
    typeText: "招领",
    title: "蓝色校园卡",
    category: "证件",
    place: "图书馆二楼自习区",
    time: "今天 10:20",
    contact: "图书馆服务台",
    status: "待认领",
    color: "green",
    image: "",
    desc: "卡套为透明蓝色，卡面可见荆楚理工学院字样。认领时需说出姓名和学号后四位。",
    ownerHint: "姓名、学号后四位",
    createdAt: 1717650000000
  },
  {
    id: "r002",
    type: "lost",
    typeText: "寻物",
    title: "黑色无线耳机",
    category: "数码",
    place: "食堂东门附近",
    time: "昨天 18:40",
    contact: "秦同学",
    status: "急寻",
    color: "orange",
    image: "",
    desc: "黑色耳机盒，盒子背面有一张小熊贴纸。如果捡到请通过站内消息联系。",
    ownerHint: "贴纸图案",
    createdAt: 1717560000000
  },
  {
    id: "r003",
    type: "found",
    typeText: "招领",
    title: "银色钥匙串",
    category: "钥匙",
    place: "篮球场看台",
    time: "6月5日",
    contact: "体育馆值班室",
    status: "已核验",
    color: "blue",
    image: "",
    desc: "三把钥匙和一个圆形金属挂件。为保护隐私，认领时需描述挂件图案。",
    ownerHint: "挂件图案",
    createdAt: 1717480000000
  }
];

const seedMessages = [
  { id: "m001", avatar: "图", name: "图书馆服务台", text: "你发布的校园卡疑似匹配成功", time: "10:42", unread: true },
  { id: "m002", avatar: "拾", name: "拾到者 A 同学", text: "请确认耳机盒上的贴纸颜色", time: "昨天", unread: false },
  { id: "m003", avatar: "系", name: "系统通知", text: "银色钥匙串已通过管理员审核", time: "6月5日", unread: false }
];

App({
  globalData: {
    user: {
      name: "校园探险家",
      school: "荆楚理工学院",
      verified: true,
      points: 320
    }
  },

  onLaunch() {
    this.initDemoData();
  },

  initDemoData() {
    if (!wx.getStorageSync(STORAGE_KEY)) {
      wx.setStorageSync(STORAGE_KEY, seedRecords);
    }
    if (!wx.getStorageSync(MESSAGE_KEY)) {
      wx.setStorageSync(MESSAGE_KEY, seedMessages);
    }
  },

  resetDemoData() {
    wx.setStorageSync(STORAGE_KEY, seedRecords);
    wx.setStorageSync(MESSAGE_KEY, seedMessages);
  },

  getRecords() {
    return wx.getStorageSync(STORAGE_KEY) || [];
  },

  saveRecords(records) {
    wx.setStorageSync(STORAGE_KEY, records);
  },

  addRecord(record) {
    const records = this.getRecords();
    records.unshift(record);
    this.saveRecords(records);
  },

  getRecord(id) {
    return this.getRecords().find((item) => item.id === id);
  },

  updateRecord(id, patch) {
    const records = this.getRecords().map((item) => {
      if (item.id !== id) return item;
      return Object.assign({}, item, patch);
    });
    this.saveRecords(records);
  },

  getMessages() {
    return wx.getStorageSync(MESSAGE_KEY) || [];
  },

  saveMessages(messages) {
    wx.setStorageSync(MESSAGE_KEY, messages);
  },

  addMessage(message) {
    const messages = this.getMessages();
    messages.unshift(message);
    this.saveMessages(messages);
  }
});
