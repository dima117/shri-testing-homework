const Git = require('../utils/git');
const Navigation = require('../utils/navigation');

module.exports = async (req, res, next) => {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  try {
    const files = await Git.gitFileTree(hash, path.join('/'));
    const file = Array.isArray(files) && files[0] || files;
    if (file && file.type === 'blob') {
      const content = await Git.gitFileContent(file.hash);
      if (content) {
        res.render('content', {
          title: 'content',
          breadcrumbs: Navigation.buildBreadcrumbs(hash, path.join('/')),
          content
        });
      } else {
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};
