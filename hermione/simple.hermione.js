const assert = require('assert');

describe('Конвертер валют', () => {
    it('должен появиться на стр', function () {
        return this.browser
            .url('/')
            .keys(['курс доллара к рублю', '\uE007'])
            .isExisting('.converter-form')
            .then((exists) => {
                assert.ok(exists, 'Конвертер валют не появился');
            });
    })
})