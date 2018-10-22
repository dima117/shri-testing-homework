const expect = require('chai').expect;
const { buildBreadcrumbs } = require('../../utils/navigation');

it('параметры не переданы - в breadcrumbs всегда есть HISTORY на 1 месте', function() {
  // подготовка

  // действие
  const crumbs = buildBreadcrumbs();

  // проверка
  expect(crumbs[0].text).to.equal('HISTORY');
});

it('какие бы не были переданы параметры - в breadcrumbs HISTORY всегда на 1 месте', function() {
  // подготовка

  // действие
  const crumbs = buildBreadcrumbs('123', 'a/b/c/d.js');

  // проверка
  expect(crumbs[0].text).to.equal('HISTORY');
});

it('если передан хотя бы hash - в breadcrumbs всегда есть ROOT на 2 месте', function() {
  // подготовка

  // действие
  const crumbs = buildBreadcrumbs('123');

  // проверка
  expect(crumbs[1].text).to.equal('ROOT');
});

it('какие бы не были переданы параметры - в breadcrumbs всегда есть ROOT на 2 месте', function() {
  // подготовка

  // действие
  const crumbs = buildBreadcrumbs('123', 'a/b/c/d.js');

  // проверка
  expect(crumbs[1].text).to.equal('ROOT');
});

it('если переданы оба параметра, то для каждого сегмента пути формируется отдельный элемент breadcrumbs', function() {
  // подготовка

  // действие
  const crumbs = buildBreadcrumbs('123', 'a/b/c/d.js');

  const pathCrumbs = crumbs.slice(2);
  const paths = pathCrumbs.map(pathCrumb => {
    return pathCrumb.text;
  });

  // проверка
  expect(paths).to.deep.equal(['a', 'b', 'c', 'd.js']);

});

it('если не переданы параметры, то у последнего элемента в breadcrumbs нет ссылки', function() {
  // подготовка

  // действие
  const crumbs = buildBreadcrumbs();

  // проверка
  expect(crumbs[crumbs.length - 1].href).to.equal(undefined);
});

it('какие бы не были переданы параметры, у последнего элемента в breadcrumbs нет ссылки', function() {
  // подготовка

  // действие
  const crumbs = buildBreadcrumbs('123', 'a/b/c/d.js');

  // проверка
  expect(crumbs[crumbs.length - 1].href).to.equal(undefined);
});
