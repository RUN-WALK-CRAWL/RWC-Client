var app = app || {};

(function (module) {
  const adminView = {};
  //We need to add a new user or check if existing
  //Should assume the user is ready to log in
  //if not a user they will click the link to create a new user
  //the link will show a differtent View
  adminView.initNewUserPage = ()=>{
    $('.container').hide();
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
            event.target.password.value = '';
            event.target.username.value = '';
          }
        });
    });
  };
  adminView.initAdminPage = ()=>{
    app.crawlView.handleNav();
    $('.guest').hide();
    $('.user').hide();
    $('#nav-profile').hide();
    if (localStorage.token === 'true') {
      module.crawlView.initUserProfile();
      return;}
    $('.container').hide();
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
          if(res.token){
            localStorage.token = true;
            if (localStorage.username) {localStorage.user_id = res.id;}
            else {localStorage.setItem('user_id', res.id);}
            $('.container').hide();
            module.crawlView.initUserProfile(res);
            event.target.password.value = '';
            event.target.username.value = '';
          }
        })
        .catch(() => {
          token='';
          username='';
          $('.error').show();
        });
    });
  };

  module.adminView = adminView;
})(app);