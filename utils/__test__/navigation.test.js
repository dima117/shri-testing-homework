const { expect } = require('chai');

const {
  buildBreadcrumbs,
} = require('../navigation');

describe('Создание хлебных крошек', () => {

  it('В хлебных крошках присутствует элемент, указывающий на главную страницу', () => {
    const breadcrumbs = buildBreadcrumbs();
    expect(breadcrumbs).to.have.lengthOf(1);
  });

  it('На странице второго уровня в хлебных крошках присутствует второй элемент', () => {
    const breadcrumbs = buildBreadcrumbs('hash');
    expect(breadcrumbs).to.have.lengthOf(2);
  });

  it('На страницах выше второго уровня в хлебные крошки добавляются элементы в соответствии с уровнем страницы', () => {
    const breadcrumbs = buildBreadcrumbs('hash', 'path/path');
    expect(breadcrumbs).to.have.lengthOf(4);
  });

  it('Последний элемент хлебных крошек никуда не ссылается', () => {
    const breadcrumbs = buildBreadcrumbs('hash', 'path/path');
    expect(breadcrumbs[breadcrumbs.length - 1]).to.not.have.property('href');
  });

});
