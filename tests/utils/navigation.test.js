const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../../utils/navigation');
const expect = require('chai').expect;

describe('Навигация', function () {
   it('Возвращается корректный url для файла.', function () {
       const hash = 'testhash';
       const path = 'testpath';

       const result = buildFileUrl(hash, path);

       expect(result).to.equal(`/content/${hash}/${path}`);
   });

   it('Возвращается корректный url для директории.', function () {
       const hash = 'testhash';
       const path = 'testpath';

       const result = buildFolderUrl(hash, path);

       expect(result).to.equal(`/files/${hash}/${path}`);
   });

   it('Возвращаются корректные хлебные крошки при просмотре главной страницы', function () {

       const result = buildBreadcrumbs();

       expect(result).to.eql([{
           text: 'HISTORY',
           href: undefined
       }]);
   });

   it('Возвращаются корректные хлебные крошки при просмотре корневой директории файлов коммита.', function () {
       const hash = 'testhash';
       const path = '';

       const result = buildBreadcrumbs(hash, path);

       expect(result).to.eql([
           {
               text: 'HISTORY',
               href: '/'
           },
           {
               text: 'ROOT',
               href: undefined
           }
       ]);
   });

   it('Возвращаются корректные хлебные крошки при просмотре файлов 1 уровня вложенности.', function () {
       const hash = 'testhash';
       const path = 'testpath';

       const result = buildBreadcrumbs(hash, path);

       expect(result).to.eql([
           {
               text: 'HISTORY',
               href: '/'
           },
           {
               text: 'ROOT',
               href: `/files/${hash}/`
           },
           {
               text: path
           }

       ]);
   });

    it('Возвращаются хлебные крошки при просмотре файлов больше 1 уровня вложенности', () => {
        const hash = 'somehash';
        const path = 'somepath1/somepath2';

        const result = buildBreadcrumbs(hash, path);

        expect(result).to.eql([
            {
                text: 'HISTORY',
                href: '/'
            },
            {
                text: 'ROOT',
                href: '/files/somehash/'
            },
            {
                text: 'somepath1',
                href: '/files/somehash/somepath1/'
            },
            {
                text: 'somepath2'
            }
        ]);
    });
});