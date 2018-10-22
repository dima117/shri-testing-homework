describe('Страница с контентом файла:', () => {
  it('корректно отображается', function () {
    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .click('.content > ul > li:first-child > a')
      .assertView('plain', 'html');
  });


  it('можно вернуться в корневой каталог по "хлебным крошкам"', function () {
    const storage = {};
    const storageOptions = [storage, 'rootLink'];

    return this.browser
      .url('/')
      .click('.commit:first-child .commit__link > a')
      .saveCurrentUrl(...storageOptions)
      .click('.content > ul > li:nth-child(1) > a')
      .checkElementHref('.breadcrumbs a:nth-child(2)', ...storageOptions)
      .click('.breadcrumbs a:nth-child(2)')
      .checkCurrentUrl(...storageOptions);
  });


  it('можно вернуться на главную по "хлебным крошкам"', function () {
    const storage = {};
    const storageOptions = [storage, 'mainPageLink'];

    return this.browser
      .url('/')
      .saveCurrentUrl(...storageOptions)
      .click('.commit:first-child .commit__link > a')
      .click('.content > ul > li:nth-child(1) > a')
      .checkElementHref('.breadcrumbs a:nth-child(1)', ...storageOptions)
      .click('.breadcrumbs a:nth-child(1)')
      .checkCurrentUrl(...storageOptions);
  });
});
