const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // API_HOST is used when running on docker
      target: process.env.API_HOST || 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};
