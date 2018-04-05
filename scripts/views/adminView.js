var app = app || {};

// const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://pub-crawl-codefellows.herokuapp.com/';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

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
      console.log(token);
      $.ajax({
        url:`${ENV.apiUrl}/api/v1/rwc/${username}`,
        type: 'GET',
        headers: {token:token}
      })
        .then(res => {
          console.log(res);
          if(res.token){
            localStorage.token = true;
            $('.container').hide();
            module.crawlView.initUserProfile(res);
          }
        })
        .catch(() => {token='';username='';$('.error').show();});
    });
  };

  module.adminView = adminView;
})(app);