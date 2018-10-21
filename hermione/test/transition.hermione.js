const { expect } = require('chai');

const homeUrl = 'http://localhost:3000/';

describe('Routes transitions', function() {
  it('should go from list of commits to list of files', function() {
    const hash = '4104d1e02d19759f456c831fc16c5617a5b2584a';
    return this.browser
      .url('/')
      .click(`#hash-${hash}`)
      .getUrl()
      .then(url => {
        expect(url).to.eq(`${homeUrl}files/${hash}/`);
      });
  });

  it('should go from list of files to nested folder', function() {
    const hash = '4104d1e02d19759f456c831fc16c5617a5b2584a';
    const name = 'components';
    return this.browser
      .url(`/files/${hash}/`)
      .click(`#file-${name}`)
      .getUrl()
      .then(url => {
        expect(url).to.eq(`${homeUrl}files/${hash}/${name}`);
      });
  });

  it('should go from list of files to file', function() {
    const hash = '4104d1e02d19759f456c831fc16c5617a5b2584a';
    const name = 'yarn.lock';
    const escapedName = name.replace(/\./g, '\\.');
    return this.browser
      .url(`/files/${hash}/`)
      .click(`#file-${escapedName}`)
      .getUrl()
      .then(url => {
        expect(url).to.eq(`${homeUrl}content/${hash}/${name}`);
      });
  });
});
