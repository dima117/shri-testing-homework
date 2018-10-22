const { buildBreadcrumbs } = require('../../utils/navigation');
const { expect } = require('chai');
const commitName = '90180910fc27a11272a3e5caeeb119a51e5c0545';

describe('testing \'buildBreadcrumbs\' function', () => {
  describe('the hash is not present', () => {
    it('should return undefined', () => {
      const result = [
        {
          href: undefined,
          text: 'HISTORY'
        }
      ];
      const breadcrumbs = buildBreadcrumbs();
      expect(breadcrumbs).to.deep.equal(result);
    });
  });

  describe('the path is not present', () => {
    it('should return paths to HISTORY and ROOT', () => {
      const result = [
        {
          href: '/',
          text: 'HISTORY'
        },
        {
          href: undefined,
          text: 'ROOT'
        }
      ];
      const breadcrumbs = buildBreadcrumbs(commitName);
      expect(breadcrumbs).to.deep.equal(result);
    });
  });

  describe('passing in function commit number and folder name', () => {
    it('should return paths to HISTORY, ROOT and folder name', () => {
      const result = [
        {
          href: '/',
          text: 'HISTORY'
        },
        {
          href: `/files/${commitName}/`,
          text: 'ROOT'
        },
        {
          text: 'controllers'
        }
      ];
      const path = 'controllers';
      const breadcrumbs = buildBreadcrumbs(commitName, path);
      expect(breadcrumbs).to.deep.equal(result);
    });
  });
});
