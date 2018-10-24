/* eslint-disable no-undef */
const {buildObjectUrl} = require('../../utils/navigation');
const {buildBreadcrumbs} = require('../../utils/navigation');

describe('Формирование URL', () => {
  test('Маршрутизирует на content при типе blob', () => {
    const [hash, path, type] = ['hash12345', 'somePath', 'blob'];
    const result = buildObjectUrl(hash, {path, type});
    expect(result).toEqual('/content/' + hash + '/' + path);
  });

  test('Маршрутизирует на files при типе tree', () => {
    const [hash, path, type] = ['hash12345', 'somePath', 'tree'];
    const result = buildObjectUrl(hash, {path, type});
    expect(result).toEqual('/files/' + hash + '/' + path);
  });

  test('Маршрутизирует на # если тип не входит в список известных', () => {
    const [hash, path, wrongType] = ['hash12345', 'somePath', 'wrongType'];
    const wrongTypeResult = buildObjectUrl(hash, {path, type: wrongType});
    expect(wrongTypeResult).toEqual('#');

  });

  test('Маршрутизирует на # если тип неопределен', () => {
    const [hash, path, undefinedType] = ['hash12345', 'somePath', undefined];
    const undefinedTypeResult = buildObjectUrl(hash, {path, type: undefinedType});
    expect(undefinedTypeResult).toEqual('#');
  });

  test('Маршрутизирует на # если тип равен null', () => {
    const [hash, path, nullType] = ['someHash', 'somePath', null];
    const nullTypeResult = buildObjectUrl(hash, {path, type: nullType});
    expect(nullTypeResult).toEqual('#');
  });
});

describe('"Хлебные крошки"', () => {
  test('Возвращает "крошку" HISTORY со ссылкой на undefined при вызове без параметров', () => {
    // const [hash, path] = ['someHash', 'oneLevelPath'];
    const result = buildBreadcrumbs(hash = undefined, path = undefined);
    expect(result).toEqual([{
      text: 'HISTORY',
      href: undefined
    }]);
  });

  test('Возвращает "крошки" со ссылкой на HISTORY и ROOT коммита, если путь не задан', () => {
    // const [hash, path] = ['someHash', 'oneLevelPath'];
    const result = buildBreadcrumbs(hash = 'myPath', path = undefined);
    expect(result).toEqual([
      {'href': '/', 'text': 'HISTORY'},
      {'text': 'ROOT'}
    ]);
  });

  test('Возвращает "крошки" HISTORY, ROOT коммита и первый уровень пути внутри коммита', () => {
    const [hash, path] = ['hash12345', 'oneLevelPath'];
    const result = buildBreadcrumbs(hash, path);
    expect(result).toEqual([
      {'href': '/', 'text': 'HISTORY'},
      {'href': '/files/' + hash + '/', 'text': 'ROOT'},
      {'text': path}
    ]);
  });

  test('Корректно работает на пути больше одного уровня внутри коммита', () => {
    const [hash, path] = ['hash12345', 'one/two'];
    const result = buildBreadcrumbs(hash, path);
    expect(result).toEqual([
      {text: 'HISTORY', href: '/'},
      {text: 'ROOT', href: '/files/' + hash + '/'},
      {text: 'one', href: '/files/' + hash + '/one/'},
      {text: 'two'}]
    );
  });

  test('Обрезает "/", если он указан в конце пути', () => {
    const [hash, path] = ['hash12345', '/one/two/'];
    const result = buildBreadcrumbs(hash, path);
    expect(result).toEqual([
      {text: 'HISTORY', href: '/'},
      {text: 'ROOT', href: '/files/' + hash + '/'},
      {text: 'one', href: '/files/' + hash + '/one/'},
      {text: 'two'}]
    );
  });
});
