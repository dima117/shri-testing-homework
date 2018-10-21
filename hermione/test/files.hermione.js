describe('Files page', function() {
  it('should show files', function() {
    const hash = '4104d1e02d19759f456c831fc16c5617a5b2584a';
    return this.browser
      .url(`/files/${hash}/`)
      .assertView('plain', '.container');
  });
});
