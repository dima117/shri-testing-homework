const expect = require('chai').expect;
const pageUrl = '/content/999bfb1ec309158f4c86edee76fa5630a3aba565/README.md';

describe('File', function() {
  describe('screenshot testing', function() {
    it('has breadcrumbs', function() {
        return this.browser
            .url(pageUrl)
            .assertView('breadcrumbs', '.breadcrumbs');
    });

    it('has file tree', function() {
        return this.browser
          .url(pageUrl)
          .assertView('file content', '.content');
    });
  });

  describe('position', function() {
    it('renders breadcrumbs in proper location', function() {
      return this.browser.url(pageUrl)
        .expectLocation('.breadcrumbs', { x: 200, y: 28 });
    });

    it('renders file content in proper location', function() {
      return this.browser.url(pageUrl)
        .expectLocation('.content', { x: 200, y: 88 });
    });
  });
});