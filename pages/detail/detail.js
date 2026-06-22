Page({
  data: {
    id: "",
    record: null,
    images: [],
    isCompleted: false
  },

  onLoad(options) {
    this.setData({ id: options.id || "" });
    this.loadRecord(options.id);
  },

  loadRecord(id) {
    const app = getApp();
    const record = app.getRecord(id);
    if (!record) {
      wx.showToast({ title: "线索不存在", icon: "none" });
      setTimeout(() => wx.navigateBack(), 800);
      return;
    }
    const images = record.images && record.images.length ? record.images : (record.image ? [record.image] : []);
    const isCompleted = record.status === "已找到" || record.status === "已归还";
    this.setData({ record, images, isCompleted });
  },

  previewImage(event) {
    const index = event.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.images[index],
      urls: this.data.images
    });
  },

  contactOwner() {
    const app = getApp();
    app.addMessage({
      id: `m${Date.now()}`,
      avatar: "新",
      name: this.data.record.contact,
      text: `你已发起关于“${this.data.record.title}”的联系请求`,
      time: "刚刚",
      unread: true
    });
    wx.showModal({
      title: "联系请求已发送",
      content: "为保护隐私，双方确认后才会展示联系方式。请到消息页查看后续回复。",
      confirmText: "去消息页",
      cancelText: "稍后查看",
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({ url: "/pages/messages/messages" });
        }
      }
    });
  },

  markDone() {
    if (this.data.isCompleted) {
      wx.showToast({ title: "该线索已完成", icon: "none" });
      return;
    }

    const status = this.data.record.type === "lost" ? "已找到" : "已归还";
    const app = getApp();
    app.updateRecord(this.data.id, { status, color: "green" });
    app.addMessage({
      id: `m${Date.now()}`,
      avatar: "系",
      name: "系统通知",
      text: `“${this.data.record.title}”已更新为${status}`,
      time: "刚刚",
      unread: true
    });
    wx.showToast({ title: "状态已更新" });
    this.loadRecord(this.data.id);
  }
});
