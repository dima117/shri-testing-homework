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

   it('Возвращаются корректные хлебные крошки при просмотре содержимого файла коммита.', function () {
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
});