'use strict';

page('/search/:lat/:lng/:stops/:distance/',
  (ctx, next) => app.Crawl.search(ctx, next),
  ctx => app.crawlView.initRouteView(ctx));
page('/search', ctx => app.crawlView.initSearchView(ctx));
page('/register', () => app.adminView.initNewUserPage());
page('/login', () => app.adminView.initAdminPage());

// page('/create/:username', ctx=>app.crawlView.initCreatePage(ctx));

page('/', ()=> app.crawlView.initHomePage());

page();