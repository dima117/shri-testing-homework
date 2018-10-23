const treeSnapshotHash = {
  e91effac1a382d9569198e0625d5c979956e9870: {
    '': [// root folder
      [
        '100644',
        'blob',
        'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
        '.gitignore'
      ], [
        '100644',
        'blob',
        'aa45e21c29a47bba4c8428e62311df5b563ee15d',
        'app.js'
      ], [
        '040000',
        'tree',
        '8b4a09f575b860abf8076352354858d8e9f3a617',
        'bin'
      ], [
        '040000',
        'tree',
        '714aff70b19d083d688ab1a55de74f7da93ba5ef',
        'controllers'
      ], [
        '100644',
        'blob',
        'bbf3076fce71449c5da4419200d0c9506ae204f3',
        'package-lock.json'
      ], [
        '100644',
        'blob',
        'f735db02056e29dde140bbe28a6ff46fa9bc010e',
        'package.json'
      ], [
        '040000',
        'tree',
        'f1b534fe4b6836243e4e5444a7f32dedb1d6f389',
        'public'
      ], [
        '040000',
        'tree',
        'ed4e902a217aa169a3407b13372568ffb473f76d',
        'utils'
      ], [
        '040000',
        'tree',
        '74631517771aaa83978a1f167fb4a279dc397f6d',
        'views'
      ]
    ],
    'utils/': [
      [
        '100644',
        'blob',
        'febe1c6b6b9b9fd1b9f20ee241f34b7e6c2d75eb',
        'utils/git.js'
      ], [
        '100644',
        'blob',
        '718fbfc1f7cb5bd87ef883db9646d1b9f3f1efb7',
        'utils/navigation.js'
      ]
    ]
  }
};

/**
 * Returns text representation of the file in same format GIT is using.
 * @param {string} permissions
 * @param {string} type
 * @param {string} hash
 * @param {string} name
 * @return {string}
 */
function getTreeSnapshotRecordAsText([permissions, type, hash, name]) {
  return `${permissions} ${type} ${hash}\t${name}`;
}

module.exports = {
  treeSnapshotHash,
  getTreeSnapshotRecordAsText
};
