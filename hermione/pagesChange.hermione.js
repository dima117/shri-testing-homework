const { assert } = require("chai");
describe('Переходы по страницам', ()=>{
  it('Переход с history на страницу с списком файлов', function(){
    return this.browser
    .url('/')
    .click('.content .commit:first-of-type a')
    .assertView('plain', 'body')
  })
  it('Переход на страницу с содержимым файла', function(){
    return this.browser
    .url('/files/b509a110d14d5920b1614fcdfc61d979956d2163/')
    .click('.content a:first-of-type')
    .assertView('plain', 'body')
  })
  it('Переход из списка файлов во вложенную папку', function(){
    return this.browser
    .url('/files/b509a110d14d5920b1614fcdfc61d979956d2163/')
    .click('ul li:nth-child(5) a')
    .assertView('plain', 'body')
  })
})