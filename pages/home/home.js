Page({
  data: {
    categories: ["全部", "证件", "数码", "钥匙", "书本", "其他"],
    selected: 0,
    scope: "all",
    quickFilters: [
      { label: "全部线索", value: "all" },
      { label: "只看寻物", value: "lost" },
      { label: "只看招领", value: "found" }
    ],
    keyword: "",
    records: [],
    items: [],
    stats: {
      total: 0,
      foundRate: "76%",
      response: "24h"
    }
  },

  onShow() {
    this.loadRecords();
  },

  loadRecords() {
    const app = getApp();
    const records = app.getRecords();
    const completed = records.filter((item) => item.status === "已找到" || item.status === "已归还").length;
    const foundRate = records.length ? `${Math.round((completed / records.length) * 100)}%` : "0%";
    this.setData({
      records,
      stats: Object.assign({}, this.data.stats, {
        total: records.length,
        foundRate
      })
    });
    this.applyFilters();
  },

  switchScope(event) {
    this.setData({ scope: event.currentTarget.dataset.scope }, () => {
      this.applyFilters();
    });
  },

  selectCategory(event) {
    this.setData({ selected: Number(event.currentTarget.dataset.index) }, () => {
      this.applyFilters();
    });
  },

  onSearch(event) {
    this.setData({ keyword: event.detail.value.trim() }, () => {
      this.applyFilters();
    });
  },

  applyFilters() {
    const category = this.data.categories[this.data.selected];
    const keyword = this.data.keyword;
    const items = this.data.records.filter((item) => {
      const categoryMatched = category === "全部" || item.category === category;
      const scopeMatched = this.data.scope === "all" || item.type === this.data.scope;
      const keywordMatched = !keyword || [item.title, item.place, item.desc, item.category, item.contact].join("").indexOf(keyword) >= 0;
      return categoryMatched && scopeMatched && keywordMatched;
    });
    this.setData({ items });
  },

  goDetail(event) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}`
    });
  }
});
