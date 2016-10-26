$(document).ready(function(){

	$(function(){
		var navbar = $('.navbar-collapse');

		navbar.on('click', 'a', null, function(){
			navbar.collapse('hide');
		});
	});

});