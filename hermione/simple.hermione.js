const assert = require('assert');

describe('конвертер', () => {
    it('should appear', function () {
        return this.browser
            .url('/')
            .keys(['курс доллара к рублю', '\uE007'])
            .isExisting('.converter-form')
            .then((exists) => {
                assert.ok(exists, 'no');
            });
    });
});