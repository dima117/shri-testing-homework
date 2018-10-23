const contentControllerGenerator = require('./contentController');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Content controller', function () {
  const hash = '38429bed94bd7c107c65fed6bffbf443ff0f4183';
  const path = 'views/error.hbs';
  const req = {
    params: {
      '0': 'views/error.hbs',
      hash: '38429bed94bd7c107c65fed6bffbf443ff0f4183'
    }
  };
  const filesBlob = [
    { type: 'blob',
      hash: '803769cff458b63a179c5c26a26f3137b9f3edfe',
      path: 'views/error.hbs'
    }
  ];
  const filesTree = [
    { type: 'tree',
      hash: '803769cff458b63a179c5c26a26f3137b9f3edfe',
      path: 'views/error.hbs'
    }
  ];
  const filesEmpty = [];
  const error = new Error('reject error');

  let stubGitFileTree;
  let stubGitFileContent;
  let contentController;
  let render;
  let res;
  let next;


  async function initialize(files, content, rejectHeadPromise = false) {
    stubGitFileTree = rejectHeadPromise ? sinon.fake.rejects(error) : sinon.fake.resolves(files);
    stubGitFileContent = sinon.fake.resolves(content);
    contentController = contentControllerGenerator(stubGitFileTree, stubGitFileContent);

    render = sinon.fake();
    res = {
      render: render
    };
    next = sinon.stub();

    await contentController(req, res, next);
  }


  it('render blob data with content', async function () {
    await initialize(filesBlob, 'simple content');

    expect(stubGitFileTree).to.have.been.calledWith(hash, path);
    expect(stubGitFileContent).to.have.been.calledWith(filesBlob[0].hash);
    expect(res.render.callCount).to.equal(1);
    expect(next.callCount).to.equal(0);

  });

  it('render blob data empty content', async function () {
    await initialize(filesBlob, '');

    expect(stubGitFileTree).to.have.been.calledWith(hash, path);
    expect(stubGitFileContent).to.have.been.calledWith(filesBlob[0].hash);
    expect(res.render.callCount).to.equal(0);
    expect(next.callCount).to.equal(1);

  });

  it('render tree data', async function () {
    await initialize(filesTree, '');

    expect(stubGitFileTree).to.have.been.calledWith(hash, path);
    expect(stubGitFileContent.callCount).to.equal(0);
    expect(res.render.callCount).to.equal(0);
    expect(next.callCount).to.equal(1);
  });

  it('render empty data', async function () {
    await initialize(filesEmpty, undefined);

    expect(stubGitFileTree).to.have.been.calledWith(hash, path);
    expect(stubGitFileContent.callCount).to.equal(0);
    expect(res.render.callCount).to.equal(0);
    expect(next.callCount).to.equal(1);
  });

  it('turn catch because gitFileTree reject', async function () {
    await initialize('', '', true);

    expect(stubGitFileTree).to.have.been.calledWith(hash, path);
    expect(stubGitFileContent.callCount).to.equal(0);
    expect(res.render.callCount).to.equal(0);
    expect(next.callCount).to.equal(1);
    expect(next).to.have.been.calledWith(error);
  });
});
