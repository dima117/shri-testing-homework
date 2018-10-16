const assert = require('assert')
const chai = require('chai')
const { expect } = chai

const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../utils/navigation')


describe('functions from utils/navigation.js', () => {
  describe('buildFolderUrl', () => {
    it('должен вернуть строку', () => {
      expect(buildFolderUrl('one')).to.be.a('string')
    })
  })

  describe('buildFileUrl', () => {
    it('должен вернуть строку', () => {
      expect(buildFileUrl('one', 'two')).to.be.a('string')
    })
  })

  describe('buildBreadcrumbs', () => {
    it('должен вернуть массив', () => {
      expect(buildBreadcrumbs('root')).to.be.a('array')
    })

    it('длина возвращаемого массива должны быть больше 0', () => {
      expect(buildBreadcrumbs()).to.have.lengthOf.above(0)
    })

    it('объект в массиве должен иметь ключ text', () => {
      const [ bc ] = buildBreadcrumbs()
      expect(bc).to.have.any.keys('text')
    })

  })
})
