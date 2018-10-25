const { resolve } = require('path');

const REPO = process.env.NODE_ENV === 'staging' ? resolve('./fixtures/repo.git') : resolve('.');

module.exports = {
  REPO
};
