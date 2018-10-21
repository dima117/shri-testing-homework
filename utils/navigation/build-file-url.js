module.exports = function buildFileUrl(parentHash, path) {
  return `/content/${parentHash}/${path}`;
}