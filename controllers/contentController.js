const { UtilGit } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

const utilGit = new UtilGit();


function insideProc(content, hash, path, res) {
  res.render('content', {
  title: 'content',
  breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
  content
  });
}

module.exports.insideProc = insideProc;
module.exports.rout = function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  utilGit.gitFileTree(hash, path.join('/'))
    .then(function([file]) {
      if (file && file.type === 'blob') {
        return utilGit.gitFileContent(file.hash);
      }
    })
    .then(
      content => {
        if (content) {
          insideProc(content, hash, path, res);
        } else {
          next();
        }
      },
      err => next(err)
    );
};
// ВОПОРОС: нужно было сдлеать такой рефакторинг что бы можно было протестить каждую ветку then if?
