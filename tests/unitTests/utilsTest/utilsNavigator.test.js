const { buildFolderUrl, buildFileUrl, buildBreadcrumbs} = require('../../../utils/navigation');
const { expect } = require('chai');

describe('Utils Navigator Test', function () {

    it('Can build folder url', function () {
        // подготовка
        const parentHash = 'parentHash';
        const path = 'path';
    
        // действиe 
        const result = buildFolderUrl(parentHash, path);
    
        // проверка
        expect(result).to.be.eql('/files/parentHash/path');
    });

    it('Can build file url', function () {
        // подготовка
        const parentHash = 'parentHash';
        const path = 'path';
    
        // действие
        const result = buildFileUrl(parentHash, path);
    
        // проверка
        expect(result).to.be.eql('/content/parentHash/path');
    });

    it('Can build breadcrumbs', function () {
        // подготовка
        const hash = 'parentHash';
        const path = 'path';
    
        // действие
        // const result = buildBreadcrumbs(parentHash, path);
    
        // проверка
        // expect(result).to.be.eql('/files/parentHash/path');
    });

    it('Can build breadcrumbs with zero hash', function () {
        // подготовка
        const hash = null;
        const path = 'path';
    
        // действие
        // const result = buildBreadcrumbs(hash, path);
    
        // проверка
        // expect(result).to.be.eql('/files/parentHash/path');
    });
    
});
