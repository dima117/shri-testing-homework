## Решение

## Как запустить модульные тесты

```sh
git clone https://github.com/Rexolion/shri-testing-homework
cd shri-testing-homework
npm i
npm test
```

## Как запустить интеграционные тесты

```sh
git clone https://github.com/Rexolion/shri-testing-homework
cd shri-testing-homework
npm i
npm install selenium-standalone --global
selenium-standalone install 
npm start 
selenium-standalone start
node_modules/.bin/hermione /hermione/test.hermione.js
```

## Логические блоки

### Взаимодействие с гитом 
- Получение промиса с контентом по хеш ключу(gitFileContent)
- Получение промиса с массивом файлов и директорий (gitFileTree)
- Получение промиса с данными коммитов (gitHistory)
- Соответственно выполнение команды гит (executeGit)

### Навигация
- Получение хлебных крошек (buildBreadcrumbs)
- Получение пути для директории (buildFolderUrl)
- Получение пути для файла (buildFileUrl)

### Контроллеры
- Проверка что полученный файл имеет тип blob (contentController)
- Проверка на наличие содержимого (contentController)
- Добавление к объекту ключа href с ссылкой (indexController)
- Построение строки пути из url (fileController)

## Рефакторинг
- Был добавлен и использован линтер 
- Были добавленны необязательные параметры со стабами
