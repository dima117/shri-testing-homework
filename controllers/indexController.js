const { gitHistory } = require('../utils/git');
const { buildFolderUrl, getBreadcrumbs } = require('../utils/navigation');

/**
 * Renders index page.
 * @param {Object} req
 * @param {Object} res
 */
function indexController(req, res) {
  gitHistory(1, 20).then(history => {
    const list = history.map(item => ({
      ...item,
      href: buildFolderUrl(item.hash, '')
    }));

    res.render('index', {
      title: 'history',
      breadcrumbs: getBreadcrumbs(),
      list
    });
  },
  err => next(err));
}

module.exports = indexController;
