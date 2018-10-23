function buildObjectUrl (parentHash, objectPath) {
  if (!parentHash || !objectPath) {
    return '#';
  }
  const TYPE_ACCORD = {
    tree: 'files',
    blob: 'content'
  };
  const { path = '', type } = objectPath;

  if (!type || !TYPE_ACCORD[type]) {
    return '#';
  }

  return `/${TYPE_ACCORD[type]}/${parentHash}/${path}`
}

function buildBreadcrumbs (hash, path) {
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
  buildObjectUrl,
  buildBreadcrumbs
};
