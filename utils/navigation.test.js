const {
    buildFolderUrl,
    buildFileUrl,
    buildBreadcrumbs
} = require('./navigation');

const { expect } = require('chai');

describe('navigation.js', () => {
    it('should returns folder path by hash', () => {
        const [hash, path] = ['hash', 'path'];
        const res = `/files/${hash}/${path}`;

        expect(res).to.equals(buildFolderUrl(hash, path));
    });

    it('should returns file path by hash', () => {
        const [hash, path] = ['hash', 'path'];
        const res = `/content/${hash}/${path}`;

        expect(res).to.equals(buildFileUrl(hash, path));
    });

    // For that, must be harder test
    it('should returns array with info about path', () => {
        const [hash, path] = ['hash', 'path'];
        const res = [
            { text: 'HISTORY', href: '/' },
            { text: 'ROOT', href: `/files/${hash}/` },
            { text: path }
        ];

        expect(res).to.deep.equals(buildBreadcrumbs(hash, path));
    });
});