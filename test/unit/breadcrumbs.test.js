const {buildBreadcrumbs} = require('../../utils/navigation');
const {expect} = require('chai');

describe('Navigation', function() {

    it('Should be built correctly breadcrumbs', function(done) {
        const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
        const path = 'controllers';
        const result = [
            {text: 'HISTORY', href: '/'},
            {text: 'ROOT', href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/'},
            {text: 'controllers'}
        ];

        const bc = buildBreadcrumbs(hash, path);
        expect(bc).to.deep.equal(result);
        done();
    });
    
});