function buildFolderUrl(parentHash, path = '') {
  return `/files/${parentHash}/${path}`;
}

function buildFileUrl(parentHash, path) {
  return `/content/${parentHash}/${path}`;
}

function buildBreadcrumbs(hash, path) {

  const bc = [
    {
      text: 'HISTORY',
      href: hash ? '/' : undefined
    }
  ];

  if (hash) {
    const normalizedPath = (path || '').split('/').filter(Boolean);
    const [currentName] = normalizedPath.slice(-1);

    // root folder
    bc.push({
      text: 'ROOT',
      href: normalizedPath.length ? `/files/${hash}/` : undefined
    });

    // path
    let fullPath = '';
    for (let i = 0; i < normalizedPath.length - 1; i++) {
      const part = normalizedPath[i];
      fullPath += `${part}/`;
      bc.push({
        text: part,
        href: `/files/${hash}/${fullPath}`
      });
    }

    // last part
    currentName &&
      bc.push({
        text: currentName
      });
  }

  return bc;
}

module.exports = {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
};
