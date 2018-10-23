const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

const { parseHistoryItem, gitHistory, parseFileTreeItem, gitFileTree, gitFileContent } = require('../utils/git');

describe('Запуск гита и получение рез-та', () => {
	it('parseHistoryItem получает строку', function() {
		const data = parseHistoryItem('someName');
		expect(data).not.be.empty;
	});

	it('parseHistoryItem возвращает объект', function() {
		const data = 'qwqwqwqwqwqw\tauthor\t11:11:11\ttest';
		const dataSplitted = data.split('\t');
		const result = parseHistoryItem(data);
		expect(result).to.have.property('hash').to.eql(dataSplitted[0]);
		expect(result).to.have.property('author').to.eql(dataSplitted[1]);
		expect(result).to.have.property('timestamp').to.eql(dataSplitted[2]);
		expect(result).to.have.property('msg').to.eql(dataSplitted[3]);
	});
});

describe('Получение истории коммитов от гита', () => {});

describe('Получение списка файлов в коммите', () => {
	it('parseFileTreeItem получает строку', function() {
		const data = parseHistoryItem('someName');
		expect(data).not.be.empty;
	});

	it('parseFileTreeItem возвращает объект', function() {
		const data = '111 blob qwqwqwqwqwqw\tdirectory/file';
		const dataSplitted = data.split('\t');
		const infoSplitted = dataSplitted[0].split(' ');
		const result = parseFileTreeItem(data);
		expect(result).to.have.property('type').to.eql(infoSplitted[1]);
		expect(result).to.have.property('hash').to.eql(infoSplitted[2]);
		expect(result).to.have.property('path').to.eql(dataSplitted[1]);
	});

	it('gitHistory получает список коммитов', function() {});
});

describe('Получение содержимого файлов', () => {
	it('gitFileContent получает строку', function() {
		const data = 'qwqwqwqwqwqw';
		expect(data).not.be.empty;
	});
});
