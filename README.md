# Описание выполненного ДЗ
## Версии сборок, на которых проводились тесты
- `npm 6.4.1`
- `node 9.10.1`
- `java version "1.8.0_191"`

## Модульные тесты `js/test/unit`
### Логические блоки и сценарии
1 **Навигация (Хлебные крошки и формирование корректных URL'ов)**

* Корректная работа при отсутствии `path` и `hash`
* Корректная работа при осутствии `path` и  наличии `hash`
* Корректная работа при наличии `path` и `hash`

* Формируется url до коммита
* Формируется url до папки
* Формируется url до файла

2 **Работа с git операция**
* Аргументы для git операций корректно обрабатываются
* Данные из git операций корректно обрабатываются

3 **Формирование корректного контента для рендеринга**.
* Возвращаются корректные данные для рендеринга

### Комментарии к модульным тестам
- Для модуля навигации я выделил из `filesControler` функцию `buildObjectUrl` для простоты поддержки и тестирования и расширил через проверку типа. Кажется, что предыдущие `buildFolderUrl` и `buildFileUrl` были слишком «захардкоженные»
- Для модуля работы с git выделил отдельный класс `GitOperations` с возможностью мокать данные операций.
- Из `utils/controllers` каждую функцию этого логического модуля вынес в `util/page-content` для тестирования.
- Модульные тесты писал в стиле TDD `suite` -> `test`

## Интеграционные `js/test/integrational`
Тесты запускаются в `Chrome` и `Firefox`. Скриншоты хранятся в папке `screenshots`.

## Запуск тестов
### Unit тесты
```
npm test // unit + eslint

npm run test:unit // только unit
```

### Интеграционные
```
npm run selenium // 1 шаг для запуска selenium
npm run hermione  // 2 шаг для тетсирования (запускать в другой вкладке терминала)
```

### Отчет покрытия
Есть возможность посомтреть покрытие
```
npm test:coverage // в папке js/test/overage
```

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
