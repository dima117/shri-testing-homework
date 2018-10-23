const { gitHistory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

module.exports = async function(req, res, next, ...stubs) {
  const _stubs = (stubs && stubs[0]) || {};
  const _gitHistory = _stubs.gitHistory || gitHistory;
  const _buildFolderUrl = _stubs.buildFolderUrl || buildFolderUrl;
  const _buildBreadcrumbs = _stubs.buildBreadcrumbs || buildBreadcrumbs;

  const list = await _gitHistory(1, 20).then(
    history => {
      return history.map(item => ({
        ...item,
        href: _buildFolderUrl(item.hash, '')
      }));
    },
    /* istanbul ignore next */
    err => next(err)
  );

  res.render('index', {
    title: 'history',
    breadcrumbs: _buildBreadcrumbs(),
    list
  });
};
