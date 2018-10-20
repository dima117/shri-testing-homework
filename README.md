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

##Список логических блоков и их сценарии  
1. Блок взаимодействия с git репозиторием  
* Результат выполнения gitHistory содержит нужные элементы  
* Выполнение gitHistory учитывает разное количество элементов  
* Результат выполнения gitFileTree cодержит нужные данные  

2. Блок навигации  
* buildFolderUrl правильно формирует url  
* buildFileUrl правильно формирует url  
* buildBreadcrumbs последняя вкладка не активна  
* buildBreadcrumbs правильно реагирует на изменение количества вложенных путей  
 
3. Блок управления контентом  
* В gitFileTree приходят правильные аргументы  
* В gitFileContent приходят правильные аргументы  
* В res.render приходят правильные аргументы  

4. Блок управления файлами  
* В gitFileTree приходят правильные аргументы  
* В res.render приходят правильные аргументы  

5. Блок управления историей  
* В res.render приходят правильные аргументы  