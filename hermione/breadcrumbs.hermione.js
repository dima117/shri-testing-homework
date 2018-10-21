const assert = require('assert');

const testUtl = 'http://localhost:3000/';
const testUtlFile = 'http://localhost:3000/files/90180910fc27a11272a3e5caeeb119a51e5c0545/';
const testUtlContent = 'http://localhost:3000/content/90180910fc27a11272a3e5caeeb119a51e5c0545/package.json/';

describe('Переходы по хлебным крошкам', () => {
  it('History', function () {
    // const firstCommit = document.querySelector('.commit:first-child a').text;
    // console.log(`tezt: $/{firstCommit}`);
    return this.browser
      .url('http://localhost:3000/')
      .assertView('plain', '.content');
  });
});
