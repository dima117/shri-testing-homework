describe('Content page', function() {
  it('should show file content', function() {
    const hash = '4104d1e02d19759f456c831fc16c5617a5b2584a';
    const file = '.gitignore';
    return this.browser
      .url(`/content/${hash}/${file}`)
      .assertView('plain', '.container');
  });
});
