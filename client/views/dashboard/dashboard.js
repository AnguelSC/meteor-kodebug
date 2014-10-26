Template.dashboard.rendered = function() {
	$(".moment").html(function(index, value) {
	 return moment(value).fromNow();
	});
};
