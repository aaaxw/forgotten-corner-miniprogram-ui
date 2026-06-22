Page({
  data: {
    user: {},
    stats: {
      points: 0,
      published: 0,
      completed: 0,
      active: 0
    },
    recentRecords: [],
    actions: [
      { title: "我的发布", desc: "查看全部本地演示线索" },
      { title: "认领记录", desc: "联系和完成记录会生成消息" },
      { title: "积分明细", desc: "完成一次归还 +20 分" },
      { title: "隐私设置", desc: "上线前接入授权与协议" },
      { title: "意见反馈", desc: "收集校园使用建议" }
    ]
  },

  onShow() {
    const app = getApp();
    const records = app.getRecords();
    const completed = records.filter((item) => item.status === "已找到" || item.status === "已归还").length;
    const recentRecords = records.slice(0, 3);
    this.setData({
      user: app.globalData.user,
      recentRecords,
      stats: {
        points: app.globalData.user.points + completed * 20,
        published: records.length,
        completed,
        active: records.length - completed
      }
    });
  },

  goDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}`
    });
  },

  tapAction(event) {
    const title = event.currentTarget.dataset.title;
    wx.showToast({ title: `${title}为演示入口`, icon: "none" });
  },

  clearDemoData() {
    wx.showModal({
      title: "重置演示数据",
      content: "将清空新增数据并恢复初始示例，是否继续？",
      success: (res) => {
        if (!res.confirm) return;
        getApp().resetDemoData();
        this.onShow();
        wx.showToast({ title: "已重置" });
      }
    });
  }
});
