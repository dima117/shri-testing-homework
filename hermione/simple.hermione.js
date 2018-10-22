const assert = require('assert');

describe ( 'loadContent', () => {
  it ('loadContent', function() {
    return this.browser
      // .loadContent('./', 'don\'t load main commits page')
      .url('./')
      .isExisting('.content')
      .then ((exists) => {
        assert.ok(exists, 'ok1')
      })
      .click('.commit__link a')
      .selectByAttribute('a', 'href', /\./)

      // .getUrl()
      // .then ((url) => {
      //
      //   console.log('!!!!!!!!!!!!!!');
      //   console.log(url);
      //   console.log(url.lastIndexOf('/', url.length - 1));
      //   assert.ok(true, 'hkhk')
      // })

      // .then ((url) => {
      //   let test = url;
      //   console.log(test);
      //   assert.ok(, msg)
      // });

      // .getUrl()
      // .then ((url) => {
      //
      //   console.log(url);
      //
      // });


      // .loadContent('./', 'don\'t load file page');
      // .loadContent('./', 'don\'t load content file page');
  });
});
