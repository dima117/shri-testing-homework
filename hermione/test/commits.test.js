describe('Commits page', function() {
  it('should show commit history', function() {
    return this.browser.url('/').assertView('plain', '.content');
  });
});
