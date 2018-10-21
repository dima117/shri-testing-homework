let {
  gitFileContent,
  gitFileTree
} = require("../utils/git");
let {
  buildFolderUrl,
  buildBreadcrumbs
} = require("../utils/navigation");

function contentController(req, res, next, mocks) {
  if (mocks) {
    gitFileContent = mocks.gitFileContent;
    gitFileTree = mocks.gitFileTree;
  }
  this.gitFileContent = mocks ?
    mocks.gitFileContent :
    gitFileContent;

  const {
    hash
  } = req.params;
  const path = req.params[0].split("/").filter(Boolean);

  gitFileTree(hash, path.join("/"))
    .then(function ([file]) {
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
}

module.exports = function (req, res, next) {
  contentController(req, res, next)
};

module.exports.contentController = contentController;