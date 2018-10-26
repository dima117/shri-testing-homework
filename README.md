#  Homework5. Tests

## Запуск unit-тестов
```shell
npm i
npm test
```

## Логические блоки и их сценарии
- Получение и отображение данных из Git
  - история коммитов gitHistory
  - дерево файлов gitFileTree
    - первый уровень
    - следующие уровни
  - получение содержимого файла gitFileContent
    - проверяем, что приходят нужные типы данных

- Навигация
  - хлебные крошки
    - history
    - HISTORY / ROOT
    - HISTORY / ROOT / folder
    - HISTORY / ROOT / folder / file.test

Комментарии:
  - тестируются только внешние интерфейсы
  - слишком затратно по времени тестировать функции с совсем простой логикой (поэтому)

  ## Запуск интеграционных тестов
  ```shell
  selenium-standalone start
  npm start
  ./node_modules/.bin/hermione
  ```
