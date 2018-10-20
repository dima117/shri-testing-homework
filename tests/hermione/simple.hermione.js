const assert = require('assert');

describe('ya', () => {
    it('should find hermione', function() {
        return this.browser
            .url('/')
            .keys(['курс доллара к рублю', '\uE007'])
            .isExisting('.converter-form')
            .then((exists) => {
                assert.ok(exists, 'Конвертер валют не появился');
            });
    });
});
