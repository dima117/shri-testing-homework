const {expect} = require('chai');
const {addParamsToFile} = require('../controllers/filesController');

it('addParamsToFile: добавляет href и name к файлу', () => {
  const item = {
    type: 'blob',
    hash: '1fdb572',
    path: 'views/view.hbs'
  };

  const result = addParamsToFile(item, 'cc22842');
  expect(result).to.deep.equal({
    ...item,
    href: '/content/cc22842/views/view.hbs',
    name: 'view.hbs'
  })
});
