const assert = require('assert')
const expect = require('chai').expect
const sinon = require('sinon')

const controller = require('../controllers/contentController')

describe('controllers/contentController.js', () => {
  const req = {
    params : { '0': 'README.md', hash: 'ce02833' }
  }
  const resSpy = { render: sinon.spy() }
  const nextSpy = sinon.spy()

  it('render не запустится, если в файле нет контента', async () => {
    const stubFileTree = sinon.stub()
    const stubFileContent = sinon.stub()
    stubFileTree.returns(Promise.resolve([{ type: 'blob' }]))
    stubFileContent.returns(Promise.resolve(''))

    await controller(req, resSpy, nextSpy, stubFileTree, stubFileContent)

    expect(resSpy.render.called).to.be.false
    expect(nextSpy.called).to.be.true
  })

  it('если тип файла не blob - gitFileContent не будет вызван', async () => {
    const stubFileTree = sinon.stub()
    const spyFileContent = sinon.stub()
    stubFileTree.returns(Promise.resolve([{ type: 'tree' }]))

    await controller(req, resSpy, nextSpy, stubFileTree, spyFileContent)
    expect(spyFileContent.called).to.be.false
  })
})
