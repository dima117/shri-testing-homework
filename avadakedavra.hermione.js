const assert = require('assert');
// const webdriverio = require('webdriverio');
// const options = {
//     browsers: {
//         chrome: {
//             desiredCapabilities: {
//                 browserName: 'chrome'
//             }
//         },
//         firefox: {
//             desiredCapabilities: {
//                 browserName: 'firefox'
//             }
//         }
//     }
// };

describe('Наличие и расположение траниц приложения', () => {
    it('Главная страница присутствует, заголовок соответствует', function () {
        return this.browser
            .url('/')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY', 'Заголовок не совпадает или страница отсутствует');
            });
    }); 

    it('Страница коммита присутствует и заголовок соответствует', function () {
        return this.browser
            .url('/files/7e013ae0440ad6e91082599376a6aaebe20d2112')
            .getText('.breadcrumbs')
            .then((text) => {
                assert.equal(text, 'HISTORY/ROOT', 'Заголовок не совпадает или страница отсутствует');
            });
    }); 
});


describe('Наличие и отображение файлов', () => { 
    it('Файлы README присутствует', function () {
        return this.browser
            .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/README.md')
            .isExisting('.file-content')
            .then((exist) => {
                assert.ok(exist, 'Вложенные файлы отображаются с ошибкой');
            });
    });
});
