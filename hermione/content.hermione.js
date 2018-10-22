const {expect} = require('chai');

describe('Правильно отображается файловая система коммита', () => {
  it('Главная со списком коммитов', function() {
    return this.browser
      .url('/')
      .assertView('main-page', '[data-smid="index-content"]')
  });
  it('Корневая папка', function() {
    return this.browser
      .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
      .isExisting('[data-smid=files-content]')
      .then((exists) => {
        expect(exists).to.be.true;
      })
      .assertView('files-content-root', '[data-smid="files-content"]')
  });

  it('Внутри папки', function() {
    return this.browser
      .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/public')
      .isExisting('[data-smid=files-content]')
      .then((exists) => {
        expect(exists).to.be.true;
      })
      .assertView('files-content-dir', '[data-smid="files-content"]')
  });

  it('Содержиме файла', function() {
    return this.browser
      .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/public/styles.css')
      .isExisting('[data-smid=commit-content]')
      .then((exists) => {
        expect(exists).to.be.true;
      })
      .assertView('commit-content', '[data-smid="commit-content"]')
  });
});
