const routes = require("next-routes")();

routes.add('/campaign/new','/campaign/new');
routes.add('/campaign/:address','/campaign/show');
routes.add('/campaign/:address/requests','/campaign/requests/index');
routes.add('/campaign/:address/requests/new','/campaign/requests/new');

module.exports = routes;