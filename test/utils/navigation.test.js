const { expect } = require('chai');

const {
  buildFolderUrl,
  buildFileUrl,
  buildObjectUrl,
  buildBreadcrumbs
} = require('../../utils/navigation');

describe('utils/navigation', () => {
  describe('buildFolderUrl', () => {
    it('should return url for path', () => {
      const parentHash = '1a2b3c4d5e';
      const path = 'image/logo.png';
      const result = buildFolderUrl(parentHash, path);
      expect(result).to.eq('/files/1a2b3c4d5e/image/logo.png');
    });

    it('should return url for non-existing path', () => {
      const parentHash = '1a2b3c4d5e';
      const result = buildFolderUrl(parentHash);
      expect(result).to.eq('/files/1a2b3c4d5e/');
    });
  });

  describe('buildFileUrl', () => {
    it('should return url', () => {
      const parentHash = '1a2b3c4d5e';
      const path = 'image/logo.png';
      const result = buildFileUrl(parentHash, path);
      expect(result).to.eq('/content/1a2b3c4d5e/image/logo.png');
    });
  });

  describe('buildObjectUrl', () => {
    it('should return url for type="tree"', () => {
      const parentHash = '1a2b3c4d5e';
      const path = 'image/logo.png';
      const type = 'tree';
      const result = buildObjectUrl(parentHash, { path, type });
      expect(result).to.eq('/files/1a2b3c4d5e/image/logo.png');
    });

    it('should return url for type="blob"', () => {
      const parentHash = '1a2b3c4d5e';
      const path = 'image/logo.png';
      const type = 'blob';
      const result = buildObjectUrl(parentHash, { path, type });
      expect(result).to.eq('/content/1a2b3c4d5e/image/logo.png');
    });

    it('should return # for other types"', () => {
      const parentHash = '1a2b3c4d5e';
      const path = 'image/logo.png';
      const type = 'anotherType';
      const result = buildObjectUrl(parentHash, { path, type });
      expect(result).to.eq('#');
    });
  });

  describe('buildBreadcrumbs', () => {
    it('should return array for non-existing hash and non-existing path', () => {
      const result = buildBreadcrumbs();
      expect(result).to.deep.eq([{ text: 'HISTORY', href: undefined }]);
    });

    it('should return array for hash and non-existing path', () => {
      const hash = 'bde400f34f89d8e88bf7c340795f53beffae9711';
      const result = buildBreadcrumbs(hash);
      expect(result).to.deep.eq([
        { text: 'HISTORY', href: '/' },
        { text: 'ROOT', href: undefined }
      ]);
    });

    it('should return array for hash and path (1 level deep)', () => {
      const hash = 'bde400f34f89d8e88bf7c340795f53beffae9711';
      const path = 'utils';
      const result = buildBreadcrumbs(hash, path);
      expect(result).to.deep.eq([
        { text: 'HISTORY', href: '/' },
        {
          text: 'ROOT',
          href: '/files/bde400f34f89d8e88bf7c340795f53beffae9711/'
        },
        { text: 'utils' }
      ]);
    });

    it('should return array for hash and path (2 level deep)', () => {
      const hash = 'bde400f34f89d8e88bf7c340795f53beffae9711';
      const path = 'utils/test';
      const result = buildBreadcrumbs(hash, path);
      expect(result).to.deep.eq([
        { text: 'HISTORY', href: '/' },
        {
          text: 'ROOT',
          href: '/files/bde400f34f89d8e88bf7c340795f53beffae9711/'
        },
        {
          text: 'utils',
          href: '/files/bde400f34f89d8e88bf7c340795f53beffae9711/utils/'
        },
        { text: 'test' }
      ]);
    });

    it('should return array for hash, path (1 level deep) and file', () => {
      const hash = 'bde400f34f89d8e88bf7c340795f53beffae9711';
      const path = 'public/styles.css';
      const result = buildBreadcrumbs(hash, path);
      expect(result).to.deep.eq([
        { text: 'HISTORY', href: '/' },
        {
          text: 'ROOT',
          href: '/files/bde400f34f89d8e88bf7c340795f53beffae9711/'
        },
        {
          text: 'public',
          href: '/files/bde400f34f89d8e88bf7c340795f53beffae9711/public/'
        },
        { text: 'styles.css' }
      ]);
    });

    it('should return array for hash, path (2 level deep) and file', () => {
      const hash = 'bde400f34f89d8e88bf7c340795f53beffae9711';
      const path = 'public/test/styles.css';
      const result = buildBreadcrumbs(hash, path);
      expect(result).to.deep.eq([
        { text: 'HISTORY', href: '/' },
        {
          text: 'ROOT',
          href: '/files/bde400f34f89d8e88bf7c340795f53beffae9711/'
        },
        {
          text: 'public',
          href: '/files/bde400f34f89d8e88bf7c340795f53beffae9711/public/'
        },
        {
          text: 'test',
          href: '/files/bde400f34f89d8e88bf7c340795f53beffae9711/public/test/'
        },
        { text: 'styles.css' }
      ]);
    });
  });
});
