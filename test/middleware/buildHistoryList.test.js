let {expect} = require('chai'),
    build = require('../../middleware/buildHistoryList');


let gitHistoryFakeOutput = [
    {
        hash: 'a550f88e9f98dfd8b7dfa48789f26e61f8ac4399',
        author: 'kauzlein',
        timestamp: '2018-10-19 09:00:18 +0300',
        msg: 'Fixed package.json'
    }
];

describe('buildHistoryList.js', function () {
    it('Должен вернуть массив объектов, содержащих ключи переданного аргументом объекта и дополнительный ключ href', () => {
        let result = build(gitHistoryFakeOutput),
            resultArray = Object.keys(result.list[0]),
            checkArray = Object.keys(gitHistoryFakeOutput[0]),
            resultedHref = `/files/${gitHistoryFakeOutput[0].hash}/`;

        checkArray.push('href');

        expect(result).to.include({title: 'history'});
        expect(resultArray).to.deep.equal(checkArray);
        expect(result.list[0].href).to.equal(resultedHref);
    })
});