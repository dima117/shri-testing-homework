const { assert } = require("chai");
describe('Соответсвие содержимого на страницах', ()=>{
  it('Соответсвие содержимого на странице истории коммитов', function(){
    return this.browser
    .url('/')
    .assertView('plain', 'body')
  })

  it('Соответсвие содержимого на странице просмотра файловой системы', function(){
    return this.browser
    .url('/files/b509a110d14d5920b1614fcdfc61d979956d2163/')
    .assertView('plain', 'body')
  })

  it('Соответсвие содержимого на странице просмотра содержимого файла', function(){
    return this.browser
    .url('/content/b509a110d14d5920b1614fcdfc61d979956d2163/README.md')
    .assertView('plain', 'body')
  })
})