const assert = require('assert');
describe('История коммитов', () => {

   it('Правильно отображается хедер контейнера коммитов', function () {
      return this.browser
          .url('/')
          .assertView('plain', '.breadcrumbs')
   });


   it('Отображается содержимое контейнера коммитов', function () {
      return this.browser
          .url('/')
          .assertView('plain', '.container:last-child')
   });

});