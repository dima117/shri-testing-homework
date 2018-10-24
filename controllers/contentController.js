const { gitFileContent, gitFileTree } = require("../utils/git");
const { buildBreadcrumbs } = require("../utils/navigation");

module.exports = function(req, res, next, ...rest) {
  const stubs = (rest && rest[0]) || {};
  const _gitFileTree = stubs.gitFileTree || gitFileTree;
  const _gitFileContent = stubs.gitFileContent || gitFileContent;
  const _buildBreadcrumbs = stubs.buildBreadcrumbs || buildBreadcrumbs;

  const { hash } = req.params;
  const path = req.params[0].split("/").filter(Boolean);

  return _gitFileTree(hash, path.join("/"))
    .then(function([file]) {
      if (file && file.type === "blob") {
        return _gitFileContent(file.hash);
      }
    })
    .then(
      content => {
        if (content) {
          res.render("content", {
            title: "content",
            breadcrumbs: _buildBreadcrumbs(hash, path.join("/")),
            content
          });
        } else {
          next();
        }
      },
      err => next(err)
    );
};
