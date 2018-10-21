const assert = require('assert')
const chai = require('chai')
const { expect } = chai

const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../utils/navigation')


describe('functions from utils/navigation.js', () => {
  describe('buildFolderUrl', () => {
    it('должен вернуть строку', () => {
      expect(buildFolderUrl('one')).to.be.a('string')
    })
    it('путь должен начинаться с /files/', () => {
      expect(buildFolderUrl('one')).to.have.string('/files/')
    })
  })

  describe('buildFileUrl', () => {
    it('должен вернуть строку', () => {
      expect(buildFileUrl('one', 'two')).to.be.a('string')
    })
    it('путь должен начинаться с /content/', () => {
      expect(buildFileUrl('one', 'two')).to.have.string('/content/')
    })
  })

  describe('buildBreadcrumbs', () => {

    it('длина возвращаемого массива должна быть больше 0', () => {
      expect(buildBreadcrumbs()).to.have.lengthOf.above(0)
    })

    it('объект в массиве должен иметь ключ text', () => {
      const [ bc ] = buildBreadcrumbs()
      expect(bc).to.have.any.keys('text')
    })

    it('при вызове без аргументов длина массива должна быть 1', () => {
      expect(buildBreadcrumbs()).to.have.lengthOf(1)
    })

    it('ключ href у последнего элемента массива должен быть undefined', () => {
      const breadcrumbs = buildBreadcrumbs('hash', '/path/to/file')
      const lastEl = breadcrumbs[breadcrumbs.length - 1]
      expect(lastEl.href).to.be.undefined
    })

  })
})
