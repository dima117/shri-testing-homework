const { expect } = require('chai');

module.exports = (hermione, opts) => {
  hermione.on(hermione.events.NEW_BROWSER, (browser) => {
    /**
     * @description сохранение текущего url в объекте storage
     * @param  {object} storage
     * @param  {string} key
     */
    browser.addCommand('saveCurrentUrl', (storage, key) => browser
      .getUrl()
      .then((url) => {
        storage[key] = url;
      }));


    /**
     * @description Проверка атрибута элемента на то что он не пустой и сохранение его значения
     * в объекте storage
     * @param  {string} selector
     * @param  {object} storage
     * @param  {string} key
     */
    browser.addCommand('saveElementHref', (selector, storage, key) => browser
      .getAttribute(selector, 'href')
      .then((href) => {
        expect(href).not.empty;
        storage[key] = href;
      }));


    /**
     * @description Сравнение на соответствие текущего url и переданного значения
     * @param  {object} storage
     * @param  {string} key
     */
    browser.addCommand('checkCurrentUrl', (storage, key) => browser
      .getUrl()
      .then((url) => {
        expect(url).to.be.equal(storage[key]);
      }));


    /**
     * @description Сравнение на соответствие href элемента и переданного значения
     * @param  {string} selector
     * @param  {object} storage
     * @param  {string} key
     */
    browser.addCommand('checkElementHref', (selector, storage, key) => browser
      .getAttribute(selector, 'href')
      .then((href) => {
        expect(href).to.be.equal(storage[key]);
      }));
  });
};
