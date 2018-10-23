const gitHistory = jest.fn(() =>
  Promise.resolve([
    {
      hash: "38429bed94bd7c107c65fed6bffbf443ff0f4183",
      author: "Dmitry Andriyanov",
      timestamp: "2018-10-15 13:22:09 +0300",
      msg: "заготовка приложения"
    }
  ])
);

const executeGit = jest.fn(() =>
  Promise.resolve(
    "100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore\n100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8\tREADME.md"
  )
);

const parseFileTreeItem = jest.fn();

const gitFileTree = jest.fn(() => Promise.resolve());

module.exports = {
  gitHistory,
  executeGit,
  parseFileTreeItem
};
