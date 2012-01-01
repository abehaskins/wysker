// Do you guys remember The Cramps? They had like one good song
// Make scrolling on the text area work
wysker_init = function (save_func, cancel_func, color_mode) {
	// We define the main code as a function and run it later so we don't have to put all our functions before the main logic
	function run() {
	// Short-hand for wysker elements
	we = '[wysker-id]'
	wh = '#wysker_hover'
	wht = '#wysker_hover_title'
	wp = '#wysker_pane'
	wta = '#wysker_textarea'
	wlc = '#wysker_linecount'
	wt = '#wysker_title'
	wlb = '#wysker_lightbox'
	wdb = '#wysker_darkbox'
	wpa = '#wysker_padding'
	ch_we = false // The currently hovered Wysker Element
	c_we = false // The currently selected Wysker Element
	c_we_rb = false
	lc_we = false
	is_editing = false
	color_mode = (color_mode) ? color_mode : 'dark' // Light or Dark

	// CSS Rules for stuff
	wysker_hover_css = {
		'width': '100px',
		'height': '100px',
		'position': 'absolute',
		'left': '0px',
		'top': '0px',
		'border': '1px solid ' + (( color_mode == 'light' ) ? '#fff' : '#333'),
		'border-radius': '0px 4px 4px 4px',
		'cursor': 'pointer',
		'z-index': '10000',
	}

	wysker_hover_title_css = {
		'height': '20px',
		'line-height': '20px',
		'padding': '0px 10px',
		'position': 'absolute',
		'left': '0px',
		'top': '0px',	
		'color': (( color_mode == 'light' ) ? 'black' : 'white'),
		'background-color': (( color_mode == 'light' ) ? '#fff' : '#333'),
		'border-radius': '4px 4px 0px 0px',
		'font-family': 'Ubuntu',
		'font-size': '12px'
	}

	wysker_pane_css = {
		'width': '100%',
		'height': '0px',
		'position': 'fixed',
		'overflow': 'hidden',
		'left': '0px',
		'bottom': '0px',
		'background-color': '#ccc',
		'font-family': 'Ubuntu',
		'font-size': '12px',
		'border-top': '1px solid white',
		'box-shadow':  '0 0 1px 1px #888',
		'z-index': '10000',
	}

	wysker_textarea_css = {
		'width': $(window).width()-21-40,
		'height': '340px',
		'margin': '0px 10px 10px 0px',
		'border': '1px solid #999',
		'border-radius': '0px 4px 4px 0px',
		'resize': 'none',
		'padding': '5px',
		'border-left': 'none',
		'outline': 'none',
		'float': 'right'
	}

	wysker_linecount_css = {
		'width': '28px',
		'background-color': '#333',
		'border-radius': '4px 0px 0px 4px',
		'float': 'left',
		'height': '345px',
		'margin': '00px 0px 0px 10px',
		'border': '1px solid #333',
		'color': 'white',
		'text-align': 'center',
		'padding-top': '5px'
	}

	wysker_button_css = {
		'width': '60px',
		'height': '29px',
		'background-color': '#333',
		'color': 'white',
		'text-align': 'center',
		'line-height': '30px',
		'cursor': 'pointer',
		'margin': '5px 10px',
		'border-radius': '4px'
	}

	wysker_darkbox_css = {
		'position': 'fixed',
		'left': '0px',
		'top': '0px',
		'width': '100%',
		'height': '100%',
		'background-color': '#333',
		'opacity': '0.5',
		'z-index': '10000'
	}

	wysker_lightbox_css = {
		'position': 'fixed',
		'left': '0px',
		'top': '0px',
		'width': '300px',
		'min-height': '100px',
		'background-color': 'white',
		'border-radius': '4px',
		'border': '1px solid #666',
		'box-shadow': '0 0 5px 1px #aaa',
		'color': 'black',
		'z-index': '10000'
	}

	wysker_padding_css = {
		'padding': '10px',
		'font-family': 'Ubuntu',
		'font-size': '12px'
	}


	wysker_title_css = {
		'background': '-webkit-gradient(linear, left top, left bottom, from(#f0f0f0), to(#ccc))',
		'width': $(window).width(),
		'height': '39px'
	}

	wysker_dialog_title_css = {
		'font-size': '13px',
		'border-bottom': '1px solid #ccc',
		'padding-bottom': '4px',
		'margin-bottom': '4px'
	}

	wysker_dialog_question_css = {
		'border-bottom': '1px solid #ccc',
		'padding-bottom': '4px',
		'margin-bottom': '4px',
		'padding-left': '4px'
	}

	wysker_dialog_option_css = {
		'cursor': 'pointer',
		'padding': '5px',
		'border-radius': '4px',
		'margin-bottom': '4px'
	}

	wysker_pane = {
		wysker_pane: {tt: 'div', _: {
			wysker_title: {tt: 'div', _: {
				wysker_cancel: {tt:'div', cls: 'wysker_button', style: 'float: left;', _:'Cancel'},
				wysker_save: {tt:'div', cls: 'wysker_button', style: 'float: right;', _:'Save'}
			}},
			wysker_linecount: {tt: 'div', _:""},
			wysker_textarea: {tt: 'textarea'}
		}}
	}

	wysker_dialog = {
		wysker_darkbox: {tt: 'div', _:''},
		wysker_lightbox: {tt: 'div', _: 
		{
			wysker_padding: {tt: 'div', _: ''}
		}}
	}

	// Create required elements
	$('body').append('<div id="wysker_hover_title">Click to Edit</div>')
	$('body').append('<div id="wysker_hover">')
	$('head').append("<link href='http://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css'>")
	$('body').append(j2h(wysker_pane))
	$('body').append(j2h(wysker_dialog))

	// Hide unwanted elements
	$(wh).hide()
	$(wht).hide()
	$(wlb).hide()
	$(wdb).hide()


	// Apply CSS rules to elements
	apply_css(wysker_hover_css, wh)
	apply_css(wysker_pane_css, wp)
	apply_css(wysker_textarea_css, wta)
	apply_css(wysker_title_css, wt)
	apply_css(wysker_button_css, '.wysker_button')
	apply_css(wysker_hover_title_css, wht)
	apply_css(wysker_linecount_css, wlc)
	apply_css(wysker_darkbox_css, '#wysker_darkbox')
	apply_css(wysker_lightbox_css, '#wysker_lightbox')
	apply_css(wysker_padding_css, '#wysker_padding')

	$(window).resize(resize)

	// Create Click & Hover Handlers
	$(we).click(function () {

	})

	$(we).hover(function () {
		$(wh).show()
		$(wht).show()
		render_wh(this)
		ch_we = this
		if (ch_we == c_we) {
			$(wht).html('Editing...')
		}else{
			$(wht).html('Click to Edit')
		}
	}, function () {
		// This is blank because once we draw the rect over it, it hovers out
	})

	$(wh).click(function () {
		lc_we = ch_we
		function callback() {
			$(lc_we).mouseover()
			$(wh).click()
			// Callback doesn't load new item since fix in hover
			// Discard doesn't discard

		}

		if (is_editing && c_we != ch_we) {
			if (c_we_rb != $(c_we).html()) {
				render_dl('Discard all changes?', 'If you choose to switch elements without saving, your changes will be lost.', 'Discard', 'Save', 
					// Discard function
					function () {
						rollback_c_we(callback)
					}, 
					// Save function
					function () {
						save(); hide_dl(); callback()
					}
				)
			}else{
				rollback_c_we(callback)
			}
		}else{
			c_we = ch_we
			c_we_rb = $(c_we).html()
			is_editing = true
			$(wht).html('Editing...')
			$(wp).animate({'height': 400}, 'fast', function () {
				$(wta)[0].focus()
			})

		}
		$(wta).val($(c_we).html())

		render_lc($(wta).width())
	})

	$(wh).hover(function () {
		// This is blank because the element is hidden until it is draw beneath the cursor
		
	}, function () {
		if (!(is_editing)) {
			$(this).hide()
			$(wht).hide()
		}else{
			$(wht).html('Editing...')
		}
		if (ch_we != c_we) {
			render_wh(c_we)

			ch_we = c_we
		}
	})

	$(wta).keyup(function () {
		$(c_we).html($(wta).val())
		render_wh(c_we)
		render_lc($(wta).width())
	})

	$('#wysker_cancel').click(function () {
		if (c_we_rb != $(c_we).html()) {
			render_dl('Discard all changes?', 'If you choose to cancel without saving, your changes will be lost.', 'Discard', 'Save', 
				// Discard function
				function () {
					rollback_c_we()
				}, 
				// Save function
				function () {
					save()
					hide_edit()
					hide_dl()
				}
			)
		}else{
			rollback_c_we()
		}
	})

	$('#wysker_save').click(function () {
		save()
		hide_edit()
	})
	}
	// A bunch of local methods, they are local to the function to prevent overlap with site code

	// Takes an obj with CSS properties and applies them to an element

	function save() {
		c_we_rb = $(wta).val()
		if (save_func) {
			save_func($(c_we).attr('wysker-id'), $(wta).val())
		}
	}

	function hide_edit() {
		$(wp).animate({'height': 0})
		c_we = false
		ch_we = false
		is_editing = false
		$(wht).html('Click to Edit')
		$(wh).hide()
		$(wht).hide()		
	}

	function rollback_c_we(callback) {
		$(c_we).html(c_we_rb)
		c_we = false
		is_editing = false
		$(wht).html('Click to Edit')
		$(wh).hide()
		$(wht).hide()
		hide_dl()
		$(wp).animate({'height': 0}, callback)
	}

	function resize() {
		$(wta).css('width', $(window).width()-21-40)
		$(wt).css('width', $(window).width())
		render_wh($(c_we))
	}

	function apply_css(css_obj, ref) {
		for (attr in css_obj) 
		{ 
			$(ref).css(attr, css_obj[attr]) 
		}
	}

	// Render Wysker Hover border
	function render_wh(e) {
		if (e) {
			$(wht).css('left', $(e).offset().left-5 )
			$(wht).css('top', $(e).offset().top-5-20 )
					
			$(wh).css('left', $(e).offset().left-5 )
			$(wh).css('top', $(e).offset().top-5 )
			$(wh).css('width', $(e).width()+8 )
			$(wh).css('height', $(e).height()+8 )
		}
	}

	// Render linecount for textarea
	function render_lc(width) {
		$(wlc).html('')
		lines = $(wta).val().split('\n')
		for (i=1; i<=lines.length; i++) {
			$(wlc).append(i + '<br />')	
			extra_lines = parseInt(lines[i-1].length/(width/8))
			//console.debug(extra_lines)
			for (p=0; p<extra_lines; p++) {
				$(wlc).append('<br />')
			}
			words = lines[i-1].split(' ')
			for (w=0; w<words.length; w++) {
				if (words[w].length/(width/8) > 1) {
					$(wlc).append('<br />')
				}
			}
		}
	}

	// Render dialog
	function render_dl(title, question, option_one, option_two, oo_callback, ot_callback)
	{
		dialog = {
			'wysker_dialog_title' : {tt: 'div', _:title},
			'wysker_dialog_question' : {tt: 'div', _:question},
			'wysker_option_one' : {tt: 'div', cls: 'wysker_dialog_option', style: 'float: left', _:option_one},
			'wysker_option_two' : {tt: 'div', cls: 'wysker_dialog_option', style: 'float: right', _:option_two}
		}

		$(wlb).fadeIn()
		$(wdb).fadeIn()
		$(wpa).html(j2h(dialog))

		apply_css(wysker_dialog_title_css, '#wysker_dialog_title')
		apply_css(wysker_dialog_question_css, '#wysker_dialog_question')
		apply_css(wysker_dialog_option_css, '.wysker_dialog_option')

		$(wlb).css('left', ( $(window).width()-$(wlb).width() )/2 )
		$(wlb).css('top', ( $(window).height()-$(wlb).height() )/2 )

		$('.wysker_dialog_option').hover(function () {
			$(this).css('background-color', '#333')
			$(this).css('color', 'white')
		}, function () {
			$(this).css('background-color', 'white')
			$(this).css('color', 'black')
		})

		$('#wysker_option_one').click(oo_callback)
		$('#wysker_option_two').click(ot_callback	)

	}

	function hide_dl() {
		$(wlb).fadeOut('fast')
		$(wdb).fadeOut('fast')
	}

	//JSHN.JS
	j2h = function (json) {
			try {
				json = JSON.parse(json)
			}catch(err){
				json = json
			}
			return _recursive(json)
	}

	// The only external change which Wysker makes, reimplementing indexOf
	if (!('indexOf' in Array.prototype)) {
	    Array.prototype.indexOf= function(find, i /*opt*/) {
	        if (i===undefined) i= 0;
	        if (i<0) i+= this.length;
	        if (i<0) i= 0;
	        for (var n= this.length; i<n; i++)
	            if (i in this && this[i]===find)
	                return i;
	        return -1;
	    };
	}

	function _recursive(layer) {
		var html = ''
		var spacing = '  '
		var shortags = ['img', 'br', 'param']
		if (typeof(layer) == 'string') {
			var html = layer+="\n"	
		}else 	if (typeof(layer) == 'object') {
			for (var key in layer) {
				var tag_type = layer[key]['tt']
				if (layer[key]['id'] == undefined) {
					layer[key]['id'] = key
				}
				if (layer[key]['cls'] != undefined) {
					layer[key]['class'] = layer[key]['cls']
				}
				var tag = '<' + tag_type + ' '

				for (var attr in layer[key]) {
					value = layer[key][attr]
					if (!(value == String(value).replace('!', ''))) {
						value = eval(String(value).replace('!', ''))
					}
					if (!((attr == "_") || (attr == 'tt') || (attr == 'cls'))) {
						tag += attr + '=' + '"' + value + '" '
					}
				}
				if (!(shortags.indexOf(tag_type))) {
					tag += '/>\n'
					html += tag
				} else {
					tag += '>\n'
	        	        	html += tag                        
		       	 		html += _recursive(layer[key]['_'])   
					html += '</' + tag_type + '>\n'
				}
			}
		}
		return html
	}
	// End of JSHN.js
	// Actually run the code
	run()
}