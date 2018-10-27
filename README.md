# Комментарий

Интеграционное тестирование:

К сожалению, за данное время так и не успел реализовать интеграционное тестирование.
На удаленных ресурсах тест проходит успешно, на поднятом локально селениумом сервере не видит элементов.


Модульное тестирование:

Логические блоки:
1. gitHistory (получение истории коммитов):
    * получаем массив с указанием всех аргументов;
    * с указанием всех аргументов у объектов массива корректные данные;
    * получаем массив без указания аргументов;
    * без указания аргументов у объектов массива корректные данные.

1. gitFileTree (получение списка файлов и директорий):
    * получаем массив передав path;
    * передав path у объектов массива корректные данные.

1. buildFolderUrl (получение url папки):
    * получаем строку;
    * строка является корректной.

1. buildFileUrl (получение url файла):
    * получаем строку;
    * строка является корректной.

1. buildBreadcrumbs (получение хлебных крошек):
    * при формировании с аргументами получаем строку;
    * при формировании с аргументами получаем корректную строку;
    * при формировании с одним аргументом получаем строку;
    * при формировании с одним аргументом получаем корректную строку;
    * при формировании без аргументов получаем строку;
    * при формировании без аргументов получаем корректную строку.

Запуск интеграционных тестов:
* mocha "npm test";


# Ход работы
1. Добавил в зависимости mocha и chai. Установил зависимости.
1. Описал в readme логические блоки и сценарии тестирования.
1. Переделал Git и Navigation на классы.
1. Создал 2 файла с тестами, git-test и navigation-test в папке units.
1. Создал заглушки в папке units/stubs.
1. Написал модульные тесты.


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
