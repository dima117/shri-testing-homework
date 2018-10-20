const {
  gitHistory,
  gitFileTree,
  gitFileContent
} = require('./git');

test('gitFileContent вызывает git с правильными аргументами', () => {
  const mockGitRunner = (args) => {
    expect(args[0]).toBe('show');
    expect(args[1]).toBe('this is hash');
  };

  gitFileContent({ hash: 'this is hash', gitRunner: mockGitRunner });
});

test('gitHistory вызывает git с правильными аргументами', () => {
  const mockGitRunner = (args) => {
    expect(args[0]).toBe('log');
    expect(args[4]).toBe(8);
    expect(args[6]).toBe(4);
  };

  gitHistory({ page: 3, size: 4, gitRunner: mockGitRunner });
});

test('gitFileTree вызывает git с правильными аргументами', () => {
  const mockGitRunner = (args) => {
    expect(args[0]).toBe('ls-tree');
    expect(args[1]).toBe('this is hash');
    expect(args[2]).toBe('this is path');
  };

  gitFileTree({ hash: 'this is hash', path: 'this is path', gitRunner: mockGitRunner });
});
