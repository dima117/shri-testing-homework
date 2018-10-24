const { gitFileTree } = require("../utils/git");
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require("../utils/navigation");

function buildObjectUrl(parentHash, { path, type }) {
  switch (type) {
    case "tree":
      return buildFolderUrl(parentHash, path);
    case "blob":
      return buildFileUrl(parentHash, path);
    default:
      return "#";
  }
}

module.exports = function(req, res, next, ...rest) {
  const stubs = (rest && rest[0]) || {};
  const _gitFileTree = stubs.gitFileTree || gitFileTree;
  const _buildObjectUrl = stubs.buildObjectUrl || buildObjectUrl;
  const _buildBreadcrumbs = stubs.buildBreadcrumbs || buildBreadcrumbs;

  const { hash } = req.params;
  const pathParam = (req.params[0] || "").split("/").filter(Boolean);

  const path = pathParam.length ? pathParam.join("/") + "/" : "";

  return _gitFileTree(hash, path).then(
    list => {
      const files = list.map(item => ({
        ...item,
        href: _buildObjectUrl(hash, item),
        name: item.path.split("/").pop()
      }));

      res.render("files", {
        title: "files",
        breadcrumbs: _buildBreadcrumbs(hash, pathParam.join("/")),
        files
      });
    },
    err => next(err)
  );
};
