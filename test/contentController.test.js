const contentController = require('../controllers/contentController');
const { Git } = require('../utils/git');
const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const { next } = require('express');

chai.use(sinonChai);
const git = new Git();
/*
function createGitStub() {
  const gitStub = sinon.stub(Git.prototype, 'executeGit').returns(
    new Promise((resolve, reject) => {
      console.log('executeGit promise resolved', testString);
      resolve(testString);
    })
  );
}

function createGitWithFakeExecute(returnsString) {
  sinon.stub(git, 'executeGit').callsFake(function() {
    return new Promise((resolve, reject) => {
      resolve(returnsString);
    });
  });
  return git;
}

/*нужно подменить gitFileTree и gitFileContent */
/*function createGitWithFakeTree() {
  //подготовка
  const testString = `10000 blob 123\u0009app.js\n`;
  const testGit = createGitWithFakeExecute(testString);
  const expectedResult = [
    {
      type: 'blob',
      hash: '123',
      path: 'app.js'
    }
  ];
  const path = '';
  const hash = '123';
  const git = new Git();
  //действие
  const resultGitFileTree = testGit.gitFileTree(hash, path);
  //проверка
  return resultGitFileTree.then(res => {
    expect(res).to.deep.equal(expectedResult);
  });
}

function createGitWithFakeFileContent() {
  //подготовка
  const testString = `const path = require('path');
  const express = require('express');
  app.listen(3000);
  module.exports = app;`;
  const testGit = createGitWithFakeExecute(testString);
  const hash = '123';
  const expectedResult = `const path = require('path');
  const express = require('express');
  app.listen(3000);
  module.exports = app;`;
  //действие
  const resultGitFileContent = testGit.gitFileContent(hash);
  //проверка
  return resultGitFileContent.then(res => {
    expect(res).to.deep.equal(expectedResult);
  });
}
*/
describe('my route', () => {
  let testGitFileTree, testGitFileContent;
  before(function() {
    testGitFileTree = sinon.stub(git, 'gitFileTree').callsFake(() => {
      console.log('tree');
      return new Promise((resolve, reject) => {
        resolve([
          {
            type: 'blob',
            hash: '123',
            path: 'app.js'
          }
        ]);
      });
    });
    testGitFileContent = sinon.stub(git, 'gitFileContent').callsFake(() => {
      return `const path = require('path');
        const express = require('express');
        app.listen(3000);
        module.exports = app;`;
    });
  });
});
after(function() {
  git.gitFileTree.restore(); // Unwraps the spy
  git.gitFileContent.restore();
});
it('should foo the bar', done => {
  const hash = '123';
  const request = {
    params: {
      '0': 'app.js',
      hash: '123'
    }
  };
  const testString = `const path = require('path');
  const express = require('express');
  app.listen(3000);
  module.exports = app;`;
  const req = mockReq(request);
  const res = mockRes();

  contentController(req, res);
  /* res.render('content', {
      title: 'content',
      breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
      content
    });*/

  const expectRes = {
    content: testString
  };

  console.log(`blob`);
  console.log(res.text);
  expect(res.text).to.be.calledWith({ content: expectRes.content });

  gitStub.restore();
});

/*
describe('contentController tests', () => {
  it('проверяем ....', async () => {
    Git.executeGit = function() {
      return new Promise((resolve, reject) => {
        resolve(this.testString);
      });
    };

    Git.gitFileTree = function() {
      return new Promise(resolve => {
        // подменяем метод gitTree
        [
          {
            type: 'blob',
            hash: '123',
            path: 'app.js'
          },
          {
            type: 'tree',
            hash: '1234',
            path: 'test'
          }
        ];
      });
    };
    Git.gitFileContent = function() {
      return new Promise(resolve => {
        `const path = require('path');
      const express = require('express');
      app.listen(3000);
      module.exports = app;`;
      });
    };

    const response = await chai.request(server).get('/content/123/app.js');
    chai.expect(response).to.have.status(200);
  });
});*/
