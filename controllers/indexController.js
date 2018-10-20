const { gitHistory } = require("../utils/git");
const { buildFolderUrl, buildBreadcrumbs } = require("../utils/navigation");

async function getIndexList(page, size) {
  const history = await gitHistory(page, size);
  const list = history.map(item => ({
    ...item,
    href: buildFolderUrl(item.hash, "")
  }));
  return list;
}

function indexController(req, res) {
  getIndexList(1, 20).then(
    list => {
      res.render("index", {
        title: "history",
        breadcrumbs: buildBreadcrumbs(),
        list
      });
    },
    err => next(err)
  );
}

module.exports = {
  indexController,
  getIndexList
};
