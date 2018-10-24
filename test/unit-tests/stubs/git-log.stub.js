const moment = require('moment');

const gitLog = [
  [
    '975f41f979f6def44a1cb8086e3af58b934a0bf8',
    'Alex Malitsky',
    1539761272,
    'chor(eslint): Linter fixes'
  ], [
    '90180910fc27a11272a3e5caeeb119a51e5c0545',
    'Dmitry Andriyanov',
    1539683396,
    'исправлена опечатка в readme'
  ], [
    'cc2284293758e32c50fa952da2f487c8c5e8d023',
    'Dmitry Andriyanov',
    1539682592,
    'readme'
  ], [
    '7e013ae0440ad6e91082599376a6aaebe20d2112',
    'Dmitry Andriyanov',
    1539681005,
    'codestyle'
  ], [
    'f2df8ac23e817f6da01624a77ec050a0147f642a',
    'Dmitry Andriyanov',
    1539680531,
    'стили'
  ], [
    '0f7b962409d6980236944164c5b0c9f43f9348e9',
    'Dmitry Andriyanov',
    1539680072,
    'хлебные крошки'
  ], [
    '82810cf7d56476059477aaa5ff55c99ff191be29',
    'Dmitry Andriyanov',
    1539678359,
    'исправлена ошибка'
  ], [
    '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc',
    'Dmitry Andriyanov',
    1539678181,
    'ссылки на корневую папку'
  ], [
    'f69c43393449afe9284f3fa20010695a5faa3849',
    'Dmitry Andriyanov',
    1539678057,
    'ссылки на корневую папку'
  ], [
    '5dec08da64c3b090708aa8412924b26744d60597',
    'Dmitry Andriyanov',
    1539677999,
    'отображение списка коммитов'
  ], [
    '144944153a24f28bd13bcd60aa7f588523649a53',
    'Dmitry Andriyanov',
    1539677877,
    'экранирование контента'
  ], [
    'e91effac1a382d9569198e0625d5c979956e9870',
    'Dmitry Andriyanov',
    1539677780,
    'стили для списка коммитов'
  ]
];

/**
 * Format to convert timestamps in UNIX format in text form used by git and
 * named 'ISO like'.
 * @type {string}
 */
const timestampISOLikeFormat = 'YYYY-MM-DD HH:mm:ss +-HHmm';

/**
 * Returns git commit info in the same format git does.
 * @param {string} hash
 * @param {string} author
 * @param {number} time
 * @param {string} message
 * @return {string}
 */
function exportGitLogRecordAsText([hash, author, time, message]) {
  const isoLikeTime = moment(time).format(timestampISOLikeFormat);
  return `${hash}\t${author}\t${isoLikeTime}\t${message}`;
}

module.exports = {
  gitLog,
  timestampISOLikeFormat,
  exportGitLogRecordAsText
};
