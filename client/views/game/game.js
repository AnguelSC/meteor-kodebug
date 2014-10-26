var myCodeMirror;
var practice;
var interval;
Session.setDefault('count',120);
Session.setDefault('win',true);
Session.setDefault('text');
Session.setDefault('lenguage');
Template.game.rendered = function() {
	$('.code').html(function(index, value) {
		myCodeMirror = CodeMirror.fromTextArea(this,{
	        mode: 'javascript',
	        lineNumbers: true,
	        lineWrapping: true,
	        theme : 'monokai',
		});
	});

	clock = Session.get('count');
	interval = Meteor.setInterval(function () {
      clock -= 1;
      Session.set('count',clock);
      if (clock === 0) {
      	var algo = myCodeMirror.getValue();
        Meteor.call('finish',algo,Session.get('selectedPracticeId'),function(e,r){
        	Session.set('text',r);
	    	Meteor.clearInterval(interval);
	    	Session.set('win',false);
        	console.log(r);
        });
      }
    }, 1000);
};
Template.game.helpers({
	code:function(){
		var idPractice  = Session.get('selectedPracticeId');
		practice = Practices.findOne({_id:idPractice});
		Session.set('lenguage',practice.lenguage);
		Meteor.clearInterval(interval);
		return practice.codeError;
	},
	lenguage: function(){
		return Session.get('lenguage');
	},
	win:function(){
		return Session.get('win');
	},
	count:function(){
		var min = Math.floor(Session.get('count') / 60);
	    var sec = Session.get('count') % 60;
	    return min + ':' + (sec < 10 ? ('0' + sec) : sec);
	},
});
Template.finish.helpers({
	text:function(){
		return Session.get('text');
	}
});

Template.game.events({
'click .finish' : function(event,template){
    var algo = myCodeMirror.getValue();
    Meteor.call('finish',algo,Session.get('selectedPracticeId'),function(e,r){
    	Session.set('text',r);
    	Meteor.clearInterval(interval);
    	Session.set('win',false);

    });
}

});