const {
  gitFileTree
} = require("../utils/git");
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require("../utils/navigation");

function buildObjectUrl(parentHash, {
  path,
  type
}) {
  switch (type) {
    case "tree":
      return buildFolderUrl(parentHash, path);
    case "blob":
      return buildFileUrl(parentHash, path);
    default:
      return "#";
  }
}

function filesController(req, res, next, mocks) {
  if (mocks) {

  }
  this.gitFileTree = req.testData ? mocks.gitFileTree : gitFileTree;

  const {
    hash
  } = req.params;

  const pathParam = (req.params[0] || "").split("/").filter(Boolean);

  const path = pathParam.length ? pathParam.join("/") + "/" : "";

  return this.gitFileTree(hash, path).then(
    list => {
      const files = list.map(item => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split("/").pop()
      }));

      console.log('Что то есть', files)

      res.render("files", {
        title: "files",
        breadcrumbs: buildBreadcrumbs(hash, pathParam.join("/")),
        files
      });
    },
    err => next(err)
  );
}


module.exports = function (req, res, next) {
  filesController(req, res, next)
};

module.exports.filesController = filesController;