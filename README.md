# Домашнее задание: автотесты

Вам дано приложение на JavaScript и нужно написать для него автотесты: интеграционные тесты на интерфейс и модульные тесты на серверную часть.

## Предметная область

Приложение отображает в браузере информацию из git репозитория: список коммитов, файловую систему для выбранного коммита, содержимое выбранного файла (поддерживаются только текстовые форматы). Для удобства навигации на каджой странице отображаются "хлебные крошки".

## Как запустить

```sh
git clone git@github.com:dima117/shri-testing-homework.git
cd shri-testing-homework.git
npm i
npm start
```

## Интеграционные тесты

Сценарии для интеграционных тестов

- на всех страницах (история коммитов, просмотр файловой системы, просмотр содержимого файла) правильно отображается их содержимое;
- правильно работают переходы по страницам
  - из списка коммитов на список файлов
  - из списка файлов во вложенную папку
  - из списка файлов на страницу отдельного файла
  - переходы по хлебным крошкам

## Модульные тесты

- нужно добавить в README список логических блоков системы и их сценариев
- для каждого блока нужно написать модульные тесты
- если необходимо, выполните рефакторинг, чтобы реорганизовать логические блоки или добавить точки расширения

## Список логических блоков и их сценариев

1. История коммитов

- получение списка коммитов в виде строки
- преобразование строки в массив с объектами
- добавление к каждому из объекту из массива ключ href
- запуск функции render с массивом коммитов в качестве аргумента

2. Файловая система

- получение файловой структуры в виде строки
- преобразование строки в массив с объектами
- добавляет к каждому объекту ключи href и name
- запуск функции render с массивом объектов в качестве аргумента

3. Содержимое файлов

- получение содержимого файла в виде строки
- запуск функции render с передачей в нее содержимого файла

4. Создание путей

- создание пути к папке
- создание пути к файлу

5. Хлебные крошки

- добавление новых элементов в соответствии с уровнем страницы
