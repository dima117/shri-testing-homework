const { interProcessor } = require('./filesController');
const { expect } = require('chai');

describe('filesController.js', () => {
    it('should returns correct format of data', () => {
        // Mock must be
        const res = {
            breadcrumbs: [
                { href: '/', text: 'HISTORY' },
                { href: '/files/hash/', text: 'ROOT' },
                { text: 'path' },
            ],
            files: [
                { href: '/files/hash/path1', name: 'path1', path: 'path1', type: 'tree' },
                { href: '/content/hash/path2', name: 'path2', path: 'path2', type: 'blob' },
                { href: '#', name: 'path3', path: 'path3', type: 'any' }
            ],
            title: 'files',
            path: 'files'
        };
    
        // Gen mock
        let mock;
        interProcessor(
            [
                { path: 'path1', type: 'tree' },
                { path: 'path2', type: 'blob' },
                { path: 'path3', type: 'any' }
            ], 
            // Set values for mock
            { render(path, options){ mock = { path, ...options }; } },
            'hash', ['path']
        );
    
        // Compose mock
        expect(mock).to.deep.eq(res);
    });
});