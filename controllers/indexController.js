const { gitHistory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

// переписал на async/await что бы можно было протестировать значение из gitHistory после map
// и добавил необязательный аргумент для заглушки
module.exports = async function(req, res, next, ...stubs) {
  const getHistory = stubs[0] ? stubs[0] : gitHistory

  const list = await getHistory(1, 20).then(
    history => {
      return history.map(item => ({
        ...item,
        href: buildFolderUrl(item.hash, '')
      }));
    },
    err => next(err)
  );

  res.render('index', {
    title: 'history',
    breadcrumbs: buildBreadcrumbs(),
    list
  });
};
