const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require('./navigation');

test('buildBreadcrumbs вызов без параметров включает в себя только HISTORY', () => {
  const bc = buildBreadcrumbs();
  expect(bc.length).toBe(1);
  expect(bc[0]).toEqual({ text: 'HISTORY', href: undefined });
});

test('buildBreadcrumbs вызов с hash и без path содержит только HISTORY и ROOT', () => {
  const bc = buildBreadcrumbs('hash');
  expect(bc.length).toBe(2);
  expect(bc[0]).toEqual({ text: 'HISTORY', href: '/' });
});

test('buildBreadcrumbs вызов с path глубиной в 1 уровень', () => {
  const bc = buildBreadcrumbs('hahash', 'first');
  expect(bc.length).toBe(3);
  expect(bc[0]).toEqual({ text: 'HISTORY', href: '/' });
  expect(bc[1]).toEqual({ text: 'ROOT', href: '/files/hahash/' });
  expect(bc[2]).toEqual({ text: 'first' });
});

test('buildBreadcrumbs вызов с path глубиной в 15 уровней', () => {
  let path = '';
  for (let i = 0; i < 15; i++) {
    path += '/' + i;
  }
  const bc = buildBreadcrumbs('hahash', path);
  expect(bc.length).toBe(17);
  expect(bc[0]).toEqual({ text: 'HISTORY', href: '/' });
  expect(bc[1]).toEqual({ text: 'ROOT', href: '/files/hahash/' });
  expect(bc[2]).toEqual({ text: '0', href: '/files/hahash/0/' });
  expect(bc[15]).toEqual({ text: '13', href: '/files/hahash/0/1/2/3/4/5/6/7/8/9/10/11/12/13/' });
});

test('buildFolderUrl возвращает правильную ссылку', () => {
  expect(buildFolderUrl('hash', 'path')).toBe('/files/hash/path');
  expect(buildFolderUrl('hash')).toBe('/files/hash/');
});

test('buildFileUrl возвращает правильную ссылку', () => {
  expect(buildFileUrl('parentHash', 'path')).toBe('/content/parentHash/path');
});
