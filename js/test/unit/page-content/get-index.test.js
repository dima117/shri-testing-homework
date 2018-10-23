const { getIndex } = require('../../../utils/page-content');
const { assert, expect } = require('chai');

suite(`getIndex`, () => {
  test(`should return empty list if history is not array`, () => {
    const history = 'lol';
    const actual = getIndex(history).list;

    assert.isEmpty(actual);
  });

  test(`should return empty list if history is empty array`, () => {
    const history = [];
    const actual = getIndex(history).list;

    assert.isEmpty(actual);
  });

  test(`should return correct length`, () => {
    const history = [
      {
        hash: 'b4427cfc3e128ae2aaf48aefee04dd6324960e9a',
        author: 'test author',
        timestamp: '2018-10-22 15:16:16 +0300',
        msg: 'test msg 1'
      },
      {
        hash: '0820a306a564df6b0e5d3e7bac08abc5c5650006',
        author: 'test author',
        timestamp: '2018-10-22 15:13:40 +0300',
        msg: 'test msg 2'
      },
      {
        hash: '0820a306a564df6b0e5d3e7bac08abc5c5650006',
        author: 'test author',
        timestamp: '2018-10-22 15:23:40 +0300',
        msg: 'test msg 3'
      }
    ];

    const actual = getIndex(history).list.length;
    const expect = 3;

    assert.strictEqual(actual, expect);
  });

  test(`should return object with correct property`, () => {
    const history = [
      {
        hash: 'b4427cfc3e128ae2aaf48aefee04dd6324960e9a',
        author: 'test author',
        timestamp: '2018-10-22 15:16:16 +0300',
        msg: 'test msg'
      },
      {
        hash: '0820a306a564df6b0e5d3e7bac08abc5c5650006',
        author: 'test author',
        timestamp: '2018-10-22 15:13:40 +0300',
        msg: 'test msg'
      }
    ];
    const result = getIndex(history);

    expect(result).to.have.property('title', 'history');
    expect(result).to.have.property('breadcrumbs');
    expect(result.list[0]).to.have.property('href', `/files/${history[0].hash}/`);
  });
});
