const express = require('express');
const request = require('supertest');

const sinon = require('sinon');
const { expect, assert } = require('chai');
const contentController = require('./../../../controllers/contentController');

describe('передача данных в шаблонизатор: contentController', () => {
  // сброс точек расширения
  afterEach(() => {
    contentController._buildBreadcrumbsFake = null;
    contentController._gitFileContentFake = null;
    contentController._gitFileTreeFake = null;
    contentController._renderFake = null;
  });

  beforeEach(() => {
    contentController._buildBreadcrumbsFake = null;
    contentController._gitFileContentFake = null;
    contentController._gitFileTreeFake = null;
    contentController._renderFake = null;
  });

  it('передает корректные параметры для шаблонизатора', (done) => {
    const breadcrumbsMock = sinon.fake();
    const expectedTemplateData = ['content',
      {
        title: 'content',
        breadcrumbs: 'BreadCrumbsStub',
        content: 'FileContentStub',
      },
    ];
    const fileTreeStub = [
      {
        type: 'blob',
        hash: '84fffd893f6edf655d2537c4d1b24b268e61e270',
        path: '.editorconfig',
      },
    ];


    // подменяем данные стабами и моками
    contentController._buildBreadcrumbsFake = (...args) => {
      breadcrumbsMock(...args);
      return 'BreadCrumbsStub';
    };
    contentController._gitFileContentFake = () => 'FileContentStub';
    contentController._gitFileTreeFake = sinon.fake.resolves(fileTreeStub);
    contentController._renderFake = res => (...args) => { res.send({ data: args }); };


    // запуск express
    const app = express();
    app.get('/content/:hash/*?', contentController);


    // делаем фэйковый запрос
    request(app)
      .get('/content/84fffd893f6edf655d2537c4d1b24b268e61e270/.editorconfig')
      .expect(200)
      .end((err, res) => {
        // проверка того что передается в шаблонизатор
        expect(res.body.data).to.have.deep.members(expectedTemplateData);

        // проверка разбора url
        assert(breadcrumbsMock.calledWith('84fffd893f6edf655d2537c4d1b24b268e61e270', '.editorconfig'));

        done();
      });
  });
});
