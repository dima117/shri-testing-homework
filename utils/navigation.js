/**
 * Returns file folder URL.
 * @param {string} parentHash
 * @param {string=} path
 * @return {string}
 */
function buildFolderUrl(parentHash, path = '') {
  const url = `/files/${parentHash}`;

  if (path) {
    return `${url}/${path}`;
  }

  return url;
}

/**
 * Returns file URL.
 * @param {string} parentHash
 * @param {string=} path
 * @return {string}
 */
function buildFileUrl(parentHash, path = '') {
  return `/content/${parentHash}/${path}`;
}

/**
 * Returns a list of states down to the whole path passed.
 * @param {string=} hash
 * @param {string[]} normalizedPath
 * @return {string[]}
 */
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

/**
 * Converts list of state names into list of objects with name and href
 * properties.
 * @param {string=} hash
 * @param {string[]} routes
 * @return {Object[]}
 */
function addStateLinks(hash, routes) {
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
 * @return {Object[]}
 */
function getBreadcrumbs(hash = '', normalizedPath = []) {
  const routes = getStatePath(hash, normalizedPath);
  return addStateLinks(hash, routes);
}

module.exports = {
  buildFolderUrl,
  getBreadcrumbs,
  buildFileUrl
};
