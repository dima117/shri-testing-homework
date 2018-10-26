const { gitHistory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

const getRenderParams = history => {
  const list = history.map(item => ({
    ...item,
    href: buildFolderUrl(item.hash, '')
  }));

  return {
    title: 'history',
    breadcrumbs: buildBreadcrumbs(),
    list
  };
};

const renderIndex = (req, res) => {
  gitHistory(1, 20).then(
    history => res.render('index', getRenderParams(history)),
    err => next(err)
  );
};

module.exports = {
  getRenderParams,
  renderIndex
};
