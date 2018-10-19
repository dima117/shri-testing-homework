const expect = require('chai').expect;

describe('Links', function() {
  describe('commit list links', function() {
    it('when clicked leads to files page', function() {
        return this.browser.traverseLink({
          fromUrl: '/',
          linkEl: '.commit__link a',
          toUrl: '/files/999bfb1ec309158f4c86edee76fa5630a3aba565/',
          waitForEl: '.content ul'
        });
    });
  });

  describe('files links', function() {
    it('when folder clicked leads to subfolder page', function() {
        return this.browser.traverseLink({
          fromUrl: '/files/999bfb1ec309158f4c86edee76fa5630a3aba565/',
          linkEl: 'a[href="/files/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers"]',
          toUrl: '/files/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers',
          waitForEl: '.content ul'
        });
    });

    it('when file clicked leads to file page', function() {
        return this.browser.traverseLink({
          fromUrl: '/files/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers',
          linkEl: 'a[href="/content/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers/contentController.js"]',
          toUrl: '/content/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers/contentController.js',
          waitForEl: '.file-content'
        });
    });
  });

  describe('breadcrumbs', function() {
    describe('when on history page', function() {
      it('there are no links', function() {
        return this.browser.url('/')
                .element('.breadcrumbs a')
                .then(err => {
                  expect(err.type).to.equal('NoSuchElement');
                });
      });
    });

    describe('when on directory page', function() {
      it('history link leads to history page', function() {
        return this.browser.traverseLink({
          fromUrl: '/files/999bfb1ec309158f4c86edee76fa5630a3aba565/',
          linkEl: '.breadcrumbs a[href="/"]',
          toUrl: '/',
          waitForEl: '.commit'
        });
      });
    });

    describe('when on file page', function() {
      it('history link leads to history page', function() {
        return this.browser.traverseLink({
          fromUrl: '/content/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers/indexController.js',
          linkEl: '.breadcrumbs a[href="/"]',
          toUrl: '/',
          waitForEl: '.commit'
        });
      });

      it('ROOT link leads to filesystem root page', function() {
        return this.browser.traverseLink({
          fromUrl: '/content/999bfb1ec309158f4c86edee76fa5630a3aba565/controllers/indexController.js',
          linkEl: '.breadcrumbs a[href="/files/999bfb1ec309158f4c86edee76fa5630a3aba565/"]',
          toUrl: '/files/999bfb1ec309158f4c86edee76fa5630a3aba565/',
          waitForEl: '.content ul'
        });
      });
    });
  });
});