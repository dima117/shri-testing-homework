const assert = require('assert');

describe ( 'Page content is load', () => {
  it ('should show history', function() {
    return this.browser
      .url('/')
      .assertView('plain', 'body', {ignoreElements: ['.content']});
  });

  it ('should show folder => list', function() {
    return this.browser
      .url('/')
      .click('a[href*=files]')
      .assertView('plain', 'body', {ignoreElements: ['.content']});
  });

  it ('should show inner folder', function() {
    return this.browser
      .url('/')
      .click('a[href*=files]')
      .click('a[href*=files]')
      .assertView('plain', 'body', {ignoreElements: ['.content', '.breadcrumbs a:nth-child(n+3)',  '.breadcrumbs span']});
  });

  it ('should show file', function() {
    return this.browser
      .url('/')
      .click('a[href*=files]')
      .click('a[href*=files]')
      .click('a[href*=content]')
      .assertView('plain', 'body', {ignoreElements: ['.content', '.breadcrumbs a:nth-child(n+3)',  '.breadcrumbs span']});
  });
});

describe ( 'should load page page navigation', () => {
  it ('should show commit to list files', function() {
    return this.browser
      .url('/')
      .click('a[href*=files]')
      .assertExists('.content', 'missing content');
  });

  it ('should load page files to folder', function() {
    return this.browser
      .url('/')
      .click('a[href*=files]')
      .click('a[href*=files]')
      .assertExists('.content', 'missing content');
  });

  it ('should load page folder to file', function() {
    return this.browser
      .url('/')
      .click('a[href*=files]')
      .click('a[href*=content]')
      .assertExists('.file-content', 'missing content');
  });

  it ('breadcrumbs', function() {
    return this.browser
      .url('/')
      .click('a[href*=files]')
      .click('a[href*=files]')
      .click('a[href*=content]')
      .click('.breadcrumbs > a:nth-child(3)')
      .click('.breadcrumbs > a:nth-child(2)')
      .click('.breadcrumbs > a:nth-child(1)')
      .assertExists('.content', 'missing content');
  });
});
