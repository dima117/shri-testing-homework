const { buildFileUrl, buildBreadcrumbs} = require('../utils/navigation');
const {expect} = require('chai');

it('правильно формируется ссылка buildFileUrl', function() {
    const folder = 'item1';
    const hash = 'item2';
    const path = 'item3';

    const result = buildFileUrl(folder, hash, path);

    expect(result).to.eql('/item1/item2/item3');
});

it('правильно формируется ссылка buildFileUrl без path', function() {
    const folder = 'item1';
    const hash = 'item2';

    const result = buildFileUrl(folder, hash);

    expect(result).to.eql('/item1/item2/');
});

it('правильно создается массив файлов buildBreadcrumbs', function(){
   const hash = 'item1';
   const path = 'item2/item3.js';

   const result = buildBreadcrumbs(hash, path);

   const eqlResult = [
       {text: 'HISTORY', href: '/'},
       {text: 'ROOT', href: '/files/item1/'},
       {text: 'item2', href: '/files/item1/item2/'},
       {text: 'item3.js'}
   ];

   expect(result).to.eql(eqlResult);
});

it('правильно создается массив файлов buildBreadcrumbs, когда path пустой', function(){
    const hash = 'item1';

    const result = buildBreadcrumbs(hash, undefined);

    const eqlResult = [
        {text: 'HISTORY', href: '/'},
        {text: 'ROOT', href: undefined}
    ];

    expect(result).to.eql(eqlResult);
});

it('правильно создается массив файлов buildBreadcrumbs, когда hash пустой', function(){
    const path = 'item2/item3.js';

    const result = buildBreadcrumbs(undefined, path);

    const eqlResult = [
        {text: 'HISTORY', href: undefined}
    ];

    expect(result).to.eql(eqlResult);
});

it('правильно создается массив файлов buildBreadcrumbs, когда hash и path пустые', function(){
    const result = buildBreadcrumbs(undefined, undefined);

    const eqlResult = [
        {text: 'HISTORY', href: undefined}
    ];

    expect(result).to.eql(eqlResult);
});


