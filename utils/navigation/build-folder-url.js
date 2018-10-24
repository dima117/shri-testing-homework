module.exports = function buildFolderUrl(parentHash, path = '') {
  return `/files/${parentHash}/${path}`;
}