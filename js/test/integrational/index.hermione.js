const { assert } = require('chai');

describe('Content on index page"', () => {
  it('should contain commits history', async function () {
    const index = await this.browser
      .url('/')
      .isExisting('.commit');

    assert.isTrue(index);
  });

  it('should contain commit information', async function () {
    const indexPage = this.browser.url('/').element('.commit');

    const [name, timestamp, msg, link] = await Promise.all([
      indexPage.isExisting('.commit__author'),
      indexPage.isExisting('.commit__date'),
      indexPage.isExisting('.commit__msg'),
      indexPage.isExisting('.commit__link a')
    ]);

    assert.isTrue(name);
    assert.isTrue(timestamp);
    assert.isTrue(msg);
    assert.isTrue(link);
  });
});
