"use strict";
page('/login', () => app.adminView.initAdminPage());
page('/login/:username', () => app.initUserProfile());
page('/', ()=> ()=> app.crawlView.initHomePage());
page('/create', ()=> app.crawlView.initCreatePage());
page('/create/:username', ctx=>app.crawlView.initCreatePage(ctx));
page('/route', ()=>app.crawlView.initCrawlRoute());
page();