const { expect } = require('chai');
const { attachHref } = require('../../controllers/indexController');

describe('Attacher of href to the git files', () => {

  it('should successfully attach href to the history element', () => {
    const params = {
      hash: '123abc',
      author: 'test',
      timestamp: '2007-07-07 00:00:00 +0300',
      msg: 'test message',
    };

    const result = attachHref(params);
    expect(result).to.include({ href: '/files/123abc/' });
  });
});
