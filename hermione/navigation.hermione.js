const {expect} = require('chai');

describe('Правильно работают переходы по страницам', () => {
  it('Из списка коммитов на список файлов', function() {
    let breadcrumbsTexts;

    return this.browser
      .url('/')
      .click('[data-smid=commit-link]')
      .getText('[data-smid=breadcrumbs-title]')
      .then((text) => {
        expect(text).to.equal('HISTORY / ROOT');
      })
  });

  it('из списка файлов во вложенную папку', function() {
    let links;

    return this.browser
      .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
      .getText('[data-smid=tree-link]')
      .then((text) => {
        links = text;
        console.log(links);
      })
      .click('[data-smid=tree-link]')
      .getText('[data-smid=breadcrumbs-title]')
      .then((text) => {
        expect(text).to.equal(`HISTORY / ROOT / ${links[0]}`);
      })
  });

  it('из списка файлов на страницу отдельного файла', function() {
    let links;
    return this.browser
      .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
      .getText('[data-smid=blob-link]')
      .then((text) => {
        links = text;
      })
      .click('[data-smid=blob-link]')
      .getText('[data-smid=breadcrumbs-title]')
      .then((text) => {
        expect(text).to.equal(`HISTORY / ROOT / ${links[0]}`);
      })
  });

  describe('Переходы по хлебным крошкам', () => {
    it('Из списка файлов к списоку коммитов', function() {
      return this.browser
        .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
        .click('[data-smid=breadcrumbs-link]:first-of-type')
        .getText('[data-smid=breadcrumbs-title]')
        .then((text) => {
          expect(text).to.equal('HISTORY');
        })
    });

    it('Из вложенной папки в корневую папку', function() {
      return this.browser
        .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/public')
        .click('[data-smid=breadcrumbs-link]:nth-of-type(2)')
        .getText('[data-smid=breadcrumbs-title]')
        .then((text) => {
          expect(text).to.equal('HISTORY / ROOT');
        })
    });

    it('Из вложенной папки на главную', function() {
      return this.browser
        .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/public')
        .click('[data-smid=breadcrumbs-link]:first-of-type')
        .getText('[data-smid=breadcrumbs-title]')
        .then((text) => {
          expect(text).to.equal('HISTORY');
        })
    });

    it('Из файла в родительскую папку', function() {
      let breadcrumbsText;
  
      return this.browser
        .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/public/styles.css')
        .getText('[data-smid=breadcrumbs-title]')
        .then((text) => {
          breadcrumbsText = text;
        })
        .click('[data-smid=breadcrumbs-link]:last-of-type')
        .getText('[data-smid=breadcrumbs-title]')
        .then((text) => {
          const breadcrumbsResult = breadcrumbsText.split(' / ');
          const result = breadcrumbsResult.slice(0, breadcrumbsResult.length - 1).join(' / ');
          expect(text).to.equal(result);
        })
    });

    it('Из файла в корневую папку', function() {
      return this.browser
        .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/public/styles.css')
        .click('[data-smid=breadcrumbs-link]:nth-of-type(2)')
        .getText('[data-smid=breadcrumbs-title]')
        .then((text) => {
          expect(text).to.equal('HISTORY / ROOT');
        })
    });

    it('Из файла к списоку коммитов', function() {
      return this.browser
        .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/public/styles.css')
        .click('[data-smid=breadcrumbs-link]:first-of-type')
        .getText('[data-smid=breadcrumbs-title]')
        .then((text) => {
          expect(text).to.equal('HISTORY');
        })
    });
  });
});
