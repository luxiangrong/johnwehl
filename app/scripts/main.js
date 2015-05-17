"use strict";
(function($) {
    $(document).ready(function() {
    	var scaleRate = 4;
        var activeItem;
        var itemWidth, itemHeight;


        function fixItemHeight() {
            var itemWidth = $('.gallery .gallery-item').width();
            $('.gallery .gallery-item').height(itemWidth);

            if($(window).width() >= 992) {
            	scaleRate = 4;
            } else {
            	scaleRate = 3;
            }

        }
        $(window).on('resize', function() {
            fixItemHeight();
        });
        fixItemHeight()


        $('.gallery .gallery-item').on('click', function(e) {
        	e.preventDefault();

        	activeItem = $(this);

        	var imgSrc = $(this).find('a').attr('href');

            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var itemWidth = $(this).width();

            var position = $(this).position();

            console.log(position);
            // $('.viewport').css('left', position.left);
            // $('.viewport').css('top', position.top);
            // $('.viewport').width(itemWidth);
            // $('.viewport').height(itemWidth);
            var bigImg = $('<img>').attr('src', imgSrc);
            $('.viewport').html(bigImg);
            $('.viewport').show();
            if($('.viewport').hasClass('scaled')) {
            	$('.viewport').velocity({
	            	left: position.left,
	            	top: position.top,
	            	width: itemWidth,
	            	height: itemWidth,
	            	opacity: 0
	            }, {
	            });
            } else {
            	$('.viewport').velocity({
	            	left: position.left,
	            	top: position.top,
	            	width: itemWidth,
	            	height: itemWidth,
	            	opacity: 0
	            }, {
	            	duration: 0
	            });
            }
            
            var leftScaleOffset = Math.round(position.left / itemWidth);
            var rightScaleOffset = Math.round(($('.gallery').width() - position.left) / itemWidth) ;
            var topScaleOffset = Math.round(position.top / itemWidth);
            var bottomScaleOffset = Math.round(($('.gallery').height() - position.top) / itemWidth) ;

            var newLeft, newTop;
            var scaleSplit = Math.floor(scaleRate / 2);
            if(leftScaleOffset >= scaleSplit) {
            	newLeft = position.left - itemWidth * scaleSplit;
            	if(rightScaleOffset <= scaleSplit) {
            		newLeft = position.left - itemWidth * (scaleRate - rightScaleOffset);
            	}
            } else {
            	newLeft = 0;
            }
            if(topScaleOffset >= scaleSplit) {
            	newTop = position.top - itemWidth * scaleSplit;
            	if(bottomScaleOffset <= scaleSplit) {
            		newTop = position.top - itemWidth * (scaleRate - bottomScaleOffset);
            	}
            } else {
            	newTop = 0;
            }


            $('.viewport').velocity({
            	left: newLeft,
            	top: newTop,
            	width: itemWidth * scaleRate,
            	height: itemWidth* scaleRate,
            	opacity: 1
            }, {
            	complete: function(){
            		$(this).addClass('scaled');
            	}
            });

            
        });

		$('.viewport').on('click', function(){
			var viewPort = $(this);
        	$(this).velocity({
        		left: activeItem.position().left,
        		top: activeItem.position().top,
        		width: activeItem.width(),
        		height: activeItem.height(),
        		opacity: 0
        	}, {
        		queue: false,
        		complete: function(){
        			viewPort.hide();
        			viewPort.removeClass('scaled');
        		}
        	});
        });
    });
})(jQuery);