const {expect} = require('chai');
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require('../utils/navigation');


describe('buildBreadcrumbs', () => {
  it('path не задан', () => {
    const result = buildFolderUrl('9018091');
    expect(result).to.equal('/files/9018091/');
  });

  it('path задан', () => {
    const result = buildFolderUrl('9018091', 'controllers');
    expect(result).to.equal('/files/9018091/controllers');
  })
})

it('buildFileUrl', () => {
  const result =  buildFileUrl('9018091', 'README.md');
  expect(result).to.equal('/content/9018091/README.md');
});

describe('buildBreadcrumbs', () => {
  it('без параметров', () => {
    const result = buildBreadcrumbs();
    expect(result).to.deep.equal([{"href": undefined, "text": "HISTORY"}]);
  });

  it('задан hash', () => {
    const result = buildBreadcrumbs('9018091');
    expect(result).to.deep.equal([{"href": "/", "text": "HISTORY"}, {"href": undefined, "text": "ROOT"}]);
  });

  it('заданы все параметры', () => {
    const result = buildBreadcrumbs('9018091', 'README.md');
    expect(result).to.deep.equal([{"href": "/", "text": "HISTORY"}, {"href": "/files/9018091/", "text": "ROOT"}, {"text": "README.md"}]);
  });

  it('заданы все параметры, path сложный', () => {
    const result = buildBreadcrumbs('9018091', 'utils/git.js');
    expect(result).to.deep.equal([{"href": "/", "text": "HISTORY"}, {"href": "/files/9018091/", "text": "ROOT"}, {"href": "/files/9018091/utils/", "text": "utils"}, {"text": "git.js"}]);
  });
});
