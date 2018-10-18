const assert = require('assert');


describe('Конвертер валют', () => {
    it('Должен появиться на странице', function () {
        return this.browser
            .url('/')
            .keys(['котики', '\uE007'])
            .isExisting('.converter-form')
            .then((exists) => {
                assert.ok(exists, 'Конвертер валют не появился!');
            });

    });
});