Template.user.helpers({
  url: function () {
    var user;
    if      (this.user)   { user = this.user; }
    else if (this.userId) { user = Meteor.users.findOne(this.userId); }
    return Avatar.getUrl(user);
  },
 });