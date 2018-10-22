const {buildFolderUrl, buildFileUrl} = require('../utils/navigation');

module.exports = {buildFileList, buildObjectUrl};

function buildFileList(hash, list) {
    return list.map(item => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split('/').pop()
    }));
}

function buildObjectUrl(parentHash, {path, type}) {
    switch (type) {
        case 'tree':
            return buildFolderUrl(parentHash, path);
        case 'blob':
            return buildFileUrl(parentHash, path);
        default:
            return '#';
    }
}