const { buildFileUrl, buildBreadcrumbs, buildObjectUrl} = require('../utils/navigation');
const { expect } = require('chai');

describe('navigation',() => {
    it('правильно формируется ссылка buildFileUrl', () => {
        const folder = 'item1';
        const hash = 'item2';
        const path = 'item3';

        const result = buildFileUrl(folder, hash, path);

        expect(result).to.eql('/item1/item2/item3');
    });

    it('правильно формируется ссылка buildFileUrl без path', () => {
        const folder = 'item1';
        const hash = 'item2';

        const result = buildFileUrl(folder, hash);

        expect(result).to.eql('/item1/item2/');
    });

    it('правильно создается массив файлов buildBreadcrumbs', () => {
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

    it('правильно создается массив файлов buildBreadcrumbs, когда path пустой', () => {
        const hash = 'item1';

        const result = buildBreadcrumbs(hash, undefined);

        const eqlResult = [
            {text: 'HISTORY', href: '/'},
            {text: 'ROOT', href: undefined}
        ];

        expect(result).to.eql(eqlResult);
    });

    it('правильно создается массив файлов buildBreadcrumbs, когда hash пустой', () => {
        const path = 'item2/item3.js';

        const result = buildBreadcrumbs(undefined, path);

        const eqlResult = [
            {text: 'HISTORY', href: undefined}
        ];

        expect(result).to.eql(eqlResult);
    });

    it('правильно создается массив файлов buildBreadcrumbs, когда hash и path пустые', () => {
        const result = buildBreadcrumbs(undefined, undefined);

        const eqlResult = [
            {text: 'HISTORY', href: undefined}
        ];

        expect(result).to.eql(eqlResult);
    });

    it('правильно создается url для tree в buildObjectUrl', () => {
        const item1 = 'item1';
        const item2 = { path: 'item2', type: 'tree'};

        const result = buildObjectUrl(item1, item2);

        const eqlResult = '/files/item1/item2';

        expect(result).to.eql(eqlResult);
    });

    it('правильно создается url для blob в buildObjectUrl', () => {
        const item1 = 'item1';
        const item2 = { path: 'item2', type: 'blob'};

        const result = buildObjectUrl(item1, item2);

        const eqlResult = '/content/item1/item2';

        expect(result).to.eql(eqlResult);
    });

    it('правильно создается url для неизвестного type в buildObjectUrl', () => {
        const item1 = 'item1';
        const item2 = { path: 'item2'};

        const result = buildObjectUrl(item1, item2);

        expect(result).to.eql('#');
    });
});

