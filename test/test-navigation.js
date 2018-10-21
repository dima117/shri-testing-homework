const { assert }= require("chai");
const {
	buildFolderUrl,
	buildFileUrl,
	buildBreadcrumbs
} = require('../utils/navigation');


describe('Тестирование утилит для навигации', () => {
    describe('#buildFolderUrl', () => {
        it("Случай, когда указан непустой путь", () => {
            const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
            const path = 'path/to/folder';
            const folderUrl = `/files/${hash}/${path}`;
            assert.strictEqual(buildFolderUrl(hash, path), folderUrl);
        });
        it("Случай, когда указан пустой путь", () => {
            const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
            const path = '';
            const folderUrl = `/files/${hash}/`;
            assert.strictEqual(buildFolderUrl(hash, path), folderUrl);
        });
        it("Случай, когда путь не указан", () => {
            const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
            const folderUrl = `/files/${hash}/`;
            assert.strictEqual(buildFolderUrl(hash), folderUrl);
        });
    });

    describe('#buildFileUrl', () => {
		it('Путь к файлу строится верно', () => {
			const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
            const path = 'path/to/file';
			const fileUrl = `/content/${hash}/${path}`;
            assert.strictEqual(buildFileUrl(hash, path), fileUrl);
        });
	});
    
    describe('#buildBreadcrumbs', () => {
        it('Случай, когда указан путь', () => {
            const bc = buildBreadcrumbs('hash', 'a/b//c/');
            assert.strictEqual(bc.length, 5, 'Проверка на количество крошек');
            const [history, root, a, b, c] = bc;

            assert.strictEqual(history.text, 'HISTORY');
            assert.strictEqual(history.href, '/');

            assert.strictEqual(root.text, 'ROOT');
            assert.strictEqual(root.href, '/files/hash/');

            assert.strictEqual(a.text, 'a');
            assert.strictEqual(a.href, '/files/hash/a/');

            assert.strictEqual(b.text, 'b');
            assert.strictEqual(b.href, '/files/hash/a/b/');

            assert.strictEqual(c.text, 'c');

        })

        it('Случай, когда путь не указан', () => {
			const bc = buildBreadcrumbs('hash', '');
			assert.strictEqual(bc.length, 2, 'Проверка на количество крошек');
			const [history, root] = bc;

			assert.strictEqual(history.text, 'HISTORY');
			assert.strictEqual(history.href, '/');

			assert.strictEqual(root.text, 'ROOT');
		});
    })
});