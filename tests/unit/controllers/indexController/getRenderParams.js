const {expect} = require('chai');
const getRenderParams = require('../../../../controllers/indexController').getRenderParams;

it('Функция должна возвращать правильные параметры для рендера главной страницы', () => {
    const params = getRenderParams([
        {
            hash: '1'
        },
        {
            hash: '2'
        }
    ]);

    expect(params).to.be.an('object');

    const {title, breadcrumbs, list} = params;

    expect(title).to.be.eql('history');

    expect(breadcrumbs).to.be.an('array');
    expect(breadcrumbs[0].text).to.be.eql('HISTORY');
    expect(breadcrumbs[0].href).to.be.undefined;

    expect(list).to.be.an('array');
    expect(list[0].href).to.be.eql('/files/1/');
    expect(list[1].href).to.be.eql('/files/2/');

});
