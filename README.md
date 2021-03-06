Wysker Editor
=============
Wysker is an extremely light (~10k) "What You See Is What You Get (WYSIWYG)" or as I like to refer to them "What You See Kind of Equals Results (WYSKER)" HTML editor that is designed to be used in-browser allowing the site to be edited and tested in real time. 

Wysker is written in javascript. Its only dependency is jQuery 1.7.

Wysker runs flawlessly in new versions of Chrome (Webkit) and Firefox. Wysker runs in IE8+ with extremely minor graphical issues. 

[Live Demo](http://abeisgreat.github.com/wysker/wysk_test.htm)

Usage
-----
In order to implement Wysker on your site you need to have some code like this.

```
<script language="javascript" src="wysker.js"></script>
<script type="text/javascript">
$(document).ready(function() { 
	wysker_init(
		function (id, content) { // Save function gets called when a save is triggered, replace with code to integrate with your site
			console.debug('Saved ' + id + '!')		
		}
	)
});
</script>
```

Any editable elements on the page should have a "wysker-id" attribute. The ID and the content of the edited element will be passed to the save function.

License
-------
Licensed under the GNU General Public License
