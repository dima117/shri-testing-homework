const { gitFileContent, gitFileTree } = require('../utils/git');
const { buildBreadcrumbs } = require('../utils/navigation');

module.exports = async function(req, res, next, ...stubs) {
  const _stubs = (stubs && stubs[0]) || {};
  const _gitFileTree = _stubs.gitFileTree || gitFileTree;
  const _gitFileContent = _stubs.gitFileContent || gitFileContent;
  const _buildBreadcrumbs = _stubs.buildBreadcrumbs || buildBreadcrumbs;

  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean).join('/');

  const content = await _gitFileTree(hash, path).then(
    ([file]) => _gitFileContent(file.hash),
    /* istanbul ignore next */
    err => next(err)
  );

  res.render('content', {
    title: 'content',
    breadcrumbs: _buildBreadcrumbs(hash, path),
    content
  });
};
