const assert = require('assert');

describe('the navigation', () => {
  it('from the list of commits to the file list', function () {
    return this.browser
      .url('/')
      .click('.content .commit:last-child a')
      .getText('.breadcrumbs')
      .then((title) => {
        assert.equal(title, 'HISTORY / ROOT');
      });
  });

  it('from file list to subfolder', function () {
    return this.browser
      .url('/')
      .click('.content .commit:last-child a')
      .click('.content ul li:last-child a')
      .assertView('subfolder', '.container')
      .getText('.breadcrumbs')
      .then((title) => {
        assert.equal(title, 'HISTORY / ROOT / views');
      });
  });

  it('from subfolder to file list', function () {
    return this.browser
      .url('/')
      .click('.content .commit:last-child a')
      .click('.content ul li:last-child a')
      .click('.breadcrumbs a:last-child')
      .getText('.breadcrumbs')
      .then((title) => {
        assert.equal(title, 'HISTORY / ROOT');
      });
  });

  it('from file list to single file page', function () {
    return this.browser
      .url('/')
      .click('.content .commit:last-child a')
      .click('.content ul li:nth-child(6) a')
      .assertView('packagejson', '.container')
      .getText('.breadcrumbs')
      .then((title) => {
        assert.equal(title, 'HISTORY / ROOT / package.json');
      });
  });


  it('from file page to the list of commits', function () {
    return this.browser
      .url('/')
      .click('.content .commit:last-child a')
      .click('.content ul li:nth-child(6) a')
      .click('.breadcrumbs a:first-child')
      .getText('.breadcrumbs')
      .then((title) => {
        assert.equal(title, 'HISTORY');
      });
  });
});
