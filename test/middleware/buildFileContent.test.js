let {expect} = require('chai'),
    build = require('../../middleware/buildFileContent');

let content = 'node_modules\n\n# IntelliJ project files\n.idea/\n\n# Test coverage output\n.nyc_output/\n/hermione-html-report/',
    hash = 'adde1b98a07441f0108e5557047220eda59e962e',
    path = [ '.gitignore' ],
    crumb =[ { text: 'HISTORY', href: '/' },
        { text: 'ROOT',
            href: '/files/adde1b98a07441f0108e5557047220eda59e962e/' },
        { text: '.gitignore' } ];


describe('buildFileContent()', () => {
    let result = build(content, hash, path);

    it('Возвращаются крошки"', () => {
        expect(result.breadcrumbs).to.be.deep.equal(crumb);
    });
    it('Возвращается содержимое файла', () => {
        expect(result.content).to.be.equal(content);
    });
    it('Возвращается заголовок', () => {
        expect(result.title).to.equal('content');
    });
});
