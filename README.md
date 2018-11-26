# Интеграционные тесты
## Для подгрузги репозитория
```sh
# Install html-reporter and environment for test
git submodule update --init --recursive
# Install dependencies
npm i
# Install and run selenium-standalone
npm run selenium-install
npm run selenium
```
И в новой вкладке:
```sh
# For static version
npm run hermione-static
# For gui (interactive) version
npm run hermione-gui
```
