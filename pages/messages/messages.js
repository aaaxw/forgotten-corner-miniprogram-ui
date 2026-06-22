Page({
  data: {
    messages: [],
    unreadCount: 0
  },

  onShow() {
    const app = getApp();
    this.updateMessages(app.getMessages());
  },

  updateMessages(messages) {
    const unreadCount = messages.filter((item) => item.unread).length;
    this.setData({ messages, unreadCount });
  },

  markRead(event) {
    const app = getApp();
    const id = event.currentTarget.dataset.id;
    const messages = this.data.messages.map((item) => {
      if (item.id !== id) return item;
      return Object.assign({}, item, { unread: false });
    });
    app.saveMessages(messages);
    this.updateMessages(messages);
  },

  markAllRead() {
    if (!this.data.unreadCount) {
      wx.showToast({ title: "没有未读消息", icon: "none" });
      return;
    }

    const app = getApp();
    const messages = this.data.messages.map((item) => Object.assign({}, item, { unread: false }));
    app.saveMessages(messages);
    this.updateMessages(messages);
    wx.showToast({ title: "已全部标记" });
  },

  clearMessages() {
    if (!this.data.messages.length) return;

    wx.showModal({
      title: "清空消息",
      content: "仅清空本地演示消息，不会影响已发布线索。",
      confirmText: "清空",
      success: (res) => {
        if (!res.confirm) return;
        const app = getApp();
        app.saveMessages([]);
        this.updateMessages([]);
        wx.showToast({ title: "已清空" });
      }
    });
  }
});
