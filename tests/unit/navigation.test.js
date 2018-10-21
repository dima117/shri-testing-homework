const { expect } = require('chai');

const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../../utils/navigation');


describe('utils/navigation.js', function() {
    it('Создание URL для директории', function () {
        let result = buildFolderUrl('one/to', 'three');
        
        expect(result).to.eql('/files/one/to/three');
    });

    it('Создание URL для файла', function ()  {
        let result = buildFileUrl('one/to', 'three');

        expect(result).to.eql('/content/one/to/three');
    });

    it('Создание хлебных крошек', function ()  {
        let result = buildBreadcrumbs('90180910fc27a11272a3e5caeeb119a51e5c0545', 'app.js');

        expect(result).to.eql([
            { text: 'HISTORY', href: '/' },
            { text: 'ROOT', href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/' },
            { text: 'app.js' } 
        ]);
    });
})
