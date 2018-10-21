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

async function getFileTree(hash, path) {
  const list = await gitFileTree(hash, path);
  const files = list.map(item => ({
    ...item,
    href: buildObjectUrl(hash, item),
    name: item.path.split("/").pop()
  }));
  return files;
}

function filesController(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || "").split("/").filter(Boolean);

  const path = pathParam.length ? pathParam.join("/") + "/" : "";
console.log(path);
  getFileTree(hash, path).then(
    files => {
      console.log(pathParam);
      res.render("files", {
        title: "files",
        breadcrumbs: buildBreadcrumbs(hash, pathParam.join("/")),
        files
      });
    },
    err => next(err)
  );
}

module.exports = {
  filesController,
  getFileTree
};
