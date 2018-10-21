
>Запуск
```
npm i
npm start
npm run selenium
npm test (module test)
npm run hermione (integration)
```

Список логических блоков:
 - pages render (Controllers)
 - git
 - navigation
 
Сценарии:

 **navigation**
 
buildFileUrl - Возвращает url на содержимое path 

>Аргументы
```
[hash] (String): hash коммита.
[path] (String): путь к файлу.
``` 

>Пример
```
buildFileUrl(hash, path) -> `/content/hash/path`
```
* Вызов функции *buildFileUrl* без аргументов, должен вернуть ссылку на файл вида -> `/content/undefined/undefined`
* Вызов функции *buildFileUrl* с аргументом hash = `'hash'`, должен вернуть ссылку на файл вида -> `/content/hash/undefined`
* Вызов функции *buildFileUrl* с аргументами hash = `'hash'` и path = `'path'`, должен вернуть ссылку на файл вида -> `/content/hash/path`
* Вызов функции *buildFileUrl* с аргументами hash = `''` и path = `'path'`, должен вернуть ссылку на файл вида -> `/content//path`

buildFolderUrl - Возвращает url к path 

>Аргументы
```
[hash] (String): hash коммита.
[path=''] (String): путь к папке.
``` 

>Пример
```
buildFolderUrl(hash, path) -> `/files/hash/path`
```
* Вызов функции *buildFolderUrl* без аргументов, должен вернуть ссылку на файл вида -> `/files/undefined/`
* Вызов функции *buildFolderUrl* с аргументом hash = `'hash'`, должен вернуть ссылку на файл вида -> `/files/hash/`
* Вызов функции *buildFolderUrl* с аргументами hash = `'hash'` и path = `'path'`, должен вернуть ссылку на файл вида -> `/files/hash/path`
* Вызов функции *buildFolderUrl* с аргументами hash = `''` и path = `'path'`, должен вернуть ссылку на файл вида -> `/files//path`

buildBreadcrumbs - Возвращает массив с параметрами path(кол-во зависит от уровня вложенности), для построение навигационого url-a

>Аргументы
```
[hash] (String): hash коммита.
[path] (String): navigation path.
``` 

>Пример
```
buildBreadcrumbs(hash, path) ->
[
    { text: 'HISTORY', href: '/' },
    { text: 'ROOT', href: '/files/hash/' },
    { text: 'path' }
]
```
* Вызов функции *buildBreadcrumbs* без аргументов, должен вернуть массив с объектом, с параметрами вида -> 
```
{ text: 'HISTORY', href: undefined }
```
* Вызов функции *buildBreadcrumbs* с аргументом hash = `'hash'`, должен вернуть массив с объектом, с параметрами вида -> 
```
{ text: 'HISTORY', href: '/' },
{ text: 'ROOT', href: undefined }
```
* Вызов функции *buildBreadcrumbs* с аргументом hash = `'hash'` и path = `'path'`, должен вернуть массив с объектом, с параметрами вида -> 
```
{ text: 'HISTORY', href: '/' },
{ text: 'ROOT', href: '/files/hash/' },
{ text: 'path' }
```
hash = `'hash'`, path = `path/andOneMore`:
```
{ text: 'HISTORY', href: '/' },
{ text: 'ROOT', href: '/files/hash/' },
{ text: 'path', href: '/files/hash/path/' },
{ text: 'andOneMore' }
```
hash = `'hash/wowwww'`, path = `path/andOneMore/last`:
```
{ text: 'HISTORY', href: '/' },
{ text: 'ROOT', href: '/files/hash/wowwww/' },
{ text: 'path', href: '/files/hash/wowwww/path/' },
{ text: 'andOneMore', href: '/files/hash/wowwww/path/andOneMore/' },
{ text: 'last' }
```

**git**


parseHistoryItem - Возвращает объект с параметрами commit-a.

>Аргументы
```
[line] (String): Строка с параметрами commit-a, разделителем параметров является \t.
``` 

>Пример
```
parseHistoryItem('hash\tauthor\ttime\tcommit message') ->
{ 
    hash: 'hash',
    author: 'author',
    timestamp: 'time',
    msg: 'commit message' 
}
```

gitHistory - Возвращает историю коммитов с пагинацей.

>Аргументы
```
[page=1] (Number): Номер страницы.
[size=10] (Number): Размер страницы.
``` 

>Пример
```
**commit history**:
[
'hash1\tauthor1\ttime1\t1 commit message',
'hash2\tauthor2\ttime2\t2 commit message',
'hash3\tauthor3\ttime3\t3 commit message',
'hash4\tauthor4\ttime4\t4 commit message'
]

gitHistory(2, 2) ->
[
{ 
    hash: 'hash3',
    author: 'author3',
    timestamp: 'time3',
    msg: '3 commit message' 
},
{ 
    hash: 'hash4',
    author: 'author4',
    timestamp: 'time4',
    msg: '4 commit message' 
}
]
```

parseFileTreeItem - Возвращает объект с параметрами файла commit-a.

>Аргументы
```
[line] (String): Строка с параметрами файла commit-a.
``` 

>Пример
```
parseFileTreeItem('id type hash\tpath') ->
{
    type: 'type',
    hash: 'hash',
    path: 'path',
}
```

gitFileTree - Возвращает дерево файлов commit-a, в виде массива.

>Аргументы
```
[hash] (String): hash commit-a.
[path] (String): путь, для построения дерева.
``` 

>Пример
```
gitFileTree('hash', '') ->
[
    { 
        type: 'blob',
        hash: 'hashFile',
        path: 'someFile' 
    },
    { 
        type: 'tree',
        hash: 'hashFolder',
        path: 'folder' 
    }
]
```

gitFileContent - Возвращает содержимое файла.

>Аргументы
```
[hash] (String): hash файла.
``` 

>Пример
```
gitFileTree('hash', '') ->
Some text 
which contain file.
```

**indexController**

- Отрисовывает главную страницу приложения с историей коммитов.


**contentController**

- Отрисовывает страницу c содержимым  файла.

>Params
```
[hash] (String): hash commit-a.
[path] (String): путь к файлу. 
```

**filesController**

- Отрисовывает страницу c деревом файлов commit-a.

>Params
```
[hash] (String): hash commit-a.
[path] (String): путь к папке.
```
