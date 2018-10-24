const { assert } = require('chai');

describe('Content on files page"', () => {
  it('should contain files', async function () {
    const commitLink = '//div[@class="commit"]/div[@class="commit__link"]/a';

    const files = await this.browser
      .url('/')
      .click(commitLink)
      .isExisting('.content > ul');

    assert.isTrue(files);
  });

  it('should contain files on screenshot', async function () {
    const commitLink = '//div[@class="commit"]/div[@class="commit__link"]/a';

    return this.browser
      .url('/')
      .click(commitLink)
      .assertView('files', 'html');
  });
});
