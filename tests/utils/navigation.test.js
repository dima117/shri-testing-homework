const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../../utils/navigation');
const { expect } = require('chai');

it('строится путь к папке', function() {
    const parentHash = 'parent';
    const path = '/some/path';

    let folderUrl = buildFolderUrl(parentHash, path);

    expect(folderUrl).to.eql(`/files/${parentHash}/${path}`);
});

it('строится путь к файлу', function() {
    const parentHash = 'parent';
    const path = '/some/path';

    let folderUrl = buildFileUrl(parentHash, path);

    expect(folderUrl).to.eql(`/content/${parentHash}/${path}`);
});

it('строятся хлебные крошки', function() {
    const hash = 'somehash';
    const path = '/some/path';

    let breadcrumbs = buildBreadcrumbs(hash, path);

    expect(breadcrumbs).to.eql([
        {text: 'HISTORY', href: '/'}, 
        {text: 'ROOT', href: `/files/${hash}/`},
        {text: 'some', href: `/files/${hash}/some/`},
        {text: 'path'}
    ]);
});
