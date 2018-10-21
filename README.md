# Домашнее задание: автотесты

## Перед запуском тестов

`npm i`
`selenium-standalone start` в отдельной вкладке терминала

## Интеграционные тесты

Сценарии для интеграционных тестов

- на всех страницах (история коммитов, просмотр файловой системы, просмотр содержимого файла) правильно отображается их содержимое;
- правильно работают переходы по страницам
  - из списка коммитов на список файлов
  - из списка файлов во вложенную папку
  - из списка файлов на страницу отдельного файла
  - переходы по хлебным крошкам

Верстка коммитов на странице со списком коммитов проверяется через скриншот последнего коммита из текущего списка, поэтому, естественно, тест ломается после добавления новых коммитов. Необходимо, на мой взгяд или сделать заглушку, или проверять только наличие DOM-элементов.

Запуск всех интеграционных тестов: `npm run test-hermione`.

## Модульные тесты

#### Логические блоки и их сценарии

- гит:
    - история
    - дерево файловой структуры
    - содержимое файлов

- навигация:
    - путь к  папке
    - путь к файлу
    - "хлебные крошки"

- подготовка данных для рендеринга
    - данные на страницк коммитов
    - содержимое папки
    - содержимое файла

Запуск всех модульных тестов: `npm test`.

Произведен рефакторинг *utils/git.js*, что позволило стабилизировать *executeGit()*, но сделало все методы публичными.

Контроллеры отвечают за данные на страницах (index, содержимое папки, содержимое файла) и используют протестированные сценарии из git.js и navigation.js. Сложность тестирования контроллеров в необходимости проведения такого рефакторинга, который позволит стабилизировать данные, использующиеся внешними методами, чтобы проверить объекты, в res.render().
