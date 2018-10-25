const assert = require('assert');

/* Задание для интеграционных тестов

1. на всех страницах (история коммитов, просмотр файловой системы, просмотр содержимого файла) правильно отображается их содержимое;

2. правильно работают переходы по страницам
  - из списка коммитов на список файлов
  - из списка файлов во вложенную папку
  - из списка файлов на страницу отдельного файла
  - переходы по хлебным крошкам

*/

// 1. на всех страницах (история коммитов, просмотр файловой системы, просмотр содержимого файла) правильно отображается их содержимое

describe('История коммитов', function() {
  it('должна появиться на странице', function() {
    return this.browser
        .url('/')
        // скриншот страницы
        .assertView('history-plain', '.container')
  });
});

describe('Файловая система', function() {
  it('должна появиться на странице', function() {
    return this.browser
        // мы можем пройти по первой попавшейся ссылке в файловую систему,
        // .url('/')
        // .click('.content .commit .commit__link a[href^="/files/"]')
        // но если предположить, что старые коммиты не меняются,
        // то здесь мы можем более жестко прописать url любого коммита
        // и не ходить по случайной ссылке, что защитит нас от проблем
        // с динамическим контентом, например:
        .url('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/')
        // скриншот страницы
        .assertView('files-plain', '.container')
  });
});

describe('Содержимое файла', function() {
  it('должно появиться на странице', function() {
    return this.browser
        // здесь так же как и в предыдущем случае
        .url('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/package.json')
        // .url('/')
        // переход по ссылке по ссылке из первого комита /files/*
        // .click('.content .commit .commit__link a[href^="/files/"]')
        // .click('.content ul li a[href^="/content/"]')
        .assertView('content-plain', '.container')
  });
});

/*

2. правильно работают переходы по страницам
 - из списка коммитов на список файлов
 - из списка файлов во вложенную папку
 - из списка файлов на страницу отдельного файла
 - переходы по хлебным крошкам

*/

describe('Переход из списка коммитов на список файлов - / -> /files/', function() {
  it('должен работать', function() {
    return this.browser
        .url('/')
        // переход по ссылке по ссылке из первого комита /files/*
        .click('.content .commit .commit__link a[href^="/files/"]')
        .assertExists('.content ul li a', 'Переход / -> /files/ работает')
  });
});

describe('Переход из списка файлов во вложенную папку - / -> /files/ -> /files/', function() {
  it('должен работать', function() {
    return this.browser
        .url('/')
        // переход по ссылке по ссылке из первого комита /files/*
        .click('.content .commit .commit__link a[href^="/files/"]')
        // переход по первой ссылке с url = /files/*
        .click('.content ul li a[href^="/files/"]')
        .assertExists('.content ul li a', 'Переход / -> /files/ -> /files/ работает')
  });
});

describe('Переход из списка файлов на страницу отдельного файла - / -> /files/ -> /content/', function() {
  it('должен работать', function() {
    return this.browser
        .url('/')
        // переход по ссылке по ссылке из первого комита /files/*
        .click('.content .commit .commit__link a[href^="/files/"]')
        // переход по первой ссылке с url = /content/*
        .click('.content ul li a[href^="/content/"]')
        .assertExists('.content .file-content', 'Переход / -> /files/ -> /content/ работает')
  });
});

describe('Переход по хлебным крошкам', function() {
  it('должен работать', function() {
    return this.browser
        .url('/')
        .click('.content .commit .commit__link a[href^="/files/"]')
        .click('.content ul li a[href^="/files/"]')
        .click('.content ul li a[href^="/content/"]')
        .click('.breadcrumbs a:last-child')
        .click('.breadcrumbs a:last-child')
        .click('.breadcrumbs a:last-child')
        .assertExists('.content .commit', 'Переход по хлебным крошкам работает')
  });
});
