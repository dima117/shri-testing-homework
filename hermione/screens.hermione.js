describe('entire pages screen matching', () => {
  it('should match index page', function () {
    return this.browser
      .pause(200)
      .url('/')
      .assertView('main-page', '.container');
  });

  it('should match ROOT page', function () {
    return this.browser
      .pause(200)
      .url('/files/33ecb5776706fc520a175b0e3b1541f2f11deffe/')
      .assertView('root-page', '.container');
  });

  it('should match file page', function () {
    return this.browser
      .pause(200)
      .url('/content/742674a8dcfcf639779791165d7d281a3ce95381/package.json')
      .assertView('file-page', '.container');
  });
});
