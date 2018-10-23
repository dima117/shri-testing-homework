const expect = require('chai').expect;
const pageUrl = '/files/999bfb1ec309158f4c86edee76fa5630a3aba565/';

describe('Files', function() {
  describe('screenshot testing', function() {
    it('has breadcrumbs', function() {
        return this.browser
            .url(pageUrl)
            .assertView('breadcrumbs', '.breadcrumbs');
    });

    it('has file tree', function() {
        return this.browser
          .url(pageUrl)
          .assertView('file tree', '.content');
    });
  });

  describe('position', function() {
    it('renders breadcrumbs in proper location', function() {
      return this.browser.url(pageUrl)
        .expectLocation('.breadcrumbs', { x: 200, y: 28 });
    });

    it('renders file tree in proper location', function() {
      return this.browser.url(pageUrl)
        .expectLocation('.content', { x: 200, y: 88 });
    });
  });
});