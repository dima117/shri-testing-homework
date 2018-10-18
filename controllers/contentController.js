const GitCommands = require('../utils/git');
const { prepareContent } = require('../utils/page-preparation');

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  GitCommands.gitFileTree(hash, path.join('/'))
    .then(function([file]) {
      if (file && file.type === 'blob') {
        return GitCommands.gitFileContent(file.hash);
      }
    })
    .then(
      content => {
        if (content) {
          res.render('content', prepareContent(content, hash, path));
        } else {
          next();
        }
      },
      err => next(err)
    );
};
