if(Meteor.isClient) {
  Session.setDefault("selectedPracticeId");
}

Router.map(function() {

  this.route('home', {
    path: '/',
    data: {
      lenguages: Lenguages.find({})
    },
  });

  this.route('dashboard', {
    path: '/dashboard',
    loginRequired: 'entrySignIn',
    waitOn: function() {
      return this.subscribe("items");
    },
    data: {
      items: Items.find({})
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Dashboard | ' + SEO.settings.title
      });
    }
  });
  this.route('practices', {
    path: '/practices',
    loginRequired: 'entrySignIn',
  });
  this.route("game",{
    path:"/game/:practiceId",
    template:"game",
    onBeforeAction:function(){
      Session.set('count',120);
      Session.set('win',true);
      Session.set('text',null);
      Session.set("selectedPracticeId",this.params.practiceId);
      //this.subscribe("currentPractice").wait()
    }});
  this.route('profile', {
    path: '/profile',
    data: function() {
      return Meteor.user();
    }
  });
  this.route('user',{
    path:'/user/:username',
    data: function() {
      console.log(Meteor.users.findOne({'profile.username':this.params.username}));
      return Meteor.users.findOne({'profile.username':this.params.username});
    },
    onAfterAction: function() {
      SEO.set({
        title: this.params.username + ' | ' + SEO.settings.title
      });
    }
  });

  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });

});
