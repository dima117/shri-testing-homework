const GitWorker = require('../utils/git');
const UrlBuilder = require('../utils/navigation');

const urls = new UrlBuilder();

const attachParams = ((item, hash) => {
  return {
    ...item,
    href: urls.buildObjectUrl(hash, item),
    name: item.path.split('/').pop()
  };
});

function filesController(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';
  const gw = new GitWorker();

  return gw.gitFileTree(hash, path).then(
    list => {
      const files = list.map(item => attachParams(item, hash));

      res.render('files', {
        title: 'files',
        breadcrumbs: urls.buildBreadcrumbs(hash, pathParam.join('/')),
        files
      });
    },
    err => next(err)
  );
};

module.exports = {
  filesController,
  attachParams,
}
