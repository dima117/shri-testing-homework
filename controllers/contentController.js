const { gitFileContent, gitFileTree } = require("../utils/git");
const { buildBreadcrumbs } = require("../utils/navigation");

async function getFileContent(hash, path) {
  const file = (await gitFileTree(hash, path.join("/")))[0];
  let result;
  if (file && file.type === "blob") {
    try {
      result = await gitFileContent(file.hash);
    } catch (err) {
      result = err;
    }
  }
  return result;
}

function contentController(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split("/").filter(Boolean);

  getFileContent(hash, path).then(
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

module.exports = {
  contentController,
  getFileContent
};
