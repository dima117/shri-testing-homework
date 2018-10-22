const { buildFolderUrl, buildFileUrl, buildBreadcrumbs} = require('../../../utils/navigation');
const { expect } = require('chai');

describe('Utils Navigator Test', () => {

    describe('buildFolderUrl Test', () => {

        it('Can get folder url', () => {
            // подготовка
            const parentHash = 'parentHash';
            const path = 'path';

            // действиe
            const result = buildFolderUrl(parentHash, path);

            // проверка
            expect(result).to.be.eql('/files/parentHash/path');
        });

    });


    describe('buildFileUrl Test', () => {

        it('Can get file url', () => {
            // подготовка
            const parentHash = 'parentHash';
            const path = 'path';

            // действие
            const result = buildFileUrl(parentHash, path);

            // проверка
            expect(result).to.be.eql('/content/parentHash/path');
        });

    });

    describe('buildBreadcrumbs Test', () => {

        it('Can build simple breadcrumbs', () => {
            // подготовка
            const hash = 'parentHash';
            const path = 'path';

            // действие
            const result = buildBreadcrumbs(hash, path);

            // проверка
            expect(result[result.length - 1].text).to.be.eql('path');
        });

        it('Can build complicated breadcrumbs', () => {
            // подготовка
            const hash = 'parentHash/parentHash2/parentHash3';
            const path = 'path3/path2/path';

            // действие
            const result = buildBreadcrumbs(hash, path);

            // проверка
            expect(result[result.length - 1].text).to.be.eql('path');
        });

        it('Can build breadcrumbs with zero hash', () => {
            // подготовка
            const hash = 0;
            const path = 'path';

            // действие
            const result = buildBreadcrumbs(hash, path);

            // проверка
            expect(result.length).to.be.eql(1);
        });

        it('Can build breadcrumbs with zero path', () => {
            // подготовка
            const hash = 'parentHash';
            const path = 0;

            // действие
            const result = buildBreadcrumbs(hash, path);

            // проверка
            const rootIndex = result.findIndex( (item) => item.text === 'ROOT');
            expect(result[rootIndex].href).to.be.eql(undefined);
        });

    });

});
