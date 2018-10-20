let { gitFileContent, gitFileTree } = require("../utils/git");
let { buildFolderUrl, buildBreadcrumbs } = require("../utils/navigation");

module.exports = function(req, res, next) {
  if (req && req.testData) {
    gitFileContent = req.testData.gitFileContent;
    gitFileTree = req.testData.gitFileTree;
  }
  this.gitFileContent = req.testData
    ? req.testData.gitFileContent
    : gitFileContent;

  const { hash } = req.params;
  const path = req.params[0].split("/").filter(Boolean);

  gitFileTree(hash, path.join("/"))
    .then(function([file]) {
      if (file && file.type === "blob") {
        return this.gitFileContent(file.hash);
      }
    })
    .then(
      content => {
        if (content) {
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
};
