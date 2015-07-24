$(document).ready(function(){	
	$('body').on("click", "a", function( event ){
		event.preventDefault();
	});
 
	// gallery slider
	var sliderPics = [ 0, 0, 0];
	var currPic = -1;
	var numPics = sliderPics.length;	
	
	function showPic(direction) {
		if (document.images) {
			currPic = currPic + direction;
			if (currPic < 0) {
				currPic = numPics - 1;
			}
			if (currPic == numPics) currPic = 0;
		}
		$('.gallery img').attr('src', 'images/slider' + currPic + '.jpg');
	}
	
	$('.next-btn').click(function showNext(event) {
		showPic(1);
	});
	$('.prev-btn').click(function showPrev(event) {
		showPic(-1);
	});
	
	showPic(1);
});