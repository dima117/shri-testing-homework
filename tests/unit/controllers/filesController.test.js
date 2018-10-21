const express = require('express');
const request = require('supertest');

const sinon = require('sinon');
const { expect, assert } = require('chai');
const filesController = require('./../../../controllers/filesController');

describe('передача данных в шаблонизатор: filesController', () => {
  it('передает корректные параметры для шаблонизатора', (done) => {
    const breadcrumbsMock = sinon.fake();
    const expectedTemplateData = ['files',
      {
        title: 'files',
        breadcrumbs: 'BreadCrumbsStub',
        files: [{
          type: 'blob',
          hash: 'c6c8b3621938a4691225a870a59bf382af1883dd',
          path: '.editorconfig',
          href: 'fileUrlStub',
          name: '.editorconfig',
        },
        {
          type: 'blob',
          hash: '4534e4137153653f325588e66ac0a718ff6e5c06',
          path: 'README.md',
          href: 'fileUrlStub',
          name: 'README.md',
        },
        {
          type: 'tree',
          hash: '87e460e630cfbbff3945e03b145737c52038f2a1',
          path: 'public',
          href: 'folderUrlStub',
          name: 'public',
        },
        {
          type: 'blob',
          hash: 'a2248efc6c902df79213e375778c2d00eb28d546',
          path: 'test.js',
          href: 'fileUrlStub',
          name: 'test.js',
        }],
      },
    ];
    const fileTreeStub = [
      {
        type: 'blob',
        hash: 'c6c8b3621938a4691225a870a59bf382af1883dd',
        path: '.editorconfig',
      },
      {
        type: 'blob',
        hash: '4534e4137153653f325588e66ac0a718ff6e5c06',
        path: 'README.md',
      },
      {
        type: 'tree',
        hash: '87e460e630cfbbff3945e03b145737c52038f2a1',
        path: 'public',
      },
      {
        type: 'blob',
        hash: 'a2248efc6c902df79213e375778c2d00eb28d546',
        path: 'test.js',
      },
    ];


    // полменяем данные стабами и моками
    filesController._buildBreadcrumbsFake = (...args) => {
      breadcrumbsMock(...args);
      return 'BreadCrumbsStub';
    };
    filesController._gitFileTreeFake = sinon.fake.resolves(fileTreeStub);
    filesController._renderFake = res => (...args) => { res.send({ data: args }); };
    filesController._buildFolderUrlFake = () => 'folderUrlStub';
    filesController._buildFileUrlFake = () => 'fileUrlStub';


    // запуск express
    const app = express();
    app.get('/files/:hash/*?', filesController);


    // делаем фэйковый запрос
    request(app)
      .get('/files/84fffd893f6edf655d2537c4d1b24b268e61e270/')
      .expect(200)
      .end((err, res) => {
      // проверка того что передается в шаблонизатор
        expect(res.body.data).to.have.deep.members(expectedTemplateData);

        // проверка разбора url
        assert(breadcrumbsMock.calledWith('84fffd893f6edf655d2537c4d1b24b268e61e270', ''));

        done();
      });
  });
});
