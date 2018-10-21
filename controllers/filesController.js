const { Git } = require("../utils/Git");

const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require("../utils/navigation");

class FilesController {
  constructor() {
    this.git = new Git();
    this.fetchFileTree = (...args) => this.git.gitFileTree(...args);
    this.getFolderUrl = buildFolderUrl;
    this.getFileUrl = buildFileUrl;
    this.getBreadcrumbs = buildBreadcrumbs;
    this.getObjectUrl = this.buildObjectUrl;
  }

  buildObjectUrl(parentHash, { path, type }) {
    switch (type) {
      case "tree":
        return this.getFolderUrl(parentHash, path);
      case "blob":
        return this.getFileUrl(parentHash, path);
      default:
        return "#";
    }
  }

  async getFileTree(hash, path) {
    const list = await this.fetchFileTree(hash, path);
    const files = list.map(item => ({
      ...item,
      href: this.getObjectUrl(hash, item),
      name: item.path.split("/").pop()
    }));
    return files;
  }

  render(req, res, next) {
    const { hash } = req.params;
    const pathParam = (req.params[0] || "").split("/").filter(Boolean);

    const path = pathParam.length ? pathParam.join("/") + "/" : "";

    this.getFileTree(hash, path).then(
      files => {
        res.render("files", {
          title: "files",
          breadcrumbs: this.getBreadcrumbs(hash, pathParam.join("/")),
          files
        });
      },
      err => next(err)
    );
  }
}

module.exports = {
  FilesController
};
