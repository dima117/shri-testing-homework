let assert = require('chai').assert;

describe('Server response', () => {

    // ВОПРОС get/post запросы через chai-htpp надо тестировать или можно как-то средствами гермионы / WebDriverIO?
    describe('Erorrs', () => {
        it('404', async function () {
            return this.browser
                .url('/not-existing-page')
                .getText('body .container')
                .then( (status) => {
                    assert.ok(status === '404 - Not Found', 'Have not 404 page');
                });
        });

        // Не обрабатывается эта ошибка
        // Когда нету файла - все равно открывается пустой
        /* files/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/not-file
        it('400', async function () {
            return this.browser
                .url('/not-existing-page')
                .getText('body .container')
                .then( (status) => {
                    assert.ok(status === '404 - Not Found', 'Have not 404 page');
                });
        }); */

        it('500', async function () {
            return this.browser
                .url('/content/8e9ad968eeaf9294b3a1d3b5f0821b9d54601776/')
                .getText('body .container')
                .then( (status) => {
                    assert.ok(status.includes('500'), 'Have not 500 erorr page');
                });
        });
    });

});
