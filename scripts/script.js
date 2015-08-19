window.onload = function() {
	$('#loading').hide();
}

$(document).ready(function () {

	/* Navigation bar smooth scroll */

	$('a[href^="#"]').on('click', function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);
	    var offset = $target.offset();

	    var pos = $(window).scrollTop();

	    if (offset) {
	    	offset = offset.top + 2;
	    } else {
	    	offset = 0;
	    }

	    if (Math.abs(offset - pos) > 5) {
		    $('html, body').stop().animate({
		        'scrollTop': offset
		    }, 1600, 'easeInOutCirc', function () {
		        window.location.hash = target;
		    });
		}
	});


	/* Hide or show the navigation bar based on scrolling */

	var lastScrollTop = 0;
	var hidden = false;
	var delta = 5;
	$(window).scroll(function (e) {
		var st = $(this).scrollTop();
		if (Math.abs(lastScrollTop - st) >= delta) {
			if (st > lastScrollTop) {
				if (hidden == false) {
					$('nav').stop().animate({top: '-100px'}, 500, 'swing');
					hidden = true;
				}
				/* Hide scroll down arrow */
				if (st >= $('#about').offset().top - 25) {
					$('.scroll-down').stop().fadeOut(500, 'swing');
				}
			} else {
				if (hidden == true) {
					$('nav').stop().animate({top: '0px'}, 500, 'swing');
					hidden = false;
				}
				/* Show scroll down arrow */
				if (st <= $('#about').offset().top + 25) {
					$('.scroll-down').stop().fadeIn(500, 'swing');
				}
			}
		}

		checkSection();

		lastScrollTop = st;
	});


	/* Highlight the carrect link in the navigation bar based on the scrolling */

	var checkSection = function () {
		var st = $(window).scrollTop();

		if (st >= $('#about').offset().top && st < $('#resume').offset().top) {
			$('nav a[href="#about"]').css('border-bottom-color', '#009688');
			$('nav a[href!="#about"]').css('border-bottom-color', 'transparent');
		} else if (st >= $('#resume').offset().top && st < $('#portfolio').offset().top) {
			$('nav a[href="#resume"]').css('border-bottom-color', '#009688');
			$('nav a[href!="#resume"]').css('border-bottom-color', 'transparent');
		} else if (st >= $('#portfolio').offset().top && st < $('#contact').offset().top) {
			$('nav a[href="#portfolio"]').css('border-bottom-color', '#009688');
			$('nav a[href!="#portfolio"]').css('border-bottom-color', 'transparent');
		} else if (st >= $('#contact').offset().top) {
			$('nav a[href="#contact"]').css('border-bottom-color', '#009688');
			$('nav a[href!="#contact"]').css('border-bottom-color', 'transparent');
		} else {
			$('nav a[href^="#"]').css('border-bottom-color', 'transparent');
		}
	}

	
	/* Change the content of the resume */

	$('#skills-link').on('click', function () {
		changeResume("skills");
	});
	$('#edu-link').on('click', function () {
		changeResume("edu");
	});
	$('#courses-link').on('click', function () {
		changeResume("courses");
	});

	var changeResume = function (sec) {
		$('#resume section:not([id=' + sec + '])').hide();
		$('#' + sec).fadeIn(800, 'swing');
		$('#' + sec + '-link').css('border-bottom-color', '#FFFFFF');
		$('.nav-resume li:not([id="' + sec + '-link"])').css('border-bottom-color', 'transparent');
	}


	/* Change the border of the inputs */

	$('textarea, input[type="text"]').focusout(function () {
		if ($(this).val().length > 0) {
			$(this).css('border-bottom-color', '#8BC34A');
		} else {
			$(this).css('border-bottom-color', '#EEEEEE');
		}
	});

	$('input[type="email"]').focusout(function () {
		if ($(this).val().length > 0) {
			if ($(this).val().match(/^.+@.+\..+$/)) {
				$(this).css('border-bottom-color', '#8BC34A');
			} else {
				$(this).css('border-bottom-color', '#F44336');
			}
		} else {
			$(this).css('border-bottom-color', '#EEEEEE');
		}
	});


	/* Control form submit */

	$('form').submit(function () {
		var correct = true;

		if ($('input[name="name"]').val().length < 1) {
			$('input[name="name"]').css('border-bottom-color', '#F44336');
			correct = false;
		}
		if ($('textarea').val().length < 1) {
			$('textarea').css('border-bottom-color', '#F44336');
			correct = false;
		}
		if ($('input[name="email"]').val().length < 1 || !$('input[name="email"]').val().match(/^.+@.+\..+$/)) {
			$('input[name="email"]').css('border-bottom-color', '#F44336');
			correct = false;
		}

		return correct;
	});

});