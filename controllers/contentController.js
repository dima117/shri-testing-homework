const { Git } = require("../utils/Git");
const { buildBreadcrumbs } = require("../utils/navigation");

class ContentController {
  constructor() {
    this.git = new Git();
    this.fetchFileTree = (...args) => this.git.gitFileTree(...args);
    this.fetchFileContent = (...args) => this.git.gitFileContent(...args);
    this.getBreadcrumbs = buildBreadcrumbs;
  }
  async getFileContent(hash, path) {
    const file = (await this.fetchFileTree(hash, path.join("/")))[0];
    let result;
    if (file && file.type === "blob") {
      try {
        result = await this.fetchFileContent(file.hash);
      } catch (err) {
        result = err;
      }
    }
    return result;
  }

  render(req, res, next) {
    const { hash } = req.params;
    const path = req.params[0].split("/").filter(Boolean);

    this.getFileContent(hash, path).then(
      content => {
        if (content) {
          res.render("content", {
            title: "content",
            breadcrumbs: this.getBreadcrumbs(hash, path.join("/")),
            content
          });
        } else {
          next();
        }
      },
      err => next(err)
    );
  }
}
module.exports = {
  ContentController
};
