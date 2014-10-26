Meteor.startup(function() {
	if (Lenguages.find().count() === 0) {
	    Lenguages.insert({name:'HTML'});
	    Lenguages.insert({name:'javascript'});
	    Lenguages.insert({name:'Java'});
	    Lenguages.insert({name:'VB.NET'});
	    Lenguages.insert({name:'PHP'});
	}
});
Meteor.publish('lenguages',function(){
	return 	Lenguages.find();
});
Meteor.publish('practices',function(){
	return 	Practices.find();
});

Meteor.methods({
	start : function(){
		var array = Practices.find().fetch();
		var randomIndex = Math.floor( Math.random() * array.length );
		return array[randomIndex];
	},
	finish : function(algo,idPractice){
		practice = Practices.findOne({_id:idPractice});
		if(algo.localeCompare(practice.codeOriginal) === 0){
	    	return 'Has Ganado';
		}else{
	    	return 'Has Perdido';
		}
	},
});


