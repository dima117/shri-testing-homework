const { expect } = require('chai');

describe('Surf by breadcrumbs"', () => {
  it('from HISTORY to ROOT and return to HISTORY', async function () {
    const commitLink = '//div[@class="commit"]/div[@class="commit__link"]/a';
    const breadcrumbsReturnLink = '//div[@class="breadcrumbs"]/a[1]';

    const breadcrumbsText = await this.browser
      .url('/')
      .click(commitLink)
      .click(breadcrumbsReturnLink)
      .getText('.breadcrumbs');

    expect(breadcrumbsText).to.include('HISTORY');
  });

  it('from HISTORY-ROOT to files and return to ROOT', async function () {
    const commitLink = '//div[@class="commit"]/div[@class="commit__link"]/a';
    const filesLink = '//div[@class="content"]/ul/li[last()]/a'; ;
    const breadcrumbsReturnLink = '//div[@class="breadcrumbs"]/a[2]';

    const breadcrumbsText = await this.browser
      .url('/')
      .click(commitLink)
      .click(filesLink)
      .click(breadcrumbsReturnLink)
      .getText('.breadcrumbs');

    expect(breadcrumbsText).to.include('ROOT');
  });

  it('from HISTORY-ROOT-files to content and return to files', async function () {
    const commitLink = '//div[@class="commit"]/div[@class="commit__link"]/a';
    const filesLink = '//div[@class="content"]/ul/li[last()]/a';
    const contentLink = '//div[@class="content"]/ul/li[last()]/a[1]';
    const breadcrumbsReturnLink = '//div[@class="breadcrumbs"]/a[3]';

    const breadcrumbsText = await this.browser
      .url('/')
      .click(commitLink)
      .click(filesLink)
      .click(contentLink)
      .click(breadcrumbsReturnLink)
      .getText('.breadcrumbs');

    expect(breadcrumbsText).to.include('views');
  });
});
