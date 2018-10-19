let {expect} = require('chai'),
    {buildFileList, buildObjectUrl} = require('../../middleware/buildFileList');

let fakeHash = '70461d5f9009344d9933e889b0448aa3f18d83d9 ',
    fakeList = [
        {
            type: 'blob',
            hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
            path: 'app.js'
        },
        {
            type: 'tree',
            hash: '7314a356449d3cf0bedba4a3a8d279237cd10ec1',
            path: 'bin'
        }
    ];
context('buildFileList.js', () => {


    describe('buildFileList()', function () {
        it('Должен вернуть массив объектов, содержащих ключи переданного аргументом объекта и дополнительные ключи href & name', () => {
            let result = buildFileList(fakeHash, fakeList),
                resultedHref = `/content/${fakeHash}/${fakeList[0].path}`;

            expect(result[0].name).to.equal(fakeList[0].path);
            expect(result[0].href).to.equal(resultedHref);
        });


        describe('buildObjectUrl()', function () {
            it('Если type blob, должен вернуть href с url: /content', function () {
                let result = buildObjectUrl(fakeHash, fakeList[0]);
                expect(result).to.equal(`/content/${fakeHash}/${fakeList[0].path}`);
            });
            it('Если type blob, должен вернуть href с url: /files', function () {
                let result = buildObjectUrl(fakeHash, fakeList[1]);
                expect(result).to.equal(`/files/${fakeHash}/${fakeList[1].path}`);
            });
            it('Если type иной, должен вернуть шарп', function () {
                fakeList[2] = {
                    type: 'foo',
                    hash: '42',
                    path: 'doesn\'t matter'
                };
                let result = buildObjectUrl(fakeHash, fakeList[2]);
                expect(result).to.equal('#');
            });
        });


    });

});