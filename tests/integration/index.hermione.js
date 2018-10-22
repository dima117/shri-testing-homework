const assert = require('chai').assert;

describe('Корректное отображение основных страниц', function() {
        it('Страниица с комитами', function () {
            return this.browser
                .url('/')
                .isExisting('.container')
                .then((exists)=>{
                    return assert.ok(exists, 'Контейнер с контентом и bc отрисовался')
                })
                .assertView('plain', '.container')
        });
        it('Страниица с конкретным коммитом', function () {
            return this.browser
                .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
                .isExisting('.container')
                .then((exists)=>{
                    return assert.ok(exists, 'Контейнер с контентом и bc отрисовался')
                })
                .assertView('plain', '.container')
        });
        it('Страниица с содержимым файла', function () {
            return this.browser
                .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/app.js')
                .isExisting('.container')
                .then((exists)=>{
                    return assert.ok(exists, 'Контейнер с контентом и bc отрисовался')
                })
                .assertView('plain', '.container')
        })
});

describe('Переходы по страницам', function() {
    const targetCommit = "/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/";
   it('Из списка коммитов на список файлов', function() {
       return this.browser
           .url('/')
           .click(`a[href="${targetCommit}"]`)
           .waitForExist('.container')
           .getUrl()
           .then((url)=>{
               assert.include(url, targetCommit)
           })
           .assertView('plain', '.container')
   });
    it('Из списка файлов во вложенную папку', function() {
        const targetFolder = "bin";
        return this.browser
            .url('/')
            .click(`a[href="${targetCommit}"]`)
            .waitForExist('.container')
            .getUrl()
            .then((url)=>{
                assert.include(url, targetCommit)
            })
            .click(`a[href="${targetCommit + targetFolder}"]`)
            .waitForExist('.container')
            .assertView('plain', '.container')
    });

    it('Из списка файлов на страницу с файлом', function() {
        const targetFile = "/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/package.json";
        return this.browser
            .url('/')
            .click(`a[href="${targetCommit}"]`)
            .waitForExist('.container')
            .getUrl()
            .then((url)=>{
                assert.include(url, targetCommit)
            })
            .click(`a[href="${targetFile}"]`)
            .waitForExist('.container')
            .assertView('plain', '.container')
    });


    it('Переходы по хлебным крошкам', function() {
        const fromPath = `/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/bin/www`;
        return this.browser
            .url(fromPath)
            .waitForExist('.container')
            .click(`.breadcrumbs a:last-of-type`)
            .waitForExist('.container')
            .click(`.breadcrumbs a:last-of-type`)
            .waitForExist('.container')
            .click(`.breadcrumbs a:last-of-type`)
            .waitForExist('.container')
            .assertView('plain', '.container')
    });

});