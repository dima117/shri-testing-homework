const assert = require('assert');
const request = require('supertest');
const app = require('../app');

const testRoute = route => {
  it(`should return status ${route.status} for ${route.path}`, () => {
    return request(app)
      .get(route.path)
      .then(response => {
        assert.equal(response.status, route.status);
        if (response.error) {
          assert.equal(
            response.error,
            `Error: cannot GET ${route.path} (${route.status})`
          );
        }
      });
  });
};

describe('App routes statuses', async () => {
  describe('route /', () => {
    testRoute({ path: '/', status: 200 });
  });

  describe('route /files/:hash/*?', () => {
    const routes = [
      { path: '/files/7342aa11c6df9cbbf4adcd2a287e207e280da68f/', status: 200 },
      {
        path: '/files/7342aa11c6df9cbbf4adcd2a287e207e280da68f/utils',
        status: 200
      },
      { path: '/files/smiley_face/utils', status: 500 }
    ];

    routes.map(route => {
      testRoute(route);
    });
  });

  describe('route /content/:hash/*?', () => {
    const routes = [
      {
        path: '/content/7342aa11c6df9cbbf4adcd2a287e207e280da68f/package.json',
        status: 200
      },
      {
        path:
          '/content/7342aa11c6df9cbbf4adcd2a287e207e280da68f/utils/helpers.js',
        status: 200
      },
      { path: '/content/wrong_hash/package.json', status: 500 }
    ];

    routes.map(route => {
      testRoute(route);
    });
  });

  const incorrectRoutes = [
    { path: '/content/wrong_hash', status: 404 },
    { path: '/blah', status: 404 },
    { path: '/files/smiley_face', status: 404 },
    { path: '/:)/', status: 404 }
  ];

  incorrectRoutes.map(route => {
    testRoute(route);
  });
});
