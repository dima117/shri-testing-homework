const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

chai.use(require('chai-string'));

const { parseGitHistory, parseGitFileTree } = require('../utils/git');
const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../utils/navigation');


describe('Проверка логического блока получения и парсинга истории коммитов из гита ', () => {
	it('Возвращает массив', () => {
		// Подготовка
		const gitData = '38429bed94bd7c107c65fed6bffbf443ff0f4183\tDmitry Andriyanov\t2018-10-15 13:22:09 +0300\tзаготовка приложения';
		
		// Действие
		const history = parseGitHistory(gitData);
		
		// Проверка
		assert.isArray(history, 'Пришел не массив');
	});

	it('В элементе массива есть объект с полями: hash, author, timestamp, msg', () => {
		// Подготовка
		const gitData = '38429bed94bd7c107c65fed6bffbf443ff0f4183\tDmitry Andriyanov\t2018-10-15 13:22:09 +0300\tзаготовка приложения';
		
		// Действие
		const historyItem = parseGitHistory(gitData)[0];

		// Проверка
		expect(historyItem).to.have.property('hash');
		expect(historyItem).to.have.property('author');
		expect(historyItem).to.have.property('timestamp');
		expect(historyItem).to.have.property('msg');
	});
});

describe('Проверка логического блока получения и парсинга файлового дерева', () => {
	it('Возвращает массив', () => {
		// Подготовка
		const gitData = '40000\ttree\t4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5\tviews';

		// Действие
		const tree = parseGitHistory(gitData);

		// Проверка
		assert.isArray(tree, 'Пришел не массив');
	});

	it('В элементе массива есть объект с полями: type, hash, path', () => {
		// Подготовка
		const gitData = '40000\ttree\t4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5\tviews';

		// Действие
		const treeItem = parseGitFileTree(gitData)[0];

		// Проверка
		expect(treeItem).to.have.property('type');
		expect(treeItem).to.have.property('hash');
		expect(treeItem).to.have.property('path');
	});
})

describe('Проверка логического блока навигации', () => {
	it('Функция построения пути папки возвращает корректный путь', () => {
		// Подготовка
		const parentHash = '26d07ccb8c210fca84677ac820393a381be01104';
		const path = '';

		// Действие
		const result = buildFolderUrl(parentHash, path);

		// Проверка
		expect(result).to.startsWith('/files');
		expect(result).to.have.entriesCount('/', 3);
	})

	it('Функция построения пути файла возвращает корректный путь', () => {
		// Подготовка
		const parentHash = '26d07ccb8c210fca84677ac820393a381be01104';
		const path = '';

		// Действие
		const result = buildFileUrl(parentHash, path);

		// Проверка
		expect(result).to.startsWith('/content');
		expect(result).to.have.entriesCount('/', 3);
	})

	it('Функция посторения хлебных крошек возвращает корректное значение по корневому маршруту', () => {
		// Подготовка
		const hash = null;
		const path = null;

		// Действие
		const bc = buildBreadcrumbs(hash, path)[0]
		
		// Проверка
		expect(bc).to.nested.include({text: 'HISTORY'});
		expect(bc).to.nested.include({href: undefined});
	})

	it('Функция посторения хлебных крошек возвращает корректное значение в файловом дереве', () => {
		// Подготовка
		const hash = 'cc2284293758e32c50fa952da2f487c8c5e8d023';
		const path = '';

		// Действие
		const bc0 = buildBreadcrumbs(hash, path)[0];
		const bc1 = buildBreadcrumbs(hash, path)[1];

		//Проверка
		expect(bc0).to.nested.include({href: '/'});
		expect(bc1).to.nested.include({text: 'ROOT'});
	})

	it('Функция посторения хлебных крошек возвращает корректное значение в режиме просмотра файла', () => {
		// Подготовка
		const hash = 'cc2284293758e32c50fa952da2f487c8c5e8d023';
		const path = 'app.js';

		// Действие
		const bc1 = buildBreadcrumbs(hash, path)[1];
		const bc2 = buildBreadcrumbs(hash, path)[2];

		//Проверка
		expect(bc1).to.nested.include({href: '/files/cc2284293758e32c50fa952da2f487c8c5e8d023/'});
		expect(bc2).to.nested.include({text: 'app.js'});
	})
})