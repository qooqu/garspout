$(document).ready(function() {
	$('#MHimg').fadeIn(11600);
	setTimeout(function(){
		$('#MHdiv').css('background-size', 'auto');
	},12000);
	setTimeout(function(){
		$('#logo').css('display', 'inline');
	},20000);
	setTimeout(function(){
		$('#dualphin').css('display', 'block');
		$('#MHimg').css('display', 'none');
		$('#MHdiv').css('background-size', '0 0');
		$('#logo').css('animation-iteration-count', '0');
	},34500);
});