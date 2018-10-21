const { expect } = require('chai');

const homeUrl = 'http://localhost:3000/';

describe('Routes transitions', function() {
  it('should go to the history page from any file', function() {
    const hash = '4104d1e02d19759f456c831fc16c5617a5b2584a';
    const name = 'LICENSE';

    return this.browser
      .url(`/content/${hash}/${name}`)
      .click(`.breadcrumbs > a:nth-child(1)`)
      .getUrl()
      .then(url => {
        expect(url).to.eq(homeUrl);
      });
  });

  it('should go to the history page from any folder', function() {
    const hash = '4104d1e02d19759f456c831fc16c5617a5b2584a';
    const name = 'components';

    return this.browser
      .url(`/files/${hash}/${name}`)
      .click(`.breadcrumbs > a:nth-child(1)`)
      .getUrl()
      .then(url => {
        expect(url).to.eq(homeUrl);
      });
  });

  it('should go to the root page from any file', function() {
    const hash = '4104d1e02d19759f456c831fc16c5617a5b2584a';
    const name = 'LICENSE';

    return this.browser
      .url(`/content/${hash}/${name}`)
      .click(`.breadcrumbs > a:nth-child(2)`)
      .getUrl()
      .then(url => {
        expect(url).to.eq(`${homeUrl}files/${hash}/`);
      });
  });

  it('should go to the root page from any folder', function() {
    const hash = '4104d1e02d19759f456c831fc16c5617a5b2584a';
    const name = 'components';

    return this.browser
      .url(`/files/${hash}/${name}`)
      .click(`.breadcrumbs > a:nth-child(2)`)
      .getUrl()
      .then(url => {
        expect(url).to.eq(`${homeUrl}files/${hash}/`);
      });
  });
});
