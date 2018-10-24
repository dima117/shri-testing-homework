# ОПИСАНИЕ РЕШЕНИЯ
## Модульные тесты
Модульные тесты находятся в папке **unitTests**  

`npm run test:u` - запустить модульные тесты

Блоки:
- Блок получения данных из командной строки
  - получение истории коммитов  
    *сценарии*:  
      - история коммитов успешно получена  
      - выброшено исключение  
  - получение списка файлов для выбранного коммита  
    *сценарии*:  
      - список файлов для выбранного коммита успешно получен  
      - выброшено исключение  
  - получение содержимого выбранного файла  
    *сценарии*:  
      - содержимое файла успешно получено  
      - выброшено исключение  

- Блок формирования данных
  - страницы истории коммитов
    *сценарии*:
      - все необходимые данные для отрисовки страницы присутствуют
  - станицы файловой системы для выбранного коммита
    *сценарии*:
      - все необходимые данные для отрисовки страницы присутствуют
  - страницы содержимого выбранного файла
    *сценарии*:
      - все необходимые данные для отрисовки страницы присутствуют 

- Блок навигации
  - формирование "хлебных крошек"  
    *сценарии*:  
      - "хлебные крошки" сформированы  
  - формирование пути (к файловой структуре и содержимому файла)  
    *сценарии*:  
      - путь к файловой структуре и содержимому файла сформирован  

Для того, чтобы можно было проще добавить точки расширения я создал `class Git` (для получения списка коммитов, файлов и содержимого файла), в котором присваиваю методу класса `this.executeGit = executeGit`. В тестах я подменяю метод `this.executeGit` на свой.  
Функция `parseHistoryItem` и `parseFileTreeItem` не являются публичными интерфейсами и используются только внутри класса, поэтому их не тестирую отдельно.  

Чтобы протестировать логику по формированию данных для рендера страниц — вынес ее во вспомогательные функции (файл *./utils/buildPage.js*).

Установил **istanbul** для просмотра информации о покрытии кода тестами. 
`npm run coverage` - Вывести отчет о покрытии кода тестами в html файл (папка *coverage*).   
По сформированному отчету видно, что тестами не покрыта только 1 функция (executeGit), вместо которой для тестов используется заглушка. Не стал выносить ее в отдельный файл, так как в задании было рефакторить только самое необходимое, без чего невозможно тестирование.   

## Интеграционные тесты
Интеграционные тесты выполняются на тестовом репозитории, который нужно склонировать в ту же самую папку, где лежит основной репозиторий (т.е. два репозитория должны располагаться на одном уровне. Путь к тестовому репозиторию хранится в файле ./hermione/startAppForTests.js).  
Ссылка на тестовый репозиторий: https://github.com/EVStarostin/shri-stub-repo  
Должа быть структура вида:  
  /shri-testing-homework  - репозиторий с работающим приложением и тестами  
  /shri-stub-repo         - тестовый репозиторий для запуска интеграционных тестов

### Установка selenium
`npm install selenium-standalone --global`  
`selenium-standalone install`  
**hermione** и **html-reporter** установятся из package.json (`npm install`)  

### Запуск интеграционных тестов:
`npm run start:t` - стартовать локальный сервер для тестов (запускатся файлик *./hermione/startAppForTests.js*, который прописывает путь к репозиторию с тестовыми данными)  
`npm run selenium` - стартовать selenium (запускать в отдельном терминале)  
`npm run test:i` - выполнить интеграционные тесты (запускать в отдельном терминале)  

Интеграционные тесты находятся в **hermione/test.hermione.js**  

Selenium и hermione разворачивал на windows 10. Версия Google Chrome — 70, FireFox — 62, Java — 8, Python — 2.7.  
**hermione-html-report на windows** открывается нормально только в **Firefox**, в google chrome неправильный путь к картинкам.  

Добавил и прошелся по файлам с тестами линтером с конфигом airbnb.  
### ----------------------------------------------------------------------------------------------------

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
