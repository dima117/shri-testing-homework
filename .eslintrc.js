module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-underscore-dangle": ["error", { "allow": [
      "_executeFileFake",
      "_setExecuteFileFake",
      "_fakeREPO",
      "_renderFake",
      "_buildBreadcrumbsFake",
      "_gitFileContentFake",
      "_gitFileTreeFake",
      "_buildFileUrlFake",
      "_buildFolderUrlFake",
      "_gitHistoryFake",
    ] }],
    "no-shadow": ["error", { "allow": ["resolve", "reject", "done", "cb"] }],
    "no-param-reassign": ["error", { "props": false }],
    "no-unused-vars": ["error", { "args": "none" }],
    "func-names": "off",
    "no-unused-expressions": "off",
  },
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "describe": true,
    "it": true,
  }
};
