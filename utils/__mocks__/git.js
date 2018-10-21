const resolvingData = [{
        hash: '2c63d75241a91c1eb068bd2e8a6e6c0482d4484d',
        author: 'Шугаев Алексей Андреевич',
        timestamp: '2018-10-21 15:02:33 +0300',
        msg: 'создал струкруру для тестов'
    },
    {
        hash: '100c70c6f2fb4912d1ffd46c7f417b0a29de0245',
        author: 'Шугаев Алексей Андреевич',
        timestamp: '2018-10-21 14:55:33 +0300',
        msg: 'тесты для contentcontroller'
    },
    {
        hash: '7bc1d36b9a0dc9ea1c3ac43c91f93b63fac39943',
        author: 'Шугаев Алексей Андреевич',
        timestamp: '2018-10-20 15:53:09 +0300',
        msg: 'Тесты для contentController.js'
    },
    {
        hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:49:56 +0300',
        msg: 'исправлена опечатка в readme'
    },
    {
        hash: '82810cf7d56476059477aaa5ff55c99ff191be29',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 11:25:59 +0300',
        msg: 'исправлена ошибка'
    },
    {
        hash: '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 11:23:01 +0300',
        msg: 'ссылки на корневую папку'
    },
]

const gitHistory = jest.fn(() => Promise.resolve(resolvingData));

module.exports = {
    gitHistory
}