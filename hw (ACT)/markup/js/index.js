$(document).ready(function(){	
	$('body').on("click", "a", function( event ){
		event.preventDefault();
	});
  
	$('body').click(function( event ){
          
		// check whether clicked element is a part of nav
        var eventInNav = $( event.target ).parents('nav') || $( event.target ).parents('#nav-about') || $( event.target ).parents('#nav-media');

        // not our element
        if( !eventInNav.length ){
            $('.submenu').slideUp(100);
			$('#subnav-media').slideUp(100);
			$('#subnav-about').slideUp(100);
        }
    });

    $('#nav-about').click(function( event ){
		$('#subnav-media').slideUp(100);
		$('#subnav-about').slideDown(200);	
	});
	$('#nav-media').click(function( event ){
		$('#subnav-about').slideUp(100);
		$('#subnav-media').slideDown(200);
    });
	

	// gallery slider
	var sliderPics = [ 0, 0, 0, 0];
	//	'gallery-pic1.jpg',
	//	'gallery-pic2.jpg',
	//	'gallery-pic3.jpg',
	//]
	var currPic = -1;
	var numPics = sliderPics.length;
	
	var delay = 2000;
	
	var currTimeout;
	
	function showPic(direction) {
		if (document.images) {
			currPic = currPic + direction;
			if (currPic < 0) {
				currPic = numPics - 1;
			}
			if (currPic == numPics) currPic = 0;
		}
		$('.slider-holder img').attr('src', 'images/gallery-pic' + currPic + '.jpg');
		//currTimeout = setTimeout('showPic(1)', delay);
	}
	
	$('.next-btn').click(function showNext() {
		showPic(1);
	});
	$('.prev-btn').click(function showPrev() {
		showPic(-1);
	});
	
	showPic(2);
});