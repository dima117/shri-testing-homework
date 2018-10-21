const {
  BASE_URL,
  TEST_COMMIT_URL,
  TEST_FOLDER_URL,
  TEST_FILE_URL
} = require('./constants');

describe('проверка отображения страниц', function() {
  it('страница с историей коммитов отображается правильно', function () {
    return this.browser
      .url(BASE_URL)
      .assertView('history-breadcrumbs', '.breadcrumbs')
      .assertView('history-content', '.content');
  });

  it('страница с корневым каталогом отображается правильно', function () {
    return this.browser
      .url(TEST_COMMIT_URL)
      .assertView('commit-breadcrumbs', '.breadcrumbs')
      .assertView('commit-content', '.content');
  });

  it('страница с папкой отображается правильно', function () {
    return this.browser
      .url(TEST_FOLDER_URL)
      .assertView('folder-breadcrumbs', '.breadcrumbs')
      .assertView('folder-content', '.content');
  });

  it('страница с файлом отображается правильно', function () {
    return this.browser
      .url(TEST_FILE_URL)
      .assertView('file-breadcrumbs', '.breadcrumbs')
      .assertView('file-content', '.content');
  });
});
