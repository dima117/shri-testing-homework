const assert = require('assert');

describe('when we in the .gitignore content page', () => {
  it('then to breadcrumbs should be added / .gitignore', function () {
    return this.browser
      .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/.gitignore')
      .getText('.breadcrumbs')
      .then((title) => {
        assert.equal(title, 'HISTORY / ROOT / .gitignore');
      });
  });

  it('and we see the content of .gitignore file', function () {
    return this.browser
      .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/.gitignore')
      .getText('.content .file-content', false)
      .then((elements) => {
        assert.equal(elements, 'node_modules');
      });
  });
});

