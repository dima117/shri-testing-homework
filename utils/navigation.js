function buildFolderUrl(parentHash, path = '') {
  return `/files/${parentHash}/${path}`;
}

function buildFileUrl(parentHash, path) {
  return `/content/${parentHash}/${path}`;
}

function buildBreadcrumbs(hash = '', path = '') {
  const list = [{
    text: 'HISTORY',
    href: hash ? '/' : undefined
  }];

  if (!hash) {
    return list;
  }

  const normalizedPath = path.split('/').filter(Boolean);
  const [currentName] = normalizedPath.slice(-1);

  const havePath = !!normalizedPath.length;

  // root folder
  list.push({
    text: 'ROOT',
    href: havePath ? `/files/${hash}/` : undefined
  });

  if (!havePath) {
    return list;
  }

  // path
  let fullPath = '';
  for (let i = 0; i < normalizedPath.length - 1; i++) {
    const part = normalizedPath[i];
    fullPath += `${part}/`;

    list.push({
      text: part,
      href: `/files/${hash}/${fullPath}`
    });
  }

  // last part
  list.push({
    text: currentName
  });

  return list;
}

module.exports = {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
};
