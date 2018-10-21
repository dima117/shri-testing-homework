const git = require('./git');
const fs = require('fs');

test('gitHistory вызывает git с правильными аргументами', () => {
  git.injectGitExec((cmd, args, cwd, f) => {
    expect(cmd).toBe('git');
    expect(args).toEqual(['log',
      '--pretty=format:%H%x09%an%x09%ad%x09%s',
      '--date=iso',
      '--skip',
      8,
      '-n',
      4]);
    f(null, 'dummy');
  });

  git.gitHistory(3, 4).then();
});

test('gitHistory правильно парсит информацию из git', () => {
  const rawGitHist = fs.readFileSync('./tests/git-history-raw.txt', 'utf8');
  const expectedGitHist = JSON.parse(fs.readFileSync('./tests/git-history-expected.json', 'utf8'));
  expect.assertions(1);

  git.injectGitExec((cmd, args, cwd, f) => {
    f(null, rawGitHist);
  });

  return git.gitHistory(1, 20).then(h => {
    expect(h).toEqual(expectedGitHist);
  });
});

test('gitFileTree вызывает git с правильными аргументами', () => {
  git.injectGitExec((cmd, args, cwd, f) => {
    expect(cmd).toBe('git');
    expect(args).toEqual(['ls-tree',
      'hahash',
      'papath']);
    f(null, 'dummy');
  });

  git.gitFileTree('hahash', 'papath').then();
});

test('gitFileTree правильно парсит информацию из git', () => {
  const rawGitFileTree = fs.readFileSync('./tests/git-filetree-raw.txt', 'utf8');
  const expectedGitFileTree = JSON.parse(fs.readFileSync('./tests/git-filetree-expected.json', 'utf8'));
  expect.assertions(1);

  git.injectGitExec((cmd, args, cwd, f) => {
    f(null, rawGitFileTree);
  });

  return git.gitFileTree('172001aeb63bdfc4e3f01f29e30876022cf6ad45', '').then(h => {
    expect(h).toEqual(expectedGitFileTree);
  });
});

test('gitFileContent вызывает git с правильными аргументами', () => {
  git.injectGitExec((cmd, args, cwd, f) => {
    expect(cmd).toBe('git');
    expect(args).toEqual(['show', 'hahash']);
    f(null, 'dummy');
  });

  git.gitFileContent('hahash').then();
});

test('gitFileContent правильно парсит информацию из git', () => {
  const rawGitFileContent = fs.readFileSync('./tests/git-filecontent-raw.txt', 'utf8');
  const expectedGitFileContent = JSON.parse(fs.readFileSync('./tests/git-filecontent-expected.json', 'utf8'));
  expect.assertions(1);

  git.injectGitExec((cmd, args, cwd, f) => {
    f(null, rawGitFileContent);
  });

  return git.gitFileContent('172001aeb63bdfc4e3f01f29e30876022cf6ad45').then(h => {
    expect(h).toEqual(expectedGitFileContent);
  });
});
