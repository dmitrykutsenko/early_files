$(document).ready(function(){	
	
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
    slider('.slider-block');

    function slider(sliderClass) {
        var sliderBlock = $(sliderClass);

        sliderBlock.each(function () {
            var sliderList = $(this).find('.slider');
            var sliderItems = sliderList.children('li');
            var qty = sliderItems.length;
            //clone
            sliderList.append(sliderItems.first().clone());

            //find controls
            var controls = $('#controls');

            //slider
            var itemWidth = sliderItems.width();
            var sliderLeft = 0;
            var newsliderLeft = 0;
            var currentSlide = 0;
            var flag = true;

            setActive();

            //buttons handler
            controls
                .on('click', '.next-btn', eventHandler(function() {
					
                    if (currentSlide >= qty){
                        jumpToFirstItem();
                    }
                    goToNextItem();
                }))
                .on('click', '.prev-btn', eventHandler(function() {
                    if (currentSlide <= 0){
                        jumpToLastItem();
                    }
                    goToPreviousItem();
                }));

            function setActive(){
                var index = currentSlide;
                if (currentSlide > qty - 1) {
                    index = 0
                } else if (currentSlide < 0) {
                    index = qty;
                }
            }

            function startAnim(newsliderLeft) {
                flag = false;
                sliderList.animate({
                    marginLeft: Math.round(newsliderLeft)
                }, '300', function () {
                    flag = true;
                    sliderLeft = newsliderLeft;
                });
            }

            function animate(left) {
                setActive();
                startAnim(left);
            }
            function prepareFutureSlide(index) {
                currentSlide = index;
                sliderLeft = index * itemWidth * -1;
            }
            function jumpToItem(index) {
                prepareFutureSlide(index);
                sliderList.css({'margin-left': sliderLeft});
            }
            function jumpToFirstItem () {
                jumpToItem(0);
            }
            function jumpToLastItem () {
                jumpToItem(qty);
            }
            function goToItem(index) {
                prepareFutureSlide(index);
                animate(sliderLeft);
            }
            function goToNextItem () {
                goToItem(currentSlide + 1);
            }
            function goToPreviousItem () {
                goToItem(currentSlide - 1);
            }
            function eventHandler (fn) {
                return function (e) {
                    e.preventDefault();
                    if (!flag) return;
                    fn.call(this, e);
                }
            }
        })
    }
});