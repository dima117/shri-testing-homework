const { Git } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');


// class IndexController {
//   constructor(req, res) {
//     this.git = new Git();
//
//     this.buildHistory(req, res);
//   }
//
//   buildHistory(req, res) {
//     this.git.gitHistory(1, 20).then(
//       history => {
//         const list = history.map(item => ({
//           ...item,
//           href: buildFolderUrl(item.hash, '')
//         }));
//
//         console.log(list);
//         res.render('index', {
//           title: 'history',
//           breadcrumbs: buildBreadcrumbs(),
//           list
//         });
//       },
//       err => next(err)
//     );
//   }
//
// }
//
//
// module.exports = {
//   IndexController
// };


module.exports = function(req, res) {
  const git = new Git();

  git.gitHistory(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: buildFolderUrl(item.hash, '')
      }));

      res.render('index', {
        title: 'history',
        breadcrumbs: buildBreadcrumbs(),
        list
      });
    },
    err => next(err)
  );
};
