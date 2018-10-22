const assert = require('assert'),
    expect = require('chai').expect;


describe('На всех страницах правильно отображается их содержимое:', () => {
    it('история коммитов', function () {
        return this.browser
            .url('/')
            .isExisting('.commit')
            .then((exists) => {
                assert.ok(exists, 'Коммиты не отображаются!');
            });

    });
    it('просмотр файловой системы', function () {
        return this.browser
            .url('/files/1dca9032cbf1c6b10af7b08adc1fe18c5e4d3312/')
            .isExisting('.content') // Fix
            .then((exists) => {
                assert.ok(exists, 'Содержимое директории не отображается!');
            });
    });
    it('просмотр содержимого файла', function () {
        return this.browser
            .url('/content/1dca9032cbf1c6b10af7b08adc1fe18c5e4d3312/.hermione.conf.js')
            .isExisting('.file-content')
            .then((exists) => {
                assert.ok(exists, 'Содержимое файла не отображается!');
            });
    });
});


describe('Правильно работают переходы по страницам', () => {
   it('из списка коммитов на список файлов', function () {
       return this.browser
           .url('/')
           .$('.content .commit .commit__link a')
           .click()
           .getTitle().then(function(title) {
               expect(title).to.be.equal('files');
           });
   });

    it('из списка файлов во вложенную папку', function () {
        return this.browser
            .url('/')
            .$('.content .commit .commit__link a')
            .click()
            .$('//div[@class=\'content\']/ul/li/a[contains(text(), \'controllers\')]')
            .click()
            .getText('.breadcrumbs').then(function(crumb) {
                expect(crumb).to.include('controllers');
            });
    });

    it('из списка файлов на страницу отдельного файла', function () {
        return this.browser
            .url('/')
            .$('.content .commit .commit__link a')
            .click()
            .$('//div[@class=\'content\']/ul/li/a[contains(text(), \'.gitignore\')]')
            .click()
            .$('.file-content')
            .getText().then(function(text) {
                expect(text).to.include('node_modules');
            });
    });

    it('переходы по хлебным крошкам', function () {
        return this.browser
            .url('/')
            .$('.content .commit .commit__link a')
            .click()
            .$('.breadcrumbs a')
            .click()
            .getTitle().then(function(title) {
                expect(title).to.be.equal('history');
            });
    });
});
