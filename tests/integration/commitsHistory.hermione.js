describe('Страница с историей коммитов:', () => {
  it('корректно отображается', function () {
    return this.browser
      .url('/')
      .assertView('plain', 'html');
  });


  it('по ссылкам в коммитах можно перейти к файловой системе', function () {
    const storage = {};
    const storageOptions = [storage, 'commitLink'];

    return this.browser
      .url('/')
      .saveElementHref('.commit:first-child .commit__link > a', ...storageOptions)
      .click('.commit:first-child .commit__link > a')
      .checkCurrentUrl(...storageOptions);
  });
});
