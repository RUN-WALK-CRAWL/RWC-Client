var app = app || {};

// const ENV = {};

// ENV.isProduction = window.location.protocol === 'https:';
// ENV.productionApiUrl = 'insert cloud API server URL here';
// ENV.developmentApiUrl = 'insert local API server URL here';
// ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module) {
  const adminView = {};
//We need to add a new user or check if existing
//Should assume the user is ready to login 
//if not a user they will click the link to create a new user
//the link will show a differtent View
  adminView.initNewUserPage = ()=>{
    $('.container').hide();
    $('#background').show();
    $('.new-user-view').show();
    $('#register-new-user-form').on('submit', function(event){
      event.preventDefault();
      let token= event.target.password.value;
      let username= event.target.username.value;

      $.post(`${ENV.apiURL}/api/v1/register`, {token,username})
      .then(res => {
        if(res){
          localStorage.token = true;
          module.crawlView.initUserProfile(username);
        }
      })
    })
  }
  adminView.initAdminPage = ()=>{
    $('.container').hide();
    $('#background').show();
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
    });
  };

  module.adminView = adminView;
})(app);