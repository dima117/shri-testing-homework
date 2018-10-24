const { getBreadcrumbs } = require('../../utils/navigation');
const { expect } = require('chai');

const filesPrefix = '/files';

/**
 * Returns full path string based on prefix, commit hash and path as a list.
 * @param {string} hash
 * @param {string[]} path
 * @return {string}
 */
function getStateFullPath({ hash, path }) {
  const list = [];

  if (hash) {
    list.push(filesPrefix, hash);
  }

  return list.concat(path).join('/');
}

const states = {
  root: {
    name: 'HISTORY',
    path: ['/']
  },
  tree: {
    name: 'ROOT',
    path: [],
    hash: 'commit-hash'
  },
  package: {
    name: 'package.json',
    path: ['package.json'],
    hash: 'commit-hash'
  },
  controllers: {
    name: 'controllers',
    path: ['controllers'],
    hash: 'commit-hash'
  },
  indexController: {
    name: 'indexController.js',
    path: [
      'controllers',
      'indexController.js'
    ],
    hash: 'commit-hash'
  }
};

Object.values(states).forEach(state => {
  state.fullPath = getStateFullPath(state);
});

const longPath = [
  states.root,
  states.tree,
  states.controllers,
  states.indexController
];

const shortPath = [
  states.root,
  states.tree,
  states.package
];

const tests = [{
  name: 'files in the root folder',
  path: shortPath
}, {
  name: 'files in the nested folder',
  path: longPath
}];

describe('getBreadcrumbs method', function() {
  tests.forEach(({ name, path: test }) => {
    describe(`works for ${name}`, function() {
      test.forEach(({ name, path, hash, fullPath }, index) => {
        describe(`works for "${fullPath}" path`,
            function() {
              let result;
              let pathLength;

              before(function() {
                result = getBreadcrumbs(hash, path);
                pathLength = result.length;
              });

              it('returns expected number of states as an array', function() {
                expect(result).to.be.an('array').that.is.not.empty;
                expect(result.length).to.equal(index + 1);
              });

              it('states are returned in expected format', function() {
                result.forEach(state =>
                  expect(state).to.include.all.keys('text')
                );
              });

              it('returns expected states', function() {
                result.forEach(({ text, href }, index) => {
                  expect(text).to.equal(test[index].name);
                  if (index === pathLength - 1) {
                    expect(href).to.be.undefined;// leaf node
                  } else {
                    expect(href).to.equal(test[index].fullPath);
                  }
                });
              });
            });
      });
    });
  });
});
