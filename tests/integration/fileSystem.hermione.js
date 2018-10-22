describe('Страница с файловой системой:', () => {
  it('корректно отображается', function () {
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .assertView('plain', 'html');
  });


  it('из блока с "хлебными крошками" можно перейти на главную страницу', function () {
    const storage = {};
    const storageOptions = [storage, 'mainPageLink'];

    return this.browser
      .url('/')
      .saveCurrentUrl(...storageOptions)
      .click('.commit:first-child .commit__link > a')
      .checkElementHref('.breadcrumbs > a', ...storageOptions)
      .click('.breadcrumbs > a')
      .checkCurrentUrl(...storageOptions);
  });


  it('по ссылкам в списке файловой системы можно перейти к контенту коммита', function () {
    const storage = {};
    const storageOptions = [storage, 'linkOnContent'];

    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .saveElementHref('.content > ul > li:first-child > a', ...storageOptions)
      .click('.content > ul > li:first-child > a')
      .checkCurrentUrl(...storageOptions);
  });


  it('по ссылкам в списке файловой системы можно перейти в папку', function () {
    const storage = {};
    const storageOptions = [storage, 'linkOnFolder'];

    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .saveElementHref('.content > ul > li:nth-child(3) > a', ...storageOptions)
      .click('.content > ul > li:nth-child(3) > a')
      .checkCurrentUrl(...storageOptions)
      .assertView('plain', 'html');
  });


  it('из папки можно вернуться в корневой каталог по "хлебным крошкам"', function () {
    const storage = {};
    const storageOptions = [storage, 'rootLink'];

    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .saveCurrentUrl(...storageOptions)
      .click('.content > ul > li:nth-child(3) > a')
      .checkElementHref('.breadcrumbs a:nth-child(2)', ...storageOptions)
      .click('.breadcrumbs a:nth-child(2)')
      .checkCurrentUrl(...storageOptions);
  });


  it('из папки можно вернуться на главную по "хлебным крошкам"', function () {
    const storage = {};
    const storageOptions = [storage, 'mainPageLink'];

    return this.browser
      .url('/')
      .saveCurrentUrl(...storageOptions)
      .click('.commit:first-child .commit__link > a')
      .click('.content > ul > li:nth-child(3) > a')
      .checkElementHref('.breadcrumbs a:nth-child(1)', ...storageOptions)
      .click('.breadcrumbs a:nth-child(1)')
      .checkCurrentUrl(...storageOptions);
  });
});
