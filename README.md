Изменил заголовок текущей страницы: вывод в span с классом breadcrumbs current-page в файлах content/files/index.hbs<br>
<br>
<b>Интеграционные тесты:</b><br>
CommitToFileSystem.js - тест перехода из списка коммитов на список файлов<br>
FileSystemToFileContent.js - тест переходы из списка файлов на страницу отдельного файла<br>
FileSystemToFileFolder.js - тест переходы из списка файлов во вложенную папку<br>
HistoryCommitDisplay.js - тест проверки на корректность(автора, даты, комментария, ссылки) комитов<br>
PageNavigation.js - тест перехода по хлебным крошкам<br>
<br>
<b>Модульные тесты:</b><br>
contentCheckContent.js - содержимое файла -> на наличе содержимого файла<br>
filesCheckLinks.js - файловая система -> проверка на наличе ссылки к файлу или к вложенной папке<br>
indexCheckCommitElements.js - содержание коммита -> проверка содержания коммита(автор, время, комментария, ссылки)<br>
<br>
<b>Запуск:</b><br>
npm i<br>
Терминал -> selenium-standalone start<br>
Терминал -> npm start<br>
Терминал -> hermione gui<br>
