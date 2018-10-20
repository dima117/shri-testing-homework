module.exports = {
    "extends": "airbnb-base",
    "rules": {
      "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
      "no-underscore-dangle": ["error", { "allow": ["_executeFileFake"] }],
      "no-shadow": ["error", { "allow": ["resolve", "reject", "done", "cb"] }]
    }
};
