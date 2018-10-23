const buildFolderUrl = jest.fn(
  () => "/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/"
);

const buildBreadcrumbs = jest.fn(() => [
  {
    text: "HISTORY",
    href: undefined
  }
]);

module.exports = {
  buildFolderUrl,
  buildBreadcrumbs
};
