function scrollPageTo(target) {
	var button = $(target);
	var offset = 0;
	target = $(button.attr("href"));
	to_end = button.is('.join__button, .community__button, .offline__button');
	main_wrapper = $('.main-wrapper');
	if (to_end) {
		offset += target.innerHeight() - $(window).height();
	}
	if (target.length) {
		var targetPosition = parseInt(target.offset().top);
		var wrapperOffset = parseInt(main_wrapper.innerHeight() - main_wrapper.height());
		$('html, body').animate({ scrollTop: targetPosition - wrapperOffset + offset});
	}
}

function addSpaces(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function addZeroes(number, length) {
	var result = '' + number;
	while (result.length < length)
		result = '0' + result;
	return result;
}

var openedCard = undefined;

$(window).on('load', function () {
	$('body').addClass('loaded');
});

$(window).on('load resize', function () {});

$(document).on('ready', function () {
	if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
		new WOW().init();
	}
	/*
	$('input[name="phone"]').inputmask({
		mask: '+380(99) 999-99-99',
		placeholder: '_',
		showMaskOnHover: false
	});
	*/
	$('.select-1').styler();

	(function() {
		$(document).on('click', '.header__menu-button, .menu__close', function() {
			$('.menu').toggleClass('menu_active');
			return false;
		});
	})();

	(function() {
		$('.jobs__slider').slick({
			'fade': true,
			'arrows': false,
			'adaptiveHeight': true
		});
		$('.jobs__side').slick({
			'fade': true,
			'arrows': false,
			'adaptiveHeight': true
		});
		$(document).on('click', '.jobs__tabs a', function() {
			var index = $(this).parent().index();
			var from = $(this).data('from');
			$('.jobs__tabs a').removeClass('active');
			$('.jobs__slider').slick('slickGoTo', index);
			$(this).addClass('active');

			$('.jobs .cta__form input[name="from"]').val(from);

			return false;
		});
		$('.jobs__tabs li').first().find('a').trigger('click');
	})();

	$(document).on('focusin focusout', '[class*="input-"] input', function (e) {
		if (e.type === 'focusin') {
			$(this).parent().addClass('focus');
		} else {
			$(this).parent().removeClass('focus');
		}
	});

	$(document).on('click', '.modal-close, .popup-card__tab-back', function () {
		$.fancybox.close();
		return false;
	});

	$('.fancybox-type-image').fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		},
		openEffect: 'none',
		closeEffect: 'none',
		padding: 0,
		margin: 55,
		closeBtn: true,
		beforeShow: function () {
			$('.fancybox-skin').css('background-color', 'transparent');
			$('.fancybox-skin').css('-webkit-box-shadow', 'none');
			$('.fancybox-skin').css('-moz-box-shadow', 'none');
			$('.fancybox-skin').css('box-shadow', 'none');
		}
	});

	$('.fancybox-type-video').fancybox({
		helpers: {
			overlay: {
				locked: false
			},
			media: {}
		},
		autoSize: true,
		type: 'iframe',
		openEffect: 'none',
		closeEffect: 'none',
		padding: 0,
		margin: 55,
		closeBtn: true,
		beforeShow: function () {
			$('.fancybox-skin').css('background-color', 'transparent');
			$('.fancybox-skin').css('-webkit-box-shadow', 'none');
			$('.fancybox-skin').css('-moz-box-shadow', 'none');
			$('.fancybox-skin').css('box-shadow', 'none');
		}
	});

	$('a[href*="#modal"]').fancybox({
		autoSize: true,
		type: 'inline',
		padding: 0,
		margin: 0,
		scrolling: 'visible',
		fixed: false,
		autoCenter: false,
		closeBtn: false,
		helpers: {overlay: {locked: true}},
		beforeClose: function () {
			$('.fancybox-skin .error').removeClass('error');
			$('.fancybox-skin .hidden').empty();
		},
		beforeShow: function() {
			$('.fancybox-skin').css('background-color', 'transparent');
			$('.fancybox-skin').css('-webkit-box-shadow', 'none');
			$('.fancybox-skin').css('-moz-box-shadow', 'none');
			$('.fancybox-skin').css('box-shadow', 'none');
			$('iframe, video').each(function() {
				if ($(this).is('iframe')) {
					var iframeSrc = $(this)[0].src;
					$(this)[0].src = iframeSrc;
				}
				if ($(this).is('video')) {
					$(this)[0].pause();
				}
			});
		}
	}).click(function () {
		if (typeof ($(this).data('from')) !== 'undefined') {
			$('<input/>', {
				name: 'from',
				value: $(this).data('from')
			}).appendTo('.callback-modal .hidden');
		}
		if ($(this).hasClass('data-get')) {
			var form = $(this).closest('.data-container');
			var cloned = form.find('.data-source').clone();
			cloned.appendTo('.callback-modal .hidden');
		}
	});

	$('a[href*="#popup"]').fancybox({
		autoSize: false,
		type: 'inline',
		width: '100%',
		height: '100%',
		padding: 0,
		margin: 0,
		scrolling: 'visible',
		autoCenter: false,
		closeBtn: false,
		helpers: {
			overlay: {
				locked: true,
				css: { 'overflow' : 'hidden' }
			}
		},
		beforeShow: function() {
			$('.fancybox-skin').css('background-color', 'transparent');
			$('.fancybox-skin').css('-webkit-box-shadow', 'none');
			$('.fancybox-skin').css('-moz-box-shadow', 'none');
			$('.fancybox-skin').css('box-shadow', 'none');
		}
	});

	$('a[href*="#"]').not('a[href*="#modal"], a[href*="#popup"], a[href="#"]').click(function () {
		var target = $(this);
		scrollPageTo(target);
		$('.menu').removeClass('menu_active');
		return false;
	});

	$(document).on('keyup change', '.required', function () {
		$(this).parent().removeClass('error');
	});

	$('.callback-form').submit(function () {
		var form = $(this);
		var error = false;
		if (typeof(form.data('thanks')) !== 'undefined')
			var thanks = form.data('thanks');
		else
			var thanks = 'modal_thanks';
		form.find('.error').removeClass('error');
		form.find('.required').each(function () {
			if ($(this).val() === '') {
				$(this).focus().parent().addClass('error');
				error = true;
			}
		});
		if (error)
			return false;
		$.ajax({
			type: form.attr('method'),
			url: 'callback.php',
			data: form.serialize(),
			success: function() {
				$.fancybox.open([{
					href: '#' + thanks
				}], {
					autoSize: true,
					type: 'inline',
					padding: 0,
					margin: 0,
					scrolling: 'visible',
					fixed: false,
					autoCenter: false,
					closeBtn: false,
					helpers: {overlay: {locked: true}},
					beforeShow: function() {
						$('.fancybox-skin').css('background-color', 'transparent');
						$('.fancybox-skin').css('-webkit-box-shadow', 'none');
						$('.fancybox-skin').css('-moz-box-shadow', 'none');
						$('.fancybox-skin').css('box-shadow', 'none');
					}
				});
			}
		});
		return false;
	});
});

