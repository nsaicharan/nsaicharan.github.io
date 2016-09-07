(function ($){

	var ef = window.ef || ef || {};

	ef.scrollTo = {
		$scrollEl: $('html, body'),
		$triggerEl: $('#main-nav'), // add additional selectors as needed
		animationDuration: 1000,

		scrollToTarget: function(){
			var target = $(this).attr('href');
			var targetScrollTop;

			if ( !target ) return false;

			targetScrollTop = $(target).offset().top;

			// if the sticky nav is being used,
			// take the navHeight away from the targetScrollTop
			// to avoid the nav overlapping the top edge of the
			// target container

			ef.scrollTo.$scrollEl.animate({
				scrollTop: targetScrollTop
			}, ef.scrollTo.animationDuration);

			return false;
		},
		init: function(){
			ef.scrollTo.$triggerEl.on('click', 'a', ef.scrollTo.scrollToTarget);
		}
	};

	window.ef = ef;

	$( ef.scrollTo.init );

})(jQuery);
