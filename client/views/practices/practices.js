var areaOriginal;
var areaError;
Meteor.subscribe('practices');

Template.practices.rendered = function() {
	$('pre code').each(function(i, block) {
	    hljs.highlightBlock(block);
	  });
	$( ".code" ).html(function(index, value) {
		CodeMirror.fromTextArea(this,{
	        lineNumbers: true,
	        lineWrapping: true,
	        theme : 'mdn-like',
		});
	});
	$( "textarea[name='codeOriginal']" ).html(function(index, value) {
		areaOriginal = CodeMirror.fromTextArea(this,{
	        mode: 'php',
	        lineNumbers: true,
	        lineWrapping: true,
	        theme : 'monokai',
		});
	});
	$( "textarea[name='codeError']" ).html(function(index, value) {
		areaError = CodeMirror.fromTextArea(this,{
	        mode: 'php',
	        lineNumbers: true,
	        lineWrapping: true,
	        theme : 'monokai',
		});
	});
}
Template.practices.all = function(){
	return Practices.find();
}

Template.practices.events({
	'change select[name="lenguage"]': function(event,template){
		var mode = template.find('select[name="lenguage"]').value;
		areaOriginal.setOption('mode',mode);
		areaError.setOption('mode',mode);
	}
});