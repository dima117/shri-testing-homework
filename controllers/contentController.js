const { gitFileContent, gitFileTree } = require("../utils/git");
const { buildFolderUrl, buildBreadcrumbs } = require("../utils/navigation");

class ContentController {
  constructor() {
    this.gitFileTree = new gitFileTree().run;
    this.gitFileContent = gitFileContent;
    this.run = this.run.bind(this);
  }
  run(req, res, next) {
    const $this = this;
    const { hash } = req.params;
    const path = req.params[0].split("/").filter(Boolean);
    return this.gitFileTree(hash, path.join("/"))
      .then(function([file]) {
        if (file && file.type === "blob") {
          return $this.gitFileContent(file.hash);
        }
      })
      .then(
        content => {
          if (content) {
            console.log(content)
            res.render("content", {
              title: "content",
              breadcrumbs: buildBreadcrumbs(hash, path.join("/")),
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
module.exports = ContentController;
