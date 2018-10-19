const chai = require('chai'),
    expect = chai.expect;
const {indexController, contentController, filesController} = require('../../controller/controller');

const stubResponse = {
    render: function (view, options, callback) {
        return true;
    }
};
const stubRequest = {
    params: {
        '0': 'README.md',
        hash: '252944e1545204d5818c988af7df2a55a59d8f35'
    }

};
const stubNext = function () {
    return false;
};

describe('indexController', () => {
    const testHistory = [{
        hash: 'hash4',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:36:32 +0300',
        msg: 'readme'
    },
        {
            hash: 'hash5',
            author: 'Dmitry Andriyanov',
            timestamp: '2018-10-16 12:10:05 +0300',
            msg: 'codestyle'
        },
        {
            hash: 'hash6',
            author: 'Dmitry Andriyanov',
            timestamp: '2018-10-16 12:02:11 +0300',
            msg: 'стили'
        }];

    indexController.prototype.gitHistory = function (type, params) {
        return new Promise((resolve, reject) => {
            resolve(testHistory);
        });
    };
    it('should return an object with title, breadcrumbs and list properties', async () => {
        let result = await indexController('', stubResponse);
        expect(result).to.have.all.keys('title', 'breadcrumbs', 'list');
    });

    it('should have array in list property', async () => {
        let result = await indexController('', stubResponse);
        expect(result.list).to.be.an('array');
    });

    it('should have href property in list', async () => {
        let result = await indexController('', stubResponse);
        expect(result.list.every(el => el.href)).to.be.true;
    });

});

describe('contentController', () => {
    const testFileTree = [{
        type: 'blob',
        hash: '27e5864fa4f9a15d22ef81a804ca339fa4befbcd',
        path: 'README.md'
    }];

    contentController.prototype.gitFileTree = function (type, params) {
        return new Promise((resolve, reject) => {
            resolve(testFileTree);
        });
    };
    beforeEach(function () {

        contentController.prototype.gitFileContent = function (type, params) {
            return new Promise((resolve, reject) => {
                resolve('file content');
            });
        };
    });

    it('should return an object with title, breadcrumbs and content properties', async () => {
        let result = await contentController(stubRequest, stubResponse);
        expect(result).to.have.all.keys('title', 'breadcrumbs', 'content');
    });

    it('should return content as an string if file has content', async () => {
        let result = await contentController(stubRequest, stubResponse, stubNext);
        expect(result.content).to.be.an('string');
    });


    it('should return false if file has no content', async () => {
        contentController.prototype.gitFileContent = function (type, params) {
            return new Promise((resolve, reject) => {
                resolve('');
            });
        };
        let result = await contentController(stubRequest, stubResponse, stubNext);
        expect(result).to.be.false;
    });


});

describe('filesController', () => {
    const testFileTree = [{
        type: 'blob',
        hash: '27e5864fa4f9a15d22ef81a804ca339fa4befbcd',
        path: 'README.md'
    }];

    filesController.prototype.gitFileTree = function (type, params) {
        return new Promise((resolve, reject) => {
            resolve(testFileTree);
        });
    };
    it('should an object with title, files and content properties', async () => {
        let result = await filesController(stubRequest, stubResponse);
        expect(result).to.have.all.keys('title', 'breadcrumbs', 'files');
    });

    it('should a files property that is an array', async () => {
        let result = await filesController(stubRequest, stubResponse);
        expect(result.files).to.be.an('array');
    });
    it('should a files property that elements have href and name properties', async () => {
        let result = await filesController(stubRequest, stubResponse);
        expect(result.files.every(res => res.href&&res.name)).to.be.true;
    });
});