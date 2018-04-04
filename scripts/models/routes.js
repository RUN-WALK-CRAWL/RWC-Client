'use strict';

page('/search/:lat/:lng/:stops/:distance/',
  (ctx, next) => app.Crawl.search(ctx, next),
  ctx => app.crawlView.initRouteView(ctx));
page('/search', ctx => app.crawlView.initSearchView(ctx));

page();