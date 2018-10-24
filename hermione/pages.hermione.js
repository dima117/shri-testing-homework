describe('Отображение страниц', () => {

  describe('История коммитов', () => {

    it('Корректность отображения', function() {
      return this.browser
        .url('/')
        .assertView('page view', 'body');
    });

  });

  describe('Файловая система', () => {

    it('Корректность отображения', function() {
      return this.browser
        .url('/files/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/')
        .assertView('page view', 'body');
    });

  });

  describe('Содержимое файла', () => {

    it('Корректность отображения', function() {
      return this.browser
        .url('/content/f135c5ab9197d1d0e3f5d6eb5e3da2a3a2125f3a/.editorconfig')
        .assertView('page view', 'body');
    });

  });

});
