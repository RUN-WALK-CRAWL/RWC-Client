'use strict';

page('/search/:lat/:lng/:stops/:price/',
  (ctx, next) => app.Crawl.search(ctx, next),
  ctx => app.crawlView.initRouteView(ctx));
page('/search', ctx => app.crawlView.initSearchView(ctx));
page('/login/:username', () => app.initUserProfile());
page('/login', () => app.adminView.initAdminPage());

// page('/create/:username', ctx=>app.crawlView.initCreatePage(ctx));
page('/about', () => app.crawlView.initAboutPage());
page('/', ()=> app.crawlView.initHomePage());

page();