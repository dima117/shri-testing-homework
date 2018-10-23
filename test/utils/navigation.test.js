const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../../utils/navigation');

describe('navigation', function() {
  describe('buildFolderUrl', function() {
    it('returns folder url without additional path', function() {
      const folderUrl = buildFolderUrl('be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca');

      expect(folderUrl).to.equal('/files/be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca/');
    });

    it('returns folder url with additional path', function() {
      const hash = 'be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca';
      const path = 'test/controllers';
      const expected = '/files/be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca/test/controllers';

      const folderUrl = buildFolderUrl(hash, path);

      expect(folderUrl).to.equal(expected);
    });
  });

  describe('buildFileUrl', function() {
    it('returns file url', function() {
      const hash = 'be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca';
      const path = 'controllers/contentController.js';
      const expected = '/content/be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca/controllers/contentController.js';

      const fileUrl = buildFileUrl(hash, path);

      expect(fileUrl).to.equal(expected);
    });
  });

  describe('buildBreadcrumbs', function() {
    it('adds HISTORY without a link if no args provided', function() {
      const expected = [
        {
          text: 'HISTORY',
          href: undefined
        }
      ];

      const breadcrumbs = buildBreadcrumbs();

      expect(breadcrumbs).to.deep.equal(expected);
    });

    it('adds HISTORY with a link if hash arg is provided', function() {
      const hash = 'be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca';
      const expected = {
        text: 'HISTORY',
        href: '/'
      };

      const breadcrumbs = buildBreadcrumbs(hash);

      expect(breadcrumbs[0]).to.deep.equal(expected);
    });

    it('adds ROOT without a link if only hash is provided', function () {
      const hash = 'be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca';
      const expected = {
        text: 'ROOT',
        href: undefined
      };

      const breadcrumbs = buildBreadcrumbs(hash);

      expect(breadcrumbs[1]).to.deep.equal(expected);
    });

    it('adds ROOT with a link if hash and path are provided', function () {
      const hash = 'be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca';
      const path = 'foo/bar/baz.js'
      const expected = {
        text: 'ROOT',
        href: '/files/be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca/'
      };

      const breadcrumbs = buildBreadcrumbs(hash, path);

      expect(breadcrumbs[1]).to.deep.equal(expected);
    });  

    it('adds path items with links for every part of the path but the last one if path arg is provided', function() {
      const hash = 'be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca';
      const path = 'foo/bar/baz.js'

      const expected = [
        {
          text: 'foo',
          href: '/files/be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca/foo/'
        },
        {
          text: 'bar',
          href: '/files/be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca/foo/bar/'
        }
      ];

      const breadcrumbs = buildBreadcrumbs(hash, path);

      expect(breadcrumbs[2]).to.deep.equal(expected[0]);
      expect(breadcrumbs[3]).to.deep.equal(expected[1]);
    });

    it('adds the last part of the path without a link', function() {
      const hash = 'be4a6de414b0d24cee37b3cc0ccbfc5216ea4cca';
      const path = 'foo/bar/baz.js'
      const expected = {
        text: 'baz.js'
      };

      const breadcrumbs = buildBreadcrumbs(hash, path);

      expect(breadcrumbs).to.have.length(5);
      expect(breadcrumbs[4]).to.deep.equal(expected);
    });
  });
});