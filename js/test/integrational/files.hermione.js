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
});
