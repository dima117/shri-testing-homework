const { Git } = require("../utils/Git");
const { buildFolderUrl, buildBreadcrumbs } = require("../utils/navigation");
class IndexController {
  constructor() {
    this.git = new Git();
    this.fetchHistory = (...args) => this.git.gitHistory(...args);
    this.getFolderUrl = buildFolderUrl;
    this.getBreadcrumbs = buildBreadcrumbs;
  }

  async getIndexList(page, size) {
    const history = await this.fetchHistory(page, size);
    const list = history.map(item => ({
      ...item,
      href: this.getFolderUrl(item.hash, "")
    }));
    return list;
  }

  render(req, res, next) {
    this.getIndexList(1, 20).then(
      list => {
        res.render("index", {
          title: "history",
          breadcrumbs: this.getBreadcrumbs(),
          list
        });
      },
      err => next(err)
    );
  }
}

module.exports = {
  IndexController
};
