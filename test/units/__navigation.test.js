const { expect } = require('chai');
const { buildFolderUrl, buildFileUrl, buildObjectUrl, buildBreadcrumbs } = require('../../utils/navigation');
const { buildFolderUrlMock, buildFileUrlMock, buildObjectBlobUrlMock, buildObjectDefaultUrlMock,
  hashMock, pathMock } = require('../../mocks/index');

describe('Ф-ция "buildFolderUrl" должна', () => {
  it('возвращать корректный folderUrl при передаче path', () => {
    const result = buildFolderUrl(...buildFolderUrlMock);

    expect(result).to.be.equal('/files/hash/path');
  });

  it('возвращать корректный folderUrl без передачи path', () => {
    const result = buildFolderUrl(buildFolderUrlMock[0]);

    expect(result).to.be.equal('/files/hash/');
  });

});

describe('Ф-ция "buildFileUrl" должна', () => {
  it('возвращать корректный fileUrl', () => {
    const result = buildFileUrl(...buildFileUrlMock);

    expect(result).to.be.equal('/content/parentHash/path');
  });

});

describe('Ф-ция "buildObjectUrl" должна', () => {
  it('возвращать значение по умолчанию, при некорректном типе', () => {
    const result = buildObjectUrl(...buildObjectDefaultUrlMock);

    expect(result).to.be.equal('#');
  });

  it('возвращать корректное значение', () => {
    const result = buildObjectUrl(...buildObjectBlobUrlMock);

    expect(result).to.be.equal('/content/parentHash/path');
  });
});

describe('Ф-ция "buildBreadcrumbs" должна', () => {
  it('содержать в качестве крайнего элемента объект без поля "href"', () => {
    const result = buildBreadcrumbs(hashMock, pathMock);

    expect(result[result.length - 1]).to.deep.equal({ text: 'filesController.js' });
  });

  it('возвращать список с корректной длиной', () => {
    const result = buildBreadcrumbs(hashMock, pathMock);

    expect(result).to.have.lengthOf(4);
  });

  it('содержать при длине крошек > 1 объекты со всеми полями', () => {
    const result = buildBreadcrumbs(hashMock, pathMock);

    expect(result[0]).to.deep.equal({ text: 'HISTORY', href: '/' });
  });
});
