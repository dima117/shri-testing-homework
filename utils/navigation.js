function buildFolderUrl(parentHash, path = '') {
  return `/files/${parentHash}/${path}`;
}

function buildFileUrl(parentHash, path) {
  return `/content/${parentHash}/${path}`;
}


module.exports = {
  buildFolderUrl,
  buildFileUrl
};
