const { expect } = require('chai');
const Navigation = require('../utils/navigation');

it('url для папки является строкой', () => {
    const navigation = new Navigation();

    expect(navigation.buildFolderUrl('90180910fc27a11272a3e5caeeb119a51e5c0545', 'controllers')).to.be.an('string');
});

it('url-строка формируется корректно', () => {
    const navigation = new Navigation();

    expect(navigation.buildFolderUrl('90180910fc27a11272a3e5caeeb119a51e5c0545', 'controllers')).to.equal('/files/90180910fc27a11272a3e5caeeb119a51e5c0545/controllers');
});

it('url для файла является строкой', () => {
    const navigation = new Navigation();

    expect(navigation.buildFileUrl('90180910fc27a11272a3e5caeeb119a51e5c0545', 'app.js')).to.be.an('string');
});

it('url-строка формирется корректно', () => {
    const navigation = new Navigation();

    expect(navigation.buildFileUrl('90180910fc27a11272a3e5caeeb119a51e5c0545', 'app.js')).to.equal('/content/90180910fc27a11272a3e5caeeb119a51e5c0545/app.js');
});

it('с передачей двух аргументов хлебные крошки являются массивом', () => {
    const navigation = new Navigation();

    expect(navigation.buildBreadcrumbs('90180910fc27a11272a3e5caeeb119a51e5c0545', 'README.md')).to.be.an('array');
});

it('хлебные крошки из двух аргументов формируются корректно', () => {
    const navigation = new Navigation();

    const breadCrumbs = navigation.buildBreadcrumbs('90180910fc27a11272a3e5caeeb119a51e5c0545', 'README.md');

    expect(
        breadCrumbs[0].text === 'HISTORY' &&
        breadCrumbs[0].href === '/' &&
        breadCrumbs[1].text === 'ROOT' &&
        breadCrumbs[1].href === '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/' &&
        breadCrumbs[2].text === 'README.md' &&
        !breadCrumbs[2].href

    ).to.be.true;
});

it('с передачей одного аргумента хлебные крошки являются массивом', () => {
    const navigation = new Navigation();

    expect(navigation.buildBreadcrumbs('90180910fc27a11272a3e5caeeb119a51e5c0545')).to.be.an('array');
});

it('хлебные крошки из одного аргумента формируются корректно', () => {
    const navigation = new Navigation();

    const breadCrumbs = navigation.buildBreadcrumbs('90180910fc27a11272a3e5caeeb119a51e5c0545');

    expect(
        breadCrumbs[0].text === 'HISTORY' &&
        breadCrumbs[0].href === '/' &&
        breadCrumbs[1].text === 'ROOT' &&
        breadCrumbs[1].href === undefined &&
        !breadCrumbs[2]
    ).to.be.true;
});

it('без передачи аргументов хлебные крошки являются массивом', () => {
    const navigation = new Navigation();

    expect(navigation.buildBreadcrumbs()).to.be.an('array');
});

it('хлебные крошки буез передачи аргументов формируются корректно', () => {
    const navigation = new Navigation();

    const breadCrumbs = navigation.buildBreadcrumbs();

    expect(
        breadCrumbs[0].text === 'HISTORY' &&
        breadCrumbs[0].href === undefined &&
        !breadCrumbs[1] &&
        !breadCrumbs[2]
    ).to.be.true;
});