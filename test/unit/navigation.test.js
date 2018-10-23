const {buildBreadcrumbs, buildFolderUrl, buildFileUrl} = require('../../utils/navigation');
const {expect} = require('chai');

describe('Navigation', function() {

    it('Should be built correctly breadcrumbs', function(done) {
        const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
        const path = 'controllers';
        const bc = buildBreadcrumbs(hash, path);
        const result = [
            {text: 'HISTORY', href: '/'},
            {text: 'ROOT', href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/'},
            {text: 'controllers'}
        ];

        expect(bc).to.deep.equal(result);
        done();
    });
    
    it('Should be return correctly file url', function(done) {
        const parentHash = '1720ab852eee91bf46a4ef956f1f756ba452350d';
        const path = '.gitignore';
        const fileUrl = buildFileUrl(parentHash, path);
        const result = '/content/1720ab852eee91bf46a4ef956f1f756ba452350d/.gitignore';

        expect(fileUrl).to.equal(result);
        done();
    });

    it('Should be return correctly folder url', function(done) {
        const parentHash = '1720ab852eee91bf46a4ef956f1f756ba452350d';
        const path = 'bin';
        const fileUrl = buildFolderUrl(parentHash, path);
        const result = '/files/1720ab852eee91bf46a4ef956f1f756ba452350d/bin';

        expect(fileUrl).to.equal(result);
        done();
    });
});