const {getContent, getTree} = require('../../controllers/content/content');
const {expect} = require('chai');
const sinon = require('sinon');

describe('File content', function () {

    it('Should be return file properties ', function (done) {
        const execute = sinon.stub().resolves(`100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8	.gitignore`);
        
        const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
        const path = ['.gitignore'];
        const result = {
            type: 'blob',
            hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
            path: '.gitignore'
        };

        getTree(execute, hash, path).then((data) => {
            expect(data).to.deep.equal(result);
            done();
        });
    });

    it('Should be return file content', function(done) {
        const execute = sinon.stub().resolves(`node_modules`);

        const fileProperties = {
            type: 'blob',
            hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
            path: '.gitignore'
        };
        const result = 'node_modules';

        getContent(execute, fileProperties).then((content) => {
            expect(content).to.equal(result);
            done();
        });
    });
    
})
