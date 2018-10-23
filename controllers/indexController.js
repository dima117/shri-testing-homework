const { gitHistory } = require("../utils/git");
const { buildFolderUrl, buildBreadcrumbs } = require("../utils/navigation");

module.exports = function(req, res, next, gitHstrStub, bfuStub, bbcStub) {
  return (gitHstrStub || gitHistory)(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: (bfuStub || buildFolderUrl)(item.hash, "")
      }));

      res.render("index", {
        title: "history",
        breadcrumbs: (bbcStub || buildBreadcrumbs)(),
        list
      });
    },
    err => next(err)
  );
};
