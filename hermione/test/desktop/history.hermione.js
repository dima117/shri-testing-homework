const expect = require('chai').expect;

describe('History', function() {
  describe('screenshot testing', function() {
    it('has breadcrumbs', function() {
        return this.browser
            .url('/')
            .assertView('breadcrumbs', '.breadcrumbs');
    });

    it('has commits', function() {
        return this.browser
          .url('/')
          .assertView('commit list', '.content');
    });
  });

  describe('position', function() {
    it('renders breadcrumbs in proper location', function() {
      return this.browser.url('/')
        .expectLocation('.breadcrumbs', { x: 200, y: 28 });
    });

    it('renders commits list in proper location', function() {
      return this.browser.url('/')
        .expectLocation('.content', { x: 200, y: 88 });
    });
  });
});