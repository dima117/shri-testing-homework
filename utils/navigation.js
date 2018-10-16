function buildFolderUrl({hash, path}) {
    return `/files/${hash}/${path}`;
}

module.exports = {
    buildFolderUrl
};