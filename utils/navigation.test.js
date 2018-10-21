const {
    buildFolderUrl,
    buildFileUrl,
    buildBreadcrumbs
} = require('./navigation.js')

describe('Работа "хлебных крошек"', () => {
    it('При заданных хэше и пути, функция возвращает массив из "хлебных крошек" со свойствами text и [href - optional]', () => {
        const hash = '68d14a5c95d67e815d5aa9e2560b16b902b402d9'
        const path = 'README.md'
        const expectedResult = [
            { text: 'HISTORY', href: '/' },
            {
                text: 'ROOT',
                href: '/files/68d14a5c95d67e815d5aa9e2560b16b902b402d9/'
            },
            { text: 'README.md' }
        ]

        const actualResult = buildBreadcrumbs(hash, path)

        expect(actualResult).toEqual(expectedResult)
    })

    it('При вызове без параметров, возвращается массив из одного объекта history, у которого свойство href: undefined', async function () {
        const expectedResult = [{ text: 'HISTORY', href: undefined }]

        const actualResult = buildBreadcrumbs();
    
        expect(actualResult).toEqual(expectedResult);
      });
})

describe('Построение пути к файлам и файловым системам', () => {
    it('При заданном хэше возвращается путь к системе файлов коммита', () => {
        const hash = '1f5487e5c51504cf2f2db00227dd815664b6d8d7'
        const path = ''
        const expectedResult = '/files/1f5487e5c51504cf2f2db00227dd815664b6d8d7/'

        const actualResult = buildFolderUrl(hash, path)

        expect(actualResult).toEqual(expectedResult)
    })

    
      it('При заданном хэше и пути возвращается путь к содежимому отдельного файла', function () {
        const hash = '1f5487e5c51504cf2f2db00227dd815664b6d8d7'
        const path = '.hermione.conf.js'
        const expectedResult = '/content/1f5487e5c51504cf2f2db00227dd815664b6d8d7/.hermione.conf.js'

        const actualResult = buildFileUrl(hash, path)

        expect(actualResult).toEqual(expectedResult)
      });
})
