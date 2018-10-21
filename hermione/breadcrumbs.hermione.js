describe('Переходы по хлебным крошкам', function() {
  it('Переход по хлебным крошкам -> history', function() {
    return this.browser
      .url('/content/cff629dc13a66cb198b1415bc4125b1838ee5e72/tree/index.js')
      .click('.breadcrumbs a')
      .assertExists('.content .commit', 'Содержимое истории при переходе по хлебным крошкам не отображается')
      .assertView('plain', '.content .commit');
  });
  it('Переход по хлебным крошкам -> root', function() {
    return this.browser
      .url('/content/cff629dc13a66cb198b1415bc4125b1838ee5e72/tree/index.js')
      .click('.breadcrumbs a:nth-child(2)')
      .assertExists('.content ul', 'Содержимое коммита при переходе по хлебным крошкам не отображается')
      .assertView('plain', '.content ul');
  });
  it('Переход по хлебным крошкам -> tree', function() {
    return this.browser
      .url('/content/cff629dc13a66cb198b1415bc4125b1838ee5e72/tree/index.js')
      .click('.breadcrumbs a:nth-child(3)')
      .assertExists('.content ul', 'Содержимое папки при переходе по хлебным крошкам не отображается')
      .assertView('plain', '.content ul');
  });
});
