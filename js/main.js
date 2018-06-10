$(function () {
	var buttons = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, '*', 0, '.', '=', '/'],
		$body = $('body');

	$('<div></div>')
		.attr('id', 'calculator')
		.css({
			'width' : '80%',
			'max-width' : '300px',
			'margin' : '10px auto 0',
			'padding' : '5px',
			'display' : 'flex',
			'flex-wrap' : 'wrap',
			'justify-content' : 'space-between'
		})
		.appendTo($body);

	var calc = '#calculator';

	$('<div></div>')
		.attr('id', 'input')
		.height(30)
		.css({
			'display' : 'flex',
			'width' : '100%',
			'align-items' : 'stretch',
			'line-height' : '30px',
			'margin-bottom' : '8px'
		})
		.prependTo(calc);

	$('<nav></nav>')
		.text('C')
		.css({
			'background' : 'orange',
			'margin-right' : '5px',
			'border-radius' : '3.5px',
			'flex-grow' : '1',
			'flex-shrink' : '0'
		})
		.prependTo($(calc).find('#input'))
		.click(function () {$(calc + ' #input section').text('')});

	$('<section></section>')
		.height(30)
		.css({
			'font-size': '1.2em', 
			'background' : 'rgba(225, 225, 225, 0.1)',
			'margin-bottom' : '8px',
			'border-radius' : '3.5px',
			'flex-grow' : '7',
			'flex-shrink' : '0',
			'width' : 'auto',
			'max-width' : '80%',
			'overflow' : 'hidden'
		})
		.appendTo($(calc).find('#input'));

	$.each(buttons, function (key, val) {
		var buttonClass = (typeof val == 'number') ? 'number' : 'func';

		$('<div></div>')
			.addClass(buttonClass, 'button')
			.text(val)
			.css({
				'background' : 'blue',
				'border-radius' : '50%',
				'width' : ($(calc).width() / 4.5),
				'height' : ($(calc).width() / 4.5),
				'display' : 'flex',
				'align-items' : 'center',
				'justify-content' : 'center',
				'margin-bottom' : '8px',
				'font-size' : '1.2em'
			})
			.appendTo(calc)
			.click(function (e) {
				var focus = $(calc).find('#input').children('section');
				focus.text(focus.text() + val);
			});
	});

	$('.func').click(function (e) {
		if ( $(calc + ' #input section').text() == $(this).text() ) {
			$(calc + ' #input section').text('');
		}
		if ( $(this).text() !== '=' ) {
			var arr = $(calc + ' #input section').text().split('');
			var last = $(calc + ' #input section').text().length - 2;
			if ( arr[last] == '+' || arr[last] == '-' || arr[last] == '*' || arr[last] == '/' ) {
				arr.splice(last, last + 1);
				arr.push($(this).text());
				$(calc + ' #input section').text(arr.join(''));
			}
		} else {
			var arr = $(calc + ' #input section').text().split('');
			var last = arr.indexOf('=') - 1;
			var t;
			if ( arr[last] == '+' || arr[last] == '-' || arr[last] == '*' || arr[last] == '/' ) {
				t = $(calc + ' #input section').text().split(arr[last] + '=');
			} else {
				t = $(calc + ' #input section').text().split('=');
			}

			$(calc + ' #input section').text(
				eval(t[0])
			);
		}
	});
});