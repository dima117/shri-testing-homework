const { expect } = require('chai');
const { attachParams } = require('../../controllers/filesController');

describe('Attacher of parameters to the git files', () => {

  it('should attach href and name to the file', () => {
    const params = {
      type: 'blob',
      hash: 'abc123',
      path: 'test/test.hbs',
    };

    const result = attachParams(params, '123');
    expect(result).to.include({
      href: '/content/123/test/test.hbs',
      name: 'test.hbs',
    });
  });
});
