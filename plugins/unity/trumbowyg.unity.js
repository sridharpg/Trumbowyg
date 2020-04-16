(function ($) {
	'use strict';

	var defaultOptions = {
		useDarkTheme: false,
		editableSections: '[data-editable]'
	};

	$.fn.trumbowygUnity = function(options) {
		var t = this,
			ele = $('<div>'),
			coreEditor = $('<div>').append(ele),
			opts = $.extend({}, defaultOptions, options);

		function setDarkTheme(bool) {
			coreEditor[bool? 'addClass': 'removeClass']('trumbowyg-dark');
		}

		setDarkTheme(opts.useDarkTheme);

		ele.trumbowyg(opts).on('tbwblur', function(e) {
			setTimeout(function() {
				if(document.activeElement !== obj.$ed[0]) {
					coreEditor.fadeOut({
						duration: 150
					});
					obj.swapEditor(ele);
					ele.trumbowyg('disable');
				}
			}, 50);
		});

		var obj = ele.data('trumbowyg');

		coreEditor.appendTo($('body'));

		coreEditor.addClass('trumbowyg-abs');
		ele.trumbowyg('disable');
		coreEditor.hide();

		t.on('click', '[data-editable]', function(e) {
			var target = $(e.currentTarget);
			target.attr('contenteditable', true);
			obj.swapEditor(target);
			target.focus();

			var left = target.offset().left,
				top = target.offset().top - coreEditor.height();

			setDarkTheme(target.data('dark-theme') !== undefined);

			if(!coreEditor.is(':visible')) {
				coreEditor.fadeIn({
					duration: 250
				});
			}

			coreEditor.css({
				left: left,
				top: top
			});

			ele.trumbowyg('enable');
		});

		return ele;
	};
})(jQuery);