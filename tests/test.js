const { expect } = require('chai');  // Using Expect style
const { GitClass } = require('../utils/git');
const { NavigationClass } = require('../utils/navigation')

describe('Получение истории из гита', function(){
    it('Должен быть массив', async function() {
        let git = new GitClass();

        const result = await git.gitHistory();
        expect(result).to.be.a('array');
    });
    
    it('Должны быть элементы в массиве', async function() {
        let git = new GitClass();

        const result = await git.gitHistory(1,10);
        expect(result).to.be.not.empty;
    })
    
    it('Количество эллементов в массиве должно быть меньше 11', async function() {
        let git = new GitClass();

        const size = 10;
        const result = await git.gitHistory(1,size);
        expect(result.length).to.be.below(size+1);
    })

    it('проверка работы parseHistoryItem', async function() {
        let git = new GitClass();

        git.executeGit = function() {
            return new Promise((resolve) => {
                resolve("90180910fc27a11272a3e5caeeb119a51e5c0545	Dmitry Andriyanov	2018-10-16 12:49:56 +0300	исправлена опечатка в readme\ncc2284293758e32c50fa952da2f487c8c5e8d023	Dmitry Andriyanov	2018-10-16 12:36:32 +0300	readme")
            })
        }

        const result = await git.gitHistory(page=1, size=2)

        expect(result).to.deep.equal([
            {
                author: "Dmitry Andriyanov",
                hash: "90180910fc27a11272a3e5caeeb119a51e5c0545",
                msg: "исправлена опечатка в readme",
                timestamp: "2018-10-16 12:49:56 +0300"
            },
            {
                author: "Dmitry Andriyanov",
                hash: "cc2284293758e32c50fa952da2f487c8c5e8d023",
                msg: "readme",
                timestamp: "2018-10-16 12:36:32 +0300"
            }
        ]);



    })
})

describe('Получение дерева файла ', function(){
    it('проверка работы gitFileTree', async function() {
        let git = new GitClass();

        git.executeGit = function() {
            return new Promise((resolve) => {
                resolve('100644 blob c9d18582f6c7fb78fb2c611bcd6c0d5f87304072	controllers/contentController.js\n' +
                '100644 blob 02fe732137bea2adfb6f650bce92aa0be2f5cd9d	controllers/filesController.js\n' +
                '100644 blob 0e3f100b8db850ebc6ca003312c328f73972cdec	controllers/indexController.js')
            })
        }

        const result = await git.gitFileTree();
        
        expect(result).to.deep.equal([ { type: 'blob',
        hash: 'c9d18582f6c7fb78fb2c611bcd6c0d5f87304072',
        path: 'controllers/contentController.js' },
        { type: 'blob',
        hash: '02fe732137bea2adfb6f650bce92aa0be2f5cd9d',
        path: 'controllers/filesController.js' },
        { type: 'blob',
        hash: '0e3f100b8db850ebc6ca003312c328f73972cdec',
        path: 'controllers/indexController.js' } ])
    
    })
})

describe('Получение содержимого файла', function() {
    it('Проверка работы gitFileContent', async function() {
        let git = new GitClass();

        const result = await git.gitFileContent('b512c09d476623ff4bf8d0d63c29b784925dbdf8');

        expect(result).to.be.equal('node_modules');
    })
})

describe('Навигация (navigation.js)', function(){
    it('построение урла папки (buildFolderUrl)', function(){
        const parentHash = 'parentHash';
        const path = 'path';

        navigation = new NavigationClass();

        const result = navigation.buildFolderUrl(parentHash, path);

        expect(result).to.be.equal(`/files/${parentHash}/${path}`);
    });
    it('построение урла файла (buildFileUrl)', function(){
        const parentHash = 'parentHash';
        const path = 'path';

        navigation = new NavigationClass();

        const result = navigation.buildFileUrl(parentHash, path);

        expect(result).to.be.equal(`/content/${parentHash}/${path}`);
    });
    describe('Построение хлебных крошек (buildBreadcrumbs)', function(){
        it('построения в корневой папке', function(){
            const hash = undefined;
            const path = undefined;

            const navigation = new NavigationClass();

            const result = navigation.buildBreadcrumbs(hash, path);

            expect(result).to.deep.equal([ { text: 'HISTORY', href: undefined } ]);

        });

        it('построения в папке на уровень ниже корня', function(){
            const hash = 'de1f43ceaf6f7a25e2d89724e312268506046645';
            const path = 'app.js';

            const navigation = new NavigationClass();

            const result = navigation.buildBreadcrumbs(hash, path);

            expect(result).to.deep.equal([
                { text: 'HISTORY', href: '/' },
                { text: 'ROOT', href: '/files/de1f43ceaf6f7a25e2d89724e312268506046645/' },
                { text: 'app.js' }
            ]);

        })

        it('построения в папке на два уровня ниже корня', function(){
            const hash = 'de1f43ceaf6f7a25e2d89724e312268506046645';
            const path = 'tests/test.js';

            const navigation = new NavigationClass();

            const result = navigation.buildBreadcrumbs(hash, path);

            expect(result).to.deep.equal([
                { text: 'HISTORY', href: '/' },
                { text: 'ROOT', href: '/files/de1f43ceaf6f7a25e2d89724e312268506046645/' },
                { text: 'tests', href: '/files/de1f43ceaf6f7a25e2d89724e312268506046645/tests/' },
                { text: 'test.js' }
            ]);

        })
    })
})



/*it('should be an object', function(){
    const result = parseHistoryItem('38429bed94bd7c107c65fed6bffbf443ff0f4183\tDmitry Andriyanov\t2018-10-15 13:22:09 +0300\tзаготовка приложения');
    expect(result).to.be.a('object');
});*/