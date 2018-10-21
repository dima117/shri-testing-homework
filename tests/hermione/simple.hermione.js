const assert = require('assert');

describe('Главная', () => {
    it('Появились хлебные крошки', function() {
        return this.browser
            .url('/')
            .isExisting('.breadcrumbs')
            .then((exist) => {
                assert.ok(exist, 'Список файлов не появился')
            })
    })

    it('Появился список коммитов', function() {
        return this.browser
            .url('/')
            .isExisting('.commit')
            .then((exist) => {
                assert.ok(exist, 'Список коммитов не появился')
            })
    })

    it('Проверка перехода по коммиту', function() {
        return this.browser
            .url('/')
            .click('.commit__link a')
            .isExisting('.content ul')
            .then((exist) => {
                assert.ok(exist, 'Список файлов не появился')
            })
    })
})

describe('Cписок файлов', () => {
    it('Появились хлебные крошки', function() {
        return this.browser
            .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
            .isExisting('.breadcrumbs')
            .then((exist) => {
                assert.ok(exist, 'Хлебные крошки не появились')
            })
    })

    it('Появился спиcок файлов', function() {
        return this.browser
            .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
            .isExisting('.content ul')
            .then((exist) => {
                assert.ok(exist, 'Список файлов не появился')
            })
    })

    it('Проверка перехода по файлу', function() {
        return this.browser
            .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
            .click('.content a')
            .isExisting('.file-content')
            .then((exist) => {
                assert.ok(exist, 'Содержимое файла не отобразилось')
            })
    })

    it('Проверка перехода по хлебным крошкам назад к главной странице', function() {
        return this.browser
            .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
            .click('.breadcrumbs a')
            .isExisting('.commit:first-child')
            .then((exist) => {
                assert.ok(exist, 'Переход по хлебным крошкам не произошел')
            })
    })
})

describe('Cодержимое файла', () => {
    it('Появились хлебные крошки', function() {
        return this.browser
            .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/app.js')
            .isExisting('.breadcrumbs')
            .then((exist) => {
                assert.ok(exist, 'Хлебные крошки не появились')
            })
    })

    it('Появилось содержимое файла', function() {
        return this.browser
            .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/app.js')
            .isExisting('.file-content')
            .then((exist) => {
                assert.ok(exist, 'Содержимое файла не появилось')
            })
    })

    it('Проверка перехода по хлебным крошкам назад к списку файлов', function() {
        return this.browser
            .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/app.js')
            .click('.breadcrumbs a:last-child')
            .isExisting('.content ul')
            .then((exist) => {
                assert.ok(exist, 'Переход по хлебным крошкам к списку файлов не произошел')
            })
    })

    it('Проверка перехода по хлебным крошкам назад к главной странице', function() {
        return this.browser
            .url('/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/app.js')
            .click('.breadcrumbs a:first-child')
            .isExisting('.commit:first-child')
            .then((exist) => {
                assert.ok(exist, 'Переход по хлебным крошкам на главную страницу не произошел')
            })
    })
})