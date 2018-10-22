const Git = require('../utils/git');
const Navigation = require('../utils/navigation');

module.exports = async (req, res, next) => {
  let history;
  try {
    history = await Git.gitHistory(1, 20);
  } catch (err) {
    next(err);
    return;
  }
  const list = history.map(item => ({
    ...item,
    href: Navigation.buildFolderUrl(item.hash, '')
  }));

  res.render('index', {
    title: 'history',
    breadcrumbs: Navigation.buildBreadcrumbs(),
    list
  });
};
