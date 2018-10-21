const {expect} = require('chai');
const {addParamsToHistoryItem} = require('../controllers/indexController');

it('addParamsToHistoryItem: добавляет href к элементу истории', () => {
  const item = {
    hash: '38429bed9',
    author: 'userName',
    timestamp: '2018-10-15 13:22:09 +0300',
    msg: 'message'
  };

  const result = addParamsToHistoryItem(item);
  expect(result).to.deep.equal({
    ...item,
    href: '/files/38429bed9/'
  })
});
