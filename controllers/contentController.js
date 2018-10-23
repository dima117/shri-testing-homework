const { Git } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

class ContentController {
  constructor() {
    this.git = new Git();
  }

  async getContent(hash, path) {
    const file = (await this.git.gitFileTree(hash, path.join('/')))[0];
    let content;

    console.log(path);
    if (file && file.type === 'blob') {
      content = await this.git.gitFileContent(file.hash);
    }
    console.log(content)

    return content;
  }

  render(req, res, next) {
    const { hash } = req.params;
    const path = req.params[0].split('/').filter(Boolean);

    this.getContent(hash, path)
      .then(content => {
          if (content) {
            res.render('content', {
              title: 'content',
              breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
              content
            });
          } else {
            next();
          }
        },
        err => next(err)
      );
  }
}

module.exports = {
  ContentController
};