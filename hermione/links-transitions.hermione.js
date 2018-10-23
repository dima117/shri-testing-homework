const { expect } = require('chai');

describe('Transitions between pages by regular links', function () {
  it('should show commit files when goes from the main list of commits to the list of files', function showCommitFiles() {
    return this.browser
      .url('/')
      .click('.commit__href')
      .isExisting('.content--files')
      .then(exists => expect(exists).to.be.true);
  });

  it('should show content of a commit when goes from the list of files to the single file', function showFileContent() {
    return this.browser
      .url('/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/')
      .click('.files__link:first-of-type')
      .getText('.file-content')
      .then(text => expect(text)
        .to.equal('node_modules'));
  });

  it('should show the content of the views directory', function () {
    return this.browser
      .pause(200)
      .url('/files/33ecb5776706fc520a175b0e3b1541f2f11deffe/')
      .click('.files__link=views')
      .assertView('views-content', '.content--files ul');
  });
});


describe('Transitions between pages by breadcrumbs', () => {
  it('should traverse the entire breadcrumbs path', function () {
    return this.browser
      .pause(200)
      .url('/')
      .click('.commit__href')
      .pause(50)
      .click('.files__link=utils')
      .pause(50)
      .click('.files__link=git.js')
      .pause(50)
      .click('.breadcrumbs__link=ROOT')
      .pause(50)
      .click('.breadcrumbs__link=HISTORY')
      .getText('.breadcrumbs')
      .then(text => expect(text)
        .to.equal('HISTORY'));
  });
});
