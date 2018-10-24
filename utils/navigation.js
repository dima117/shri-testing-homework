function buildFolderUrl(parentHash, path = '') {
  const url = `/files/${parentHash}`;

  if (path) {
    return `${url}/${path}`;
  }

  return url;
}

function buildFileUrl(parentHash, path = '') {
  return `/content/${parentHash}/${path}`;
}

function getStatePath(hash, normalizedPath) {
  const list = ['HISTORY'];

  if (!hash) {
    return list;
  }

  list.push('ROOT');

  if (!normalizedPath.length) {
    return list;
  }

  return list.concat(normalizedPath);
}

function getBreadcrumbs_(hash, routes) {
  const { length } = routes;

  let fullPath = '';

  return routes.map((name, index) => {
    let path = undefined;

    switch (index) {
      case 0:// history
        if (hash) {
          path = '/';
        }
        break;

      case 1:// ROOT
        if (routes.length > 2) {
          path = buildFolderUrl(hash);
        }
        break;

      case length - 1: // leaf node
        break;

      default:// file folders
        fullPath += `${name}`;
        path = buildFolderUrl(hash, fullPath);
        fullPath += `/`;
    }

    return {
      text: name,
      href: path
    };
  });
}

/**
 * Returns list of routes/states down to the current state.
 * @param {string} hash
 * @param {string[]} normalizedPath
 * @return {{text: string, href: string}[]}
 */
function getBreadcrumbs(hash = '', normalizedPath = []) {
  const routes = getStatePath(hash, normalizedPath);
  return getBreadcrumbs_(hash, routes);
}

module.exports = {
  buildFolderUrl,
  getBreadcrumbs,
  buildFileUrl
};
