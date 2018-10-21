const { assert } = require("chai");
describe('Переходы по breadcrumbs', ()=>{
  it('Переход по хлебным крошкам на 1 позицию назад', function(){
    return this.browser
    .url('/content/b509a110d14d5920b1614fcdfc61d979956d2163/README.md')
    .click('.breadcrumbs a:last-of-type')
    .assertView('plain', 'body')
  })
  it('Переход по хлебным крошкам на history', function(){
    return this.browser
    .url('/content/b509a110d14d5920b1614fcdfc61d979956d2163/README.md')
    .click('.breadcrumbs a:first-of-type')
    .assertView('plain', 'body')
  })
})