const {getFiles} = require('../../controllers/files/files');
const {expect} = require('chai');
const sinon = require('sinon');

describe('Files sturcture', function () {

    it('Should be displayed file list', function (done) {
        const execute = sinon.stub().resolves('100644 blob d7b47df17ba8ea90f706bf9c92f9a7fc14579744\tbin/www');
        
        const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
        const path = '/bin';

        getFiles(execute, hash, path).then((data) => {
            const result = [{
                type: 'blob',
                hash: 'd7b47df17ba8ea90f706bf9c92f9a7fc14579744',
                path: 'bin/www',
                href: '/content/90180910fc27a11272a3e5caeeb119a51e5c0545/bin/www',
                name: 'www'
            }];

            expect(data).to.deep.equal(result);
            done();
        });
    });
    
})
