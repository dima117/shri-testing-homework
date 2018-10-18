const {
    buildFolderUrl,
    buildFileUrl,
    buildBreadcrumbs
} = require('../utils/navigation');

const prepareIndex = (history) => {
    const list = history.map(item => ({
      ...item,
      href: buildFolderUrl(item.hash, '')
    }));
  
    return {
      title: 'history',
      breadcrumbs: buildBreadcrumbs(),
      list
    };
}

const prepareContent = (content, hash, path) => {
    return {
        title: 'content',
        breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
        content
    }
}

const prepareFiles = (list, hash, pathParam) => {
    const files = list.map(item => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split('/').pop()
    }));

    return {
        title: 'files',
        breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
        files
    };
}

function buildObjectUrl(parentHash, { path, type }) {
    switch (type) {
        case 'tree':
            return buildFolderUrl(parentHash, path);
        case 'blob':
            return buildFileUrl(parentHash, path);
        default:
            return '#';
    }
}

module.exports = {
    prepareIndex,
    prepareContent,
    prepareFiles
}