var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'insert cloud API server URL here';
ENV.developmentApiUrl = 'insert local API server URL here';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module) {
    const adminView = {};

    adminView.initAdminPage = ()=>{
      $('.container').hide();
      $('.login-view').show();
  
      $('#login-form').on('submit', function(event) {
        event.preventDefault();
        let token = event.target.password.value;
        let username = event.target.username.value;

        $.get(`${ENV.apiUrl}/api/v1/login/${username}`, {token,username})
          .then(res => {
            if(res){
              localStorage.token = true;
              $('.container').hide();
              module.crawlView.initUserProfile(username);
            }
          })
          .catch(() => {token='';username='';$('.error').show();});
      })
    };
  
    module.adminView = adminView;
  })(app)