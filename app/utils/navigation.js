function buildFolderUrl(parentHash, path = '') {
    return `/files/${parentHash}/${path}`;
}

function buildFileUrl(parentHash, path) {
    return `/content/${parentHash}/${path}`;
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
    buildFolderUrl,
    buildFileUrl,
    buildObjectUrl
};
