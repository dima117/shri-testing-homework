const { gitFileTree } = require('../utils/git');
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require('../utils/navigation');

module.exports = function(req, res, next) {
  const { hash } = req ? req.params : '';
  const pathParam = req ? (req.params[0] || '').split('/').filter(Boolean) : '';

  const path = pathParam && pathParam.length ? pathParam.join('/') + '/' : '';

  this.gitFileTree = gitFileTree;
  this.buildFolderUrl = buildFolderUrl;
  this.buildFileUrl = buildFileUrl;
  this.buildBreadcrumb = buildBreadcrumbs;

  this.buildObjectUrl = (parentHash, { path, type }) => {
    switch (type) {
      case 'tree':
        return this.buildFolderUrl(parentHash, path);
      case 'blob':
        return this.buildFileUrl(parentHash, path);
      default:
        return '#';
    }
  }

  this.buildRenderData = () => {
    return new Promise((res) => {
      this.gitFileTree(hash, path).then(
        list => {
          const files = list.map(item => ({
            ...item,
            href: this.buildObjectUrl(hash, item),
            name: item.path.split('/').pop()
          }));

          thisPathParam = pathParam && pathParam.length ? pathParam.join('/') : '';

          res({
            title: 'files',
            breadcrumbs: this.buildBreadcrumb(hash, thisPathParam),
            files
          });
        },
        err => next(err)
      );
    });
  }

  if (req && res) {
    this.buildRenderData(hash, path).then(data => {
      if (data && res) {
        res.render('files', data);
      } else {
        next();
      }
    },
    err => next(err));
  }
};
