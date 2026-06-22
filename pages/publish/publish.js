Page({
  data: {
    mode: "lost",
    categoryIndex: 0,
    categories: ["证件", "数码", "钥匙", "书本", "其他"],
    images: []
  },

  switchMode(event) {
    this.setData({ mode: event.currentTarget.dataset.mode });
  },

  chooseCategory(event) {
    this.setData({ categoryIndex: Number(event.detail.value) });
  },

  chooseImages() {
    const remain = 3 - this.data.images.length;
    if (remain <= 0) {
      wx.showToast({ title: "最多上传 3 张图片", icon: "none" });
      return;
    }

    wx.chooseMedia({
      count: remain,
      mediaType: ["image"],
      sourceType: ["album", "camera"],
      sizeType: ["compressed"],
      success: (res) => {
        const picked = res.tempFiles.map((file) => file.tempFilePath).filter(Boolean);
        this.setData({ images: this.data.images.concat(picked).slice(0, 3) });
      }
    });
  },

  previewImage(event) {
    const index = event.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.images[index],
      urls: this.data.images
    });
  },

  removeImage(event) {
    const index = Number(event.currentTarget.dataset.index);
    const images = this.data.images.filter((_, itemIndex) => itemIndex !== index);
    this.setData({ images });
  },

  submitForm(event) {
    const values = event.detail.value;
    const title = (values.title || "").trim();
    const place = (values.place || "").trim();
    const time = (values.time || "").trim();
    const desc = (values.desc || "").trim();
    const contact = (values.contact || "").trim();
    const ownerHint = (values.ownerHint || "").trim();

    if (!title || !place || !time || !desc) {
      wx.showToast({ title: "请补全必填信息", icon: "none" });
      return;
    }

    const isFound = this.data.mode === "found";
    const app = getApp();
    const record = {
      id: `r${Date.now()}`,
      type: this.data.mode,
      typeText: isFound ? "招领" : "寻物",
      title,
      category: this.data.categories[this.data.categoryIndex],
      place,
      time,
      contact: contact || (isFound ? "拾到者" : "失主"),
      status: isFound ? "待认领" : "急寻",
      color: isFound ? "green" : "orange",
      image: this.data.images[0] || "",
      images: this.data.images,
      desc,
      ownerHint: ownerHint || "物品关键特征",
      createdAt: Date.now()
    };

    app.addRecord(record);
    app.addMessage({
      id: `m${Date.now()}`,
      avatar: "审",
      name: "审核助手",
      text: `“${record.title}”已提交，当前为模拟审核通过状态`,
      time: "刚刚",
      unread: true
    });

    wx.showToast({ title: "发布成功" });
    setTimeout(() => {
      wx.switchTab({ url: "/pages/home/home" });
    }, 600);
  }
});
