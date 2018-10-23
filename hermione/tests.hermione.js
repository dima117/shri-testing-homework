const assert = require('chai').assert;

describe('На всех страницах правильно отображается их содержимое', () => {
   it('Правильно отображается содержимое страницы истории коммитов', function () {
      return this.browser
          .url('/')
          .assertView('plain', '.container')
   });

   it('Правильно отображается содержимое страницы файловой системы коммита', function () {
       return this.browser
           .url('/')
           .click('.commit__link a')
           .assertView('container', '.container');
   });

   it('Правильно отображается содержимое страницы файла коммита', function () {
       return this.browser
           .url('/')
           .click('.commit__link a')
           .click('.content ul li:last-of-type a')
           .assertView('container', '.container');
   });
});

describe('Правильно работают переходы по страницам', () => {
    it('Переход из истории коммитов на список файлов коммита', function () {
        return this.browser
            .url('/')
            .getText('.commit__link a')
            .then(async (text) => {
                await this.browser
                    .click('.commit__link a')
                    .getUrl()
                    .then((url) => {
                        assert.ok(
                            `${text[0]}` === `${url.split('/')[4]}`
                        )
                    })
            })
    });

    it('Переход из списка файлов коммита во вложенную папку', function() {
        return this.browser
            .url('/')
            .getText('.commit__link a')
            .then(async () => {
                await this.browser
                    .click('.commit__link a')
                    .getText('.content ul li a')
                    .then(async (textDir) => {
                        await this.browser
                            .click('.content ul li a')
                            .getUrl()
                            .then((url) => {
                                assert.ok(
                                    `${textDir[0]}` === `${url.split('/')[5]}`
                                )
                            })
                    })
            })
    });

    it('Переход из списка файлов коммита на страницу отдельного файла', function() {
        return this.browser
            .url('/')
            .getText('.commit__link a')
            .then(async (commitHash) => {
                await this.browser
                    .click('.commit__link a')
                    .getText('.content ul li:last-of-type a')
                    .then(async (textFile) => {
                        await this.browser
                            .click('.content ul li:last-of-type a')
                            .getUrl()
                            .then((url) => {
                                assert.ok(
                                    `${textFile}` === `${url.split('/')[5]}` &&
                                    `${commitHash[0]}` === `${url.split('/')[4]}` &&
                                    'content' === `${url.split('/')[3]}`
                                )
                            })
                    })
            })
    });

    describe('Правильно работают переходы по хлебным крошкам', function () {
        it('Переход из списка файлов коммита на историю коммитов', function () {
            return this.browser
                .url('/')
                .click('.commit__link a')
                .click('.breadcrumbs a:first-of-type')
                .getUrl()
                .then((url) => {
                    assert.ok(
                        url.split('/')[3] === ''
                    )
                })
        })

        it('Переход из директории в коммите в корневую директорию коммита', function () {
            return this.browser
                .url('/')
                .click('.commit__link a')
                .click('.content ul li a')
                .click('.breadcrumbs a:nth-of-type(2)')
                .getUrl()
                .then((url) => {
                    assert.ok(
                        url.split('/')[5] === '' &&
                        url.split('/')[3] === 'files'
                    )
                })
        })

        it('Переход из директории в коммите в историю коммитов', function () {
            return this.browser
                .url('/')
                .click('.commit__link a')
                .click('.content ul li a')
                .click('.breadcrumbs a:nth-of-type(1)')
                .getUrl()
                .then((url) => {
                    assert.ok(
                        url.split('/')[3] === ''
                    )
                })
        })

        it('Переход из файла в коммите в корневую директорию коммита', function () {
            return this.browser
                .url('/')
                .click('.commit__link a')
                .click('.content ul li a')
                .click('.content ul li:last-of-type a')
                .click('.breadcrumbs a:nth-of-type(2)')
                .getUrl()
                .then((url) => {
                    assert.ok(
                        url.split('/')[5] === '' &&
                        url.split('/')[3] === 'files'
                    )
                })
        })

        it('Переход из файла в коммите в историю коммитов', function () {
            return this.browser
                .url('/')
                .click('.commit__link a')
                .click('.content ul li a')
                .click('.content ul li:last-of-type a')
                .click('.breadcrumbs a:nth-of-type(1)')
                .getUrl()
                .then((url) => {
                    assert.ok(
                        url.split('/')[3] === ''
                    )
                })
        })

        it('Переход из файла в коммите в директорию, в которой лежит этот файл', function () {
            return this.browser
                .url('/')
                .click('.commit__link a')
                .click('.content ul li a')
                .click('.content ul li:last-of-type a')
                .click('.breadcrumbs a:nth-last-child(1)')
                .getUrl()
                .then((url) => {
                    assert.ok(
                        url.split('/')[5] === 'somedir'
                    )
                })
        })
    });
});
