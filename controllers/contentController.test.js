const contentControllerGenerator = require('./contentController');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);


describe('Content controller', function () {


  it('render blob data', async function () {
    const hash = '38429bed94bd7c107c65fed6bffbf443ff0f4183';
    const path = 'views/error.hbs';
    const files = [
      { type: 'blob',
        hash: '803769cff458b63a179c5c26a26f3137b9f3edfe',
        path: 'views/error.hbs'
      }
    ];
    const content = '"some content"';

    const stubGitFileTree = sinon.fake.resolves(files);
    const stubGitFileContent = sinon.fake.resolves(content);
    const contentController = contentControllerGenerator(stubGitFileTree, stubGitFileContent);

    const req = {
      params: {
        '0': 'views/error.hbs',
        hash: '38429bed94bd7c107c65fed6bffbf443ff0f4183'
      }
    };

    const render = sinon.fake();
    const res = {
      render: sinon.fake()
    };
    const next = sinon.stub();



    await contentController(req, res, next);

    expect(stubGitFileTree).to.have.been.calledWith(hash, path);
    expect(stubGitFileContent).to.have.been.calledWith(files[0].hash);
    expect(render.callCount).to.equal(1);
    expect(next.callCount).to.equal(0);

  });
});
