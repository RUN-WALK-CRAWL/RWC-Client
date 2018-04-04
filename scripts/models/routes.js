'use strict';

page('/search/:lat/:lng/:stops/:distance/',
  (ctx, next) => app.Crawl.search(ctx, next),
  ctx => app.crawlView.initRouteView(ctx));
page('/search', ctx => app.crawlView.initSearchView(ctx));
page('/login/:username', () => app.initUserProfile());
page('/login', () => app.adminView.initAdminPage());

// page('/create/:username', ctx=>app.crawlView.initCreatePage(ctx));

page('/route', ()=>app.crawlView.initCrawlRoute());
page('/', ()=> ()=> app.crawlView.initHomePage());

page();