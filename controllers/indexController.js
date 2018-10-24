const { gitHistory } = require("../utils/git");
const { buildFolderUrl, buildBreadcrumbs } = require("../utils/navigation");

module.exports = function(req, res, next, ...rest) {
  const stubs = (rest && rest[0]) || {};
  const _gitHistory = stubs.gitHistory || gitHistory;
  const _buildFolderUrl = stubs.buildFolderUrl || buildFolderUrl;
  const _buildBreadcrumbs = stubs.buildBreadcrumbs || buildBreadcrumbs;

  return _gitHistory(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: _buildFolderUrl(item.hash, "")
      }));

      res.render("index", {
        title: "history",
        breadcrumbs: _buildBreadcrumbs(),
        list
      });
    },
    err => next(err)
  );
};
