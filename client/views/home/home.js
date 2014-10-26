Template.home.events({
	'click .select': function(){
		Meteor.call('start',function(e,r){
			if(e)
				console.log(e);
			Router.go("/game/"+r._id);
			//"guest"!=t&&Router.go("/practice/"+c)
		});
	}
})