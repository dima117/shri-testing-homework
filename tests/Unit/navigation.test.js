const { assert } = require('chai');
const Navigation = require('../../utils/navigation');

describe('Navigation', () => {
    const nav = new Navigation();

    describe('buildFolderUrl', () => {
        it('correct return value', () => {
            const src = [
                {parentHash: '5dec08da64c3b090708aa8412924b26744d60597', path: 'bin'},
                {parentHash: '7e013ae0440ad6e91082599376a6aaebe20d2112', path: 'views'},
                {parentHash: '7e013ae0440ad6e91082599376a6aaebe20d2112', path: 'controllers'}
            ];
            
            src.forEach(item => {
                assert.equal(nav.buildFolderUrl(item.parentHash, item.path), 
                `/files/${item.parentHash}/${item.path}`);
            });
        });
    });

    describe('buildFileUrl', () => {
        it('correct return value', () => {
            const src = [
                {parentHash: '7e013ae0440ad6e91082599376a6aaebe20d2112', path: '.gitignore'},
                {parentHash: '0f7b962409d6980236944164c5b0c9f43f9348e9', path: 'package-lock.json'},
                {parentHash: '0f7b962409d6980236944164c5b0c9f43f9348e9', path: 'package.json'}
            ];
            
            src.forEach(item => {
                assert.equal(nav.buildFileUrl(item.parentHash, item.path), 
                `/content/${item.parentHash}/${item.path}`);
            });
        });
    });

    describe('buildBreadcrumbs', () => {
        it('return breadcrumbs without hash and path', () => {
            assert.includeDeepMembers(nav.buildBreadcrumbs(), [{text: 'HISTORY', href: undefined}]);
        });

        it('return breadcrumbs without path', () => {
            assert.includeDeepMembers(nav.buildBreadcrumbs('7e013ae0440ad6e91082599376a6aaebe20d2112'), [ 
                {text: 'HISTORY', href: '/'},
                {text: 'ROOT', href: undefined}]);
        });

        it('return breadcrumbs normal', () => {
            assert.includeDeepMembers(nav.buildBreadcrumbs('7e013ae0440ad6e91082599376a6aaebe20d2112', 'controllers'), [ 
                {text: 'HISTORY', href: '/'},
                {text: 'ROOT', href: '/files/7e013ae0440ad6e91082599376a6aaebe20d2112/'},
                {text: 'controllers' }]);
        });

        it('return breadcrumbs full', () => {
            assert.includeDeepMembers(nav.buildBreadcrumbs('7e013ae0440ad6e91082599376a6aaebe20d2112', 'public/styles.css'), 
            [{text: 'HISTORY', href: '/'},
            {text: 'ROOT', href: '/files/7e013ae0440ad6e91082599376a6aaebe20d2112/'},
            {text: 'public', href: '/files/7e013ae0440ad6e91082599376a6aaebe20d2112/public/'},
            {text: 'styles.css'}]);
        });
    });
});