const assert = require('assert');

describe('Тест', () => {
    it('Тест', () => {
        return this.browser
            .url('/')
            .keys(['курс доллара к рублю', '\uE007'])
            .isExisting('.conterter-form')
            .then((exists) => {
                assert.ok(exists, 'Конвертер не работает');
            })
    })
})