const { assert } = require('chai');

describe('Content on file page"', () => {
  it('should has file content', async function () {
    const commitLink = '//div[@class="commit"]/div[@class="commit__link"]/a';
    const filesLink = '//div[@class="content"]/ul/li[last()]/a';
    const contentLink = '//div[@class="content"]/ul/li[last()]/a[1]';

    const content = await this.browser
      .url('/')
      .click(commitLink)
      .click(filesLink)
      .click(contentLink)
      .isExisting('.file-content');

    assert.isTrue(content);
  });
});
