const { expect } = require('chai');

const HASH = '38429bed94bd7c107c65fed6bffbf443ff0f4183';

describe('Главная страница', () => {
  it('должны появиться "хлебные крошки"', function() {
    return this.browser
      .url('/')
      .getText('.breadcrumbs')
      .then(heading => {
        expect(heading).to.equal('HISTORY');
      })
      .assertView('plain', '.breadcrumbs');
  });

  it('должны появиться коммиты', function() {
    return this.browser
      .url('/')
      .isExisting('.commit')
      .then(exists => {
        expect(exists).to.be.true;
      })
      .assertView('plain', '.commit:last-child');
  });
});

describe('Страница коммита/директории', () => {
  it('должны появиться "хлебные крошки"', function() {
    return this.browser
      .url(`/files/${HASH}/`)
      .getText('.breadcrumbs')
      .then(heading => {
        expect(heading).to.equal('HISTORY / ROOT');
      })
      .assertView('plain', '.breadcrumbs');
  });

  it('должно появиться содержимое файловой системы', function() {
    return this.browser
      .url(`/files/${HASH}/`)
      .isExisting('.content')
      .then(exists => {
        expect(exists).to.be.true;
      })
      .assertView('plain', '.content');
  });
});

describe('Страница файла', () => {
  it('должны появиться "хлебные крошки"', function() {
    return this.browser
      .url(`/content/${HASH}/bin/www/`)
      .getText('.breadcrumbs')
      .then(heading => {
        expect(heading).to.equal('HISTORY / ROOT / bin / www');
      })
      .assertView('plain', '.breadcrumbs');
  });

  it('должно появиться содержимое файла', function() {
    return this.browser
      .url(`/content/${HASH}/bin/www/`)
      .waitForExist('.file-content', 2000)
      .then(exists => {
        expect(exists).to.be.true;
      })
      .assertView('plain', '.file-content');
  });
});

describe('Переходы по ссылкам', () => {
  it('переход из списка коммитов в список файлов', function() {
    return this.browser
      .url('/')
      .waitForExist('.commit:last-child')
      .click('.commit:last-child .commit__link a')
      .waitForExist('.content')
      .getUrl()
      .then(url => {
        expect(url).to.include('files');
        expect(url).to.include(HASH);
      });
  });

  it('переход из списка файлов во вложенную папку', function() {
    return this.browser
      .url(`/files/${HASH}/`)
      .waitForExist('.content')
      .click('.content ul li:nth-child(3) a')
      .waitForExist('.content')
      .getUrl()
      .then(url => {
        expect(url).to.include('files');
        expect(url).to.include(HASH);
        expect(url).to.include('bin');
      });
  });

  it('переход из списка файлов в файл', function() {
    return this.browser
      .url(`/files/${HASH}/bin/`)
      .waitForExist('.content')
      .click('.content ul li:first-child a')
      .waitForExist('.file-content')
      .getUrl()
      .then(url => {
        expect(url).to.include('content');
        expect(url).to.include(HASH);
        expect(url).to.include('bin');
      });
  });
});

describe('Переходы по "хлебным крошкам', () => {
  it('переход на историю коммитов', function() {
    return this.browser
      .url(`/content/${HASH}/bin/www/`)
      .waitForExist('.content')
      .click('.breadcrumbs a:first-child')
      .waitForExist('.content')
      .getUrl()
      .then(url => {
        expect(url).to.equal('http://0.0.0.0:3000/')
      });
  });

  it('переход на корень репозитория', function() {
    return this.browser
      .url(`/content/${HASH}/bin/www/`)
      .waitForExist('.content')
      .click('.breadcrumbs a:nth-child(2)')
      .waitForExist('.content')
      .getUrl()
      .then(url => {
        expect(url).to.include('files');
        expect(url).to.include(HASH);
      });
  });

  it('переход на в папку', function() {
    return this.browser
      .url(`/content/${HASH}/bin/www/`)
      .waitForExist('.content')
      .click('.breadcrumbs a:last-child')
      .waitForExist('.content')
      .getUrl()
      .then(url => {
        expect(url).to.include('files');
        expect(url).to.include(HASH);
        expect(url).to.include('bin')
      });
  });
});
