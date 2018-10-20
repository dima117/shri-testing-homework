const assert = require('assert');
var webdriverio = require('webdriverio');
var options = {
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }, 
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        }
    }
};

describe('Наличие и расположение траниц приложения', () => {
    it('Главная страница присутствует, заголовок соответствует', function () {
        return this.browser
            .url('/')
            .isExisting('.breadcrumbs')
            .then((exist) => {
                assert.ok(exist, 'Заголовок не совпадает или страница отсутствует');
            });
    });

    it('Вложенные файлы отображаются корректно', function () {
        return this.browser
            .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/README.md')
            .isExisting('.file-content')
            .then((exist) => {
                assert.ok(exist, 'Вложенные файлы отображаются с ошибкой');
            });
    });
});


