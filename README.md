
# Модульное и интеграционное тестирование

Для тестирования был создан тестовый репозиторий с файлом и 2 коммитами в директории ./test-rep 
При запуске тестов добавляется env переменна NODE_ENV=test для использования тестового репозитория.

## Интеграционное тестирование
Конфиг: .hermione.conf.js
Директория с тестами: hermione
### Запуск тестов:
1. Нужно глобально установить selenium и запустить в отдельной вкладке терминала:
<br><b> selenium-standalone start </b>
2. Запустить приложение в режиме тестирования (будет использоваться тестовый гит репозиторий) в отдельной вкладке терминала:
<br><b>npm run teststart </b>
3. Запустить тестирование с помощью Hermione:
<br><b>npm run integration-test </b>

### Список логических блоков и сценариев:
1. История коммитов:
    - Тестируется корректное отображение с помощью эталонного скриншота
2. Просмотр файловой системы:
    - Тестируется корректное отображение с помощью эталонного скриншота
3. Просмотр содержимого файла:
    - Тестируется корректное отображение с помощью эталонного скриншота
4. Переходы по страницам
    - Из списка коммитов на список файлов
    - Из списка файлов во вложенную папку
    - Из списка файлов на страницу отдельного файла
    - Переходы по хлебным крошкам
 
## Модульное тестирование
Тесты находятся в директории tests. <br>
Запуск тестов: <b>npm test </b>

### Список логических блоков со сценариями:

1. История коммитов (главная страница) - тестируется с помощью sinon 
    - Модуль должен вернуть корректные результаты для рендеринга index страницы:
    Объект со свойствами title, breadcrumbs, list(коммиты из тестового репозитория) : ```{
                                                                                                       title: 'history',
                                                                                                       breadcrumbs: [ { text: 'HISTORY', href: undefined } ],
                                                                                                       list: [
                                                                                                           {
                                                                                                               hash: 'ae9dfcb7d7e823a9b3f2406678165ceea09dc0fe',
                                                                                                               author: 'Arsen',
                                                                                                               timestamp: '2018-10-22 16:27:03 +0300',
                                                                                                               msg: 'added nested folder',
                                                                                                               href: '/files/ae9dfcb7d7e823a9b3f2406678165ceea09dc0fe/'
                                                                                                           },
                                                                                                           {
                                                                                                               hash: '1f78f3b14096667c70de44f7025d363614343f17',
                                                                                                               author: 'Arsen',
                                                                                                               timestamp: '2018-10-21 22:16:44 +0300',
                                                                                                               msg: 'change 1',
                                                                                                               href: '/files/1f78f3b14096667c70de44f7025d363614343f17/'
                                                                                                           },
                                                                                                           {
                                                                                                               hash: '2af43ce7c800cc6d7f47de9ec79d8535b73db55e',
                                                                                                               author: 'Arsen',
                                                                                                               timestamp: '2018-10-21 21:02:17 +0300',
                                                                                                               msg: 'first commit',
                                                                                                               href: '/files/2af43ce7c800cc6d7f47de9ec79d8535b73db55e/'
                                                                                                           } ]
                                                                                                   }```
2. Файловая система коммита
    - Принимает 2 параметра в запросе: 1) путь к файлу относительно коммита; 2) хэш коммита : `        req.params = {
                                                                                                           '0': undefined,
                                                                                                           'hash': '2af43ce7c800cc6d7f47de9ec79d8535b73db55e',
                                                                                                       }`
    - Модуль должен вернуть корректные результаты для рендеринга файловой системы коммита:
    Объект со cвойствами title, breadcrumbs, files: `{
                                                                     title: 'files',
                                                                     breadcrumbs:
                                                                     [
                                                                         {
                                                                             text: 'HISTORY',
                                                                             href: '/'
                                                                         },
                                                                         {
                                                                             text: 'ROOT',
                                                                             href: undefined
                                                                         }
                                                                     ],
                                                                     files:
                                                                     [
                                                                         {
                                                                             type: 'blob',
                                                                             hash: '8e27be7d6154a1f68ea9160ef0e18691d20560dc',
                                                                             path: 'testFile.js',
                                                                             href: '/content/2af43ce7c800cc6d7f47de9ec79d8535b73db55e/testFile.js',
                                                                             name: 'testFile.js'
                                                                         }
                                                                     ]
                                                                 }`
3. Содержимое файла коммита
    - Принимает объект с хэшем коммита и уже "пройденный путь до файла": {
                                                                                     '0': undefined,
                                                                                     'hash': '2af43ce7c800cc6d7f47de9ec79d8535b73db55e',
                                                                                 }
    - Модуль должен вернуть корректные результаты для рендеринга страницы с внутренним содержимым файла - `{
                                                                                                                           title: 'files',
                                                                                                                           breadcrumbs:
                                                                                                                           [
                                                                                                                               {
                                                                                                                                   text: 'HISTORY',
                                                                                                                                   href: '/'
                                                                                                                               },
                                                                                                                               {
                                                                                                                                   text: 'ROOT',
                                                                                                                                   href: undefined
                                                                                                                               }
                                                                                                                           ],
                                                                                                                           files:
                                                                                                                           [
                                                                                                                               {
                                                                                                                                   type: 'blob',
                                                                                                                                   hash: '8e27be7d6154a1f68ea9160ef0e18691d20560dc',
                                                                                                                                   path: 'testFile.js',
                                                                                                                                   href: '/content/2af43ce7c800cc6d7f47de9ec79d8535b73db55e/testFile.js',
                                                                                                                                   name: 'testFile.js'
                                                                                                                               }
                                                                                                                           ]
                                                                                                                       }`
