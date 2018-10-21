const express = require('express');
const request = require('supertest');

const sinon = require('sinon');
const { expect } = require('chai');
const indexController = require('./../../../controllers/indexController');

describe('передача данных в шаблонизатор: indexController', () => {
  it('передает корректные параметры для шаблонизатора', (done) => {
    const expectedTemplateData = ['index',
      {
        title: 'history',
        breadcrumbs: 'BreadCrumbStub',
        list: [
          {
            hash: '84fffd893f6edf655d2537c4d1b24b268e61e270',
            author: 'Alexander Ivankov',
            timestamp: '2018-10-20 23:15:00 +0300',
            msg: 'Hermione stab: add public folder with index.html',
            href: 'hrefStub',
          },
          {
            hash: 'c18048efb508c18f2f9939171f97678fc44b774a',
            author: 'Alexander Ivankov',
            timestamp: '2018-10-20 23:13:03 +0300',
            msg: 'Hermione stab: add .editorconfig',
            href: 'hrefStub',
          },
          {
            hash: 'a451e7b637a1acc7af53555507e49d5ebb4b7ee2',
            author: 'Alexander Ivankov',
            timestamp: '2018-10-20 23:11:35 +0300',
            msg: 'Hermione stab: add README',
            href: 'hrefStub',
          },
          {
            hash: '0570b9d8254105d9ffee47d68eea34c9037dda74',
            author: 'Alexander Ivankov',
            timestamp: '2018-10-20 23:07:29 +0300',
            msg: 'Hermione stab: initial commit',
            href: 'hrefStub',
          },
        ],
      },
    ];
    const gitHistoryStub = [
      {
        hash: '84fffd893f6edf655d2537c4d1b24b268e61e270',
        author: 'Alexander Ivankov',
        timestamp: '2018-10-20 23:15:00 +0300',
        msg: 'Hermione stab: add public folder with index.html',
      },
      {
        hash: 'c18048efb508c18f2f9939171f97678fc44b774a',
        author: 'Alexander Ivankov',
        timestamp: '2018-10-20 23:13:03 +0300',
        msg: 'Hermione stab: add .editorconfig',
      },
      {
        hash: 'a451e7b637a1acc7af53555507e49d5ebb4b7ee2',
        author: 'Alexander Ivankov',
        timestamp: '2018-10-20 23:11:35 +0300',
        msg: 'Hermione stab: add README',
      },
      {
        hash: '0570b9d8254105d9ffee47d68eea34c9037dda74',
        author: 'Alexander Ivankov',
        timestamp: '2018-10-20 23:07:29 +0300',
        msg: 'Hermione stab: initial commit',
      },
    ];


    // подменяем данные стабами и моками
    indexController._buildBreadcrumbsFake = () => 'BreadCrumbStub';
    indexController._gitHistoryFake = sinon.fake.resolves(gitHistoryStub);
    indexController._renderFake = res => (...args) => { res.send({ data: args }); };
    indexController._buildFolderUrlFake = () => 'hrefStub';


    // запуск express
    const app = express();
    app.get('/', indexController);


    // делаем фэйковый запрос
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        // проверка того что передается в шаблонизатор
        expect(res.body.data).to.have.deep.members(expectedTemplateData);

        done();
      });
  });
});
