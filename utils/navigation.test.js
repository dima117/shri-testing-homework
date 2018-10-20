const {
    buildFolderUrl,
    buildFileUrl,
    buildBreadcrumbs
} = require('./navigation');

const { expect } = require('chai');

describe('navigation.js', () => {
    it('should returns folder path by hash', () => {
        const [hash, path] = ['hash', 'path'];
        // Must be
        const res = '/files/hash/path';

        expect(buildFolderUrl(hash, path)).to.eq(res);
    });

    it('should returns file path by hash', () => {
        const [hash, path] = ['hash', 'path'];
        // Must be
        const res = '/content/hash/path';

        expect(buildFileUrl(hash, path)).to.eq(res);
    });

    it('should returns breadcrumbs for 1 level', () => {
        const [hash, path] = ['hash', 'path'];
        // Must be
        const res = [
            { text: 'HISTORY', href: '/' },
            { text: 'ROOT', href: '/files/hash/' },
            { text: path }
        ];

        expect(buildBreadcrumbs(hash, path)).to.deep.eq(res);
    });

    it('should returns breadcrumbs for more than 1 level', () => {
        const [hash, path] = ['hash', 'path1/path2/path3'];
        // Must be
        const res = [
            { text: 'HISTORY', href: '/' },
            { text: 'ROOT', href: '/files/hash/' },
            { text: 'path1', href: '/files/hash/path1/' },
            { text: 'path2', href: '/files/hash/path1/path2/' },
            { text: 'path3' }
        ];

        expect(buildBreadcrumbs(hash, path)).to.deep.eq(res);
    });

    it('should returns correct format data, for breadcrumbs, without args', () => {
        // Must be
        const res = [
            { text: 'HISTORY', href: undefined }
        ];

        expect(buildBreadcrumbs()).to.deep.eq(res);
    });
});