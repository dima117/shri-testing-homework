const gitTools = require('../../utils/git');
const moment = require('moment');
const { expect } = require('chai');
const {
  gitLog,
  timestampISOLikeFormat,
  exportGitLogRecordAsText
} = require('./stubs/git-log.stub');
const {
  treeSnapshotHash,
  getTreeSnapshotRecordAsText
} = require('./stubs/tree-snapshot.stub');
const fileContentsHash = require('./stubs/files-content.stub');

/**
 * Mocking actual git cli calls.
 * @param {string} cmd - Only 'git' is supported so far.
 * @param {string} gitCommand - 'show', 'ls-tree' and 'log' are supported
 * @param {*} args
 * @return {Promise<string>}
 */
function gitCliInterfaceMock(cmd, [gitCommand, ...args]) {
  let response;

  switch (gitCommand) {
    case 'show':
      response = fileContentsHash[args[0]];
      break;

    case 'log':
      const offset = args[3];
      const pageSize = args[5];

      response = gitLog
          .slice(offset, offset + pageSize)
          .reduce(
              (acc, record) => `${acc}${exportGitLogRecordAsText(record)}\n`,
              ''
          );
      break;

    case 'ls-tree':
      const [
        commitHash,
        path = ''
      ] = args;

      const treeSnapshot = treeSnapshotHash[commitHash][path];

      response = treeSnapshot.reduce(
          (acc, record) => `${acc}${getTreeSnapshotRecordAsText(record)}\n`,
          ''
      );

      break;
  }

  return Promise.resolve(response);
}

describe('git data fetcher', function() {
  'use strict';

  /**
   * Returns object form of the git log record in format used by the app.
   * @param {string} hash
   * @param {string} author
   * @param {number} timestamp
   * @param {string} msg
   * @return {{hash: *, author: *, timestamp: string, msg: *}}
   */
  function getGitLogRecordAsObj(
      [hash, author, timestamp, msg]
  ) {
    return {
      hash,
      author,
      timestamp: moment(timestamp).format(timestampISOLikeFormat),
      msg
    };
  }

  before(function() {
    gitTools.cliInterface = gitCliInterfaceMock;
  });

  describe('gitHistory method', function() {
    const tests = [{
      name: 'all git log records',
      args: [],
      expectation: gitLog.slice(0, 10)
    }, {
      name: 'second page of git log records',
      args: [2],
      expectation: gitLog.slice(10)
    }, {
      name: 'second page of  git log records with pageSize equal to 3',
      args: [2, 3],
      expectation: gitLog.slice(3, 6)
    }];

    tests.forEach(({ name, args, expectation }) => {
      describe(`gets ${name}`, function() {
        let list;

        before(async function() {
          list = await gitTools.gitHistory(...args);
        });

        it('returns expected number of commit records', function() {
          expect(list).to.be.an('array').that.is.not.empty;
          expect(list.length).to.equal(expectation.length);
        });

        it('returns records in expected format', function() {
          list.forEach(record => {
            expect(record).to.include.all.keys(
                'hash', 'author', 'timestamp', 'msg'
            );
          });
        });

        it('returns expected commit records in the list', function() {
          list.forEach((record, index) => {
            expect(record).to.include(
                getGitLogRecordAsObj(expectation[index])
            );
          });
        });
      });
    });
  });

  describe('gitFileTree method', function() {
    const tests = [{
      name: 'commit hash',
      hash: 'e91effac1a382d9569198e0625d5c979956e9870',
      path: ''
    }, {
      name: 'commit hash and path',
      hash: 'e91effac1a382d9569198e0625d5c979956e9870',
      path: 'utils/'
    }];

    tests.forEach(({ name, hash, path }) => {
      describe(`gets list of files based on ${name}`, function() {
        let list;
        let expectation;

        /**
         * Returns an object form of tree snapshot record used by the app.
         * @param {string} permissions
         * @param {string} type
         * @param {string} hash
         * @param {string} name
         * @return {{type: *, hash: *, path: *}}
         */
        function getTreeRecordAsObj([permissions, type, hash, name]) {
          return {
            type,
            hash,
            path: name
          };
        }

        before(async function() {
          list = await gitTools.gitFileTree(hash, path);
          expectation = treeSnapshotHash[hash][path];
        });

        it('returns a list of files with expected length', function() {
          expect(list).to.be.an('array').that.is.not.empty;
          expect(list.length).to.equal(expectation.length);
        });

        it('returns file records in expected format', function() {
          list.forEach(record => {
            expect(record).to.include.all.keys(
                'type', 'hash', 'path'
            );
          });
        });

        it('returns expected file records', function() {
          list.forEach((record, index) => {
            expect(record).to.include(
                getTreeRecordAsObj(expectation[index])
            );
          });
        });
      });
    });
  });

  describe('gitFileContent method', function() {
    describe('gets file contents by it\'s hash', function() {
      Object.keys(fileContentsHash).forEach(hash => {
        it('returns an expected non-empty string', async function() {
          const result = await gitTools.gitFileContent(hash);
          expect(result).to.be.a('string').that.is.not.empty;
          expect(result).to.equal(fileContentsHash[hash]);
        });
      });
    });
  });
});
