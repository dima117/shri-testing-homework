const assert = require('assert');
describe('Контент', () => {
  it('содержимое файла отобразилось', function () {
    return this.browser
      .buildUrl('content/b7e2f3447e3bcf2507a4162959a62389b48dada7/.gitignore')
      .assertView('plain', '.file-content')
      .isExisting('.file-content')
      .then((exists) => {
        assert.ok(exists, 'не появилось');
      });
  });

  it('список файлов отобразился', function () {
    return this.browser
      .buildUrl('files/b7e2f3447e3bcf2507a4162959a62389b48dada7/')
      .assertView('plain', '.content')
      .isExisting('.content')
      .then((exists) => {
        assert.ok(exists, 'не появился');
      });
  });
})