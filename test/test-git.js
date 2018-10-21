const { assert } = require('chai');
const {
	executeGit,
	parseHistoryItem,
	gitHistory,
	parseFileTreeItem,
	gitFileTree,
	gitFileContent
} = require('../utils/git');

describe('Тестирование утилит для GIT', () => {
	it('#parseHistoryItem', () => {
		const historyItem = parseHistoryItem(
			'hash\tAlexandra Izmaylova\t12.05\tHello'
		);
		assert.strictEqual(historyItem.hash, 'hash');
		assert.strictEqual(historyItem.author, 'Alexandra Izmaylova');
		assert.strictEqual(historyItem.timestamp, '12.05');
		assert.strictEqual(historyItem.msg, 'Hello');
	});

	describe('#executeGit', () => {
		it('git --version', async () => {
			const result = await executeGit('git', ['--version']);
			assert.isTrue(result.startsWith('git version '));
		});
	});

	it('#gitHistory', async () => {
		const result = await gitHistory(1, 2);
		assert.isTrue(result.length <= 2);
		if (result.length > 0) {
			assert.notStrictEqual(result[0].hash, undefined);
			assert.notStrictEqual(result[0].author, undefined);
			assert.notStrictEqual(result[0].timestamp, undefined);
			assert.notStrictEqual(result[0].msg, undefined);

			if (result.length > 1) {
				assert.notStrictEqual(result[1].hash, undefined);
				assert.notStrictEqual(result[1].author, undefined);
				assert.notStrictEqual(result[1].timestamp, undefined);
				assert.notStrictEqual(result[1].msg, undefined);
			}
		}
	});

	it('#parseFileTreeItem', () => {
		const result = parseFileTreeItem(
			'100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore'
		);
		assert.strictEqual(result.type, 'blob');
		assert.strictEqual(result.path, '.gitignore');
		assert.strictEqual(
			result.hash,
			'b512c09d476623ff4bf8d0d63c29b784925dbdf8'
		);
	});

	it('#gitFileContent', async () => {
		const result = await gitFileContent('d7b47df17ba8ea90f706bf9c92f9a7fc14579744');
		const string = "#!/usr/bin/env node\n\n/**\n * Module dependencies.\n */\n\nvar app = require('../app');\n";
		assert.strictEqual(result, string);
    });
});
