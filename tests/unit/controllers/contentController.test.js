const express = require('express');
const request = require('supertest');
const path = require('path');

const fakeREPO = path.resolve('./tests/hermioneStub/');
const sinon = require('sinon');
const { expect, assert } = require('chai');
const { executeGit } = require('./../../../utils/git');
const contentController = require('./../../../controllers/contentController');

describe('controllers/contentController', () => {
  it('передает корректные параметры для шаблонизатора', (done) => {
    const app = express();
    const breadcrumbsMock = sinon.fake();

    // полменяем данные стабами и моками
    executeGit._fakeREPO = fakeREPO;
    contentController._buildBreadcrumbsFake = (...args) => {
      breadcrumbsMock(...args);
      return 'BreadCrumbs';
    };
    contentController._gitFileContentFake = () => 'FileContent';
    contentController._gitFileTreeFake = sinon.fake.resolves([
      {
        type: 'blob',
        hash: '84fffd893f6edf655d2537c4d1b24b268e61e270',
        path: '.editorconfig',
      }]);
    contentController._renderFake = res => (...args) => { res.send({ data: args }); };
    app.get('/content/:hash/*?', contentController);

    // делаем фэйковый запрос
    request(app)
      .get('/content/84fffd893f6edf655d2537c4d1b24b268e61e270/.editorconfig')
      .expect(200)
      .end((err, res) => {
        //  блок проверки
        expect(res.body.data).to.have.deep.members(['content',
          {
            title: 'content',
            breadcrumbs: 'BreadCrumbs',
            content: 'FileContent',
          }]);
        assert(breadcrumbsMock.calledWith('84fffd893f6edf655d2537c4d1b24b268e61e270', '.editorconfig'));

        done();
      });
  });
});
