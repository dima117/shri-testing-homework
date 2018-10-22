/* eslint-disable no-undef */
const {buildObjectUrl} = require('../../utils/navigation');
const {buildBreadcrumbs} = require('../../utils/navigation');

describe('Формирование URL', function () {
  test('Маршрутизирует на content при типе blob', function () {
    const [hash, path, type] = ['565ca95a044cfa1c6e061a80374e9a9a77f5771e', 'somePath', 'blob'];
    const result = buildObjectUrl(hash, {path, type});
    expect(result).toEqual('/content/' + hash + '/' + path);
  });

  test('Маршрутизирует на files при типе tree', function () {
    const [hash, path, type] = ['565ca95a044cfa1c6e061a80374e9a9a77f5771e', 'somePath', 'tree'];
    const result = buildObjectUrl(hash, {path, type});
    expect(result).toEqual('/files/' + hash + '/' + path);
  });

  test('Маршрутизирует на # если тип не входит в список известных', function () {
    const [hash, path, wrongType] = ['565ca95a044cfa1c6e061a80374e9a9a77f5771e', 'somePath', 'wrongType'];
    const wrongTypeResult = buildObjectUrl(hash, {path, type: wrongType});
    expect(wrongTypeResult).toEqual('#');

  });

  test('Маршрутизирует на # если тип неопределен', function () {
    const [hash, path, undefinedType] = ['565ca95a044cfa1c6e061a80374e9a9a77f5771e', 'somePath', undefined];
    const undefinedTypeResult = buildObjectUrl(hash, {path, type: undefinedType});
    expect(undefinedTypeResult).toEqual('#');
  });

  test('Маршрутизирует на # если тип равен null', function () {
    const [hash, path, nullType] = ['someHash', 'somePath', null];
    const nullTypeResult = buildObjectUrl(hash, {path, type: nullType});
    expect(nullTypeResult).toEqual('#');
  });
});

describe('"Хлебные крошки"', function () {
  test('Возвращает "крошку" HISTORY со ссылкой на undefined при вызове без параметров', function () {
    // const [hash, path] = ['someHash', 'oneLevelPath'];
    const result = buildBreadcrumbs(hash = undefined, path = undefined);
    expect(result).toEqual([{
      text: 'HISTORY',
      href: undefined
    }]);
  });

  test('Возвращает "крошки" со ссылкой на HISTORY и ROOT коммита, если путь не задан', function () {
    // const [hash, path] = ['someHash', 'oneLevelPath'];
    const result = buildBreadcrumbs(hash = 'myPath', path = undefined);
    expect(result).toEqual([
      {'href': '/', 'text': 'HISTORY'},
      {'text': 'ROOT'}
    ]);
  });

  test('Возвращает "крошки" HISTORY, ROOT коммита и первый уровень пути внутри коммита', function () {
    const [hash, path] = ['565ca95a044cfa1c6e061a80374e9a9a77f5771e', 'oneLevelPath'];
    const result = buildBreadcrumbs(hash, path);
    expect(result).toEqual([
      {'href': '/', 'text': 'HISTORY'},
      {'href': '/files/' + hash + '/', 'text': 'ROOT'},
      {'text': path}
    ]);
  });

  test('Корректно работает на пути больше одного уровня внутри коммита', function () {
    const [hash, path] = ['565ca95a044cfa1c6e061a80374e9a9a77f5771e', 'one/two'];
    const result = buildBreadcrumbs(hash, path);
    expect(result).toEqual([
      {text: 'HISTORY', href: '/'},
      {text: 'ROOT', href: '/files/' + hash + '/'},
      {text: 'one', href: '/files/' + hash + '/one/'},
      {text: 'two'}]
    );
  });

  test('Обрезает "/", если он указан в конце пути', function () {
    const [hash, path] = ['565ca95a044cfa1c6e061a80374e9a9a77f5771e', '/one/two/'];
    const result = buildBreadcrumbs(hash, path);
    expect(result).toEqual([
      {text: 'HISTORY', href: '/'},
      {text: 'ROOT', href: '/files/' + hash + '/'},
      {text: 'one', href: '/files/' + hash + '/one/'},
      {text: 'two'}]
    );
  });
});
