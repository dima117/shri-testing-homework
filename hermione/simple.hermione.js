const arrest  = require('assert')

// describe('hermione test', () => {
//   it('fist integration test', () => {
//     return this.browser
//       .url('/')
//       .isExisting('.breadcrumbs')
//       // .then(exist => {
//       //   assert.ok(exist, 'hello')
//       // })
//       .then(() => {
//         console.log('--->', 'hello fr')
//       })
//   })
// })

describe('github', function() {
    it('should find hermione', function() {
      console.log('--->', 'test')
        return this.browser
            .url('https://github.com/gemini-testing/hermione')
            .getText('#readme h1')
            .then(function(title) {
                console.log('--->', 'test from then')
            });
    });
});