4. Навигация: 
	- buildFileUrl() - Возвращается корректный url для файла.
	    - Принимает        `const hash = 'testhash';
                           const path = 'testpath';`
	    - возвращает корректный url для содержимого файла вида: `/content/${hash}/${path}`
	- buildFolderUrl() - Возвращается корректный url для директории.
	    - Принимает        `const hash = 'testhash';
                            const path = 'testpath';`
	    - возвращает корректный url для директории вида: `/files/${hash}/${path}`
	- buildBreadcrumbs() - Возвращаются корректные хлебные крошки при просмотре главной страницы
	    - Ничего не принимает
	    - Возвращает корректные хлебные крошки при просмотре главной страницы - объект вида: `{
                                                                                                       text: 'HISTORY',
                                                                                                       href: undefined
                                                                                                   }`
	- buildBreadcrumbs()
	    - Принимает `hash = 'testhash'` и `path=''`
	    - Возвращает корректные хлебные крошки при просмотре корневой директории файлов коммита - массив объектов вида `[
                                                                                                                                  {
                                                                                                                                      text: 'HISTORY',
                                                                                                                                      href: '/'
                                                                                                                                  },
                                                                                                                                  {
                                                                                                                                      text: 'ROOT',
                                                                                                                                      href: undefined
                                                                                                                                  }
                                                                                                                              ]`
	- buildBreadcrumbs() - Возвращает корректные хлебные крошки при просмотре корневой директории файлов коммита.
	    - Принимает `       const hash = 'testhash';
                            const path = 'testpath';`
        - Возвращает массив объектов: `[
                                                  {
                                                      text: 'HISTORY',
                                                      href: '/'
                                                  },
                                                  {
                                                      text: 'ROOT',
                                                      href: undefined
                                                  }
                                              ]`
	- buildBreadcrumbs() - Возвращаются хлебные крошки при просмотре файлов больше 1 уровня вложенности
	    - Принимает         `const hash = 'somehash';
                            const path = 'somepath1/somepath2';`
        - Возращает массив объектов: `[
                                                        {
                                                            text: 'HISTORY',
                                                            href: '/'
                                                        },
                                                        {
                                                            text: 'ROOT',
                                                            href: '/files/somehash/'
                                                        },
                                                        {
                                                            text: 'somepath1',
                                                            href: '/files/somehash/somepath1/'
                                                        },
                                                        {
                                                            text: 'somepath2'
                                                        }
                                                    ]` 
5. Выполнение git команд и обработка входных/выходных данных для них:
    - parseHistoryItem()
        Принимает строку со значениями коммита (hash, author, timestamp, msg): `'somehash\tsomeauthor\tsometimestamp\tsomemsg'`
        Парсит значения коммита и возвращает объект с ними: `{
                                                                         hash,
                                                                         author,
                                                                         timestamp,
                                                                         msg
                                                                     }`
    - gitHistory() - Возвращает корректную историю коммитов тестового репозитория
        - Ничего не принимает
        - Возвращает историю коммитов: `[
                                                    {
                                                        hash: 'ae9dfcb7d7e823a9b3f2406678165ceea09dc0fe',
                                                        author: 'Arsen',
                                                        timestamp: '2018-10-22 16:27:03 +0300',
                                                        msg: 'added nested folder',
                                                    },
                                                    {
                                                        hash: '1f78f3b14096667c70de44f7025d363614343f17',
                                                        author: 'Arsen',
                                                        timestamp: '2018-10-21 22:16:44 +0300',
                                                        msg: 'change 1'
                                                    },
                                                    {
                                                        hash: '2af43ce7c800cc6d7f47de9ec79d8535b73db55e',
                                                        author: 'Arsen',
                                                        timestamp: '2018-10-21 21:02:17 +0300',
                                                        msg: 'first commit'
                                                    }
                                                ]`
	- gitFileTree() - Возвращает корректную структуру файлов тестового репозитория
	    - Принимает хэш коммита и путь: `hash = '1f78f3b14096667c70de44f7025d363614343f17';
                                                  path = '';`
        - Возвращает список коммитов в виде массива с объектами: `[
                                                                              {
                                                                                  type: 'blob',
                                                                                  hash: '818b46f5a3570484c229ae09f2cd76ac8c0e1d36',
                                                                                  path: 'testFile.js'
                                                                              }
                                                                          ])`
    - gitFileContent() - Возвращает содержимое файла тестового репозитория
        - Принимает хэш файла коммита: `'818b46f5a3570484c229ae09f2cd76ac8c0e1d36'`
        - Возвращает его содержимое : `'text\nchange1\n'`

