const { gitFileContent, gitFileTree } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

// переписал на async/await что бы можно было подождать значение content
// и добавил необязательный аргумент для заглушек
module.exports = async function(req, res, next, ...stubs) {

  const getFileTree = stubs[0] ? stubs[0] : gitFileTree;
  const getFileContent = stubs[1] ? stubs[1] : gitFileContent;

  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  const content = await getFileTree(hash, path.join('/')).then(
    ([file]) => {
      if (file && file.type === 'blob') {
        return getFileContent(file.hash);
      }
    },
    err => next(err)
  );

  if (content) {
    res.render('content', {
      title: 'content',
      breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
      content
    });
  } else {
    next();
  }
};
