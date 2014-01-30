var css = (function() {

	function css() {

	}


	css.prototype = {
		_cssToObject : function(input) {
			var result = {};
			input =input.replace('}',"");
			input =input.substring(input.indexOf("{") + 1);
			var attributes = input.split(';');
			for (var i = 0; i < attributes.length; i++) {
				var entry = attributes[i].split(':');
				entry[0] = entry[0].trim();
				
				if(entry[0])result[entry[0]] = entry[1].trim();
			}
			return result;
		},
		getStyle : function(className) {
			className=className.replace("#","");
			var classes;
			for (var a = 0; a < document.styleSheets.length; a++) {
				console.log(document.styleSheets);
				classes = document.styleSheets[a].rules || document.styleSheets[a].cssRules;
				if (classes) {
					for (var x = 0; x < classes.length; x++) {
						if (classes[x].selectorText == className) {
							return this._cssToObject(classes[x].cssText ? classes[x].cssText : classes[x].style.cssText);
						}
					}
				}

			}

		},
		setStyle : function(className, name, value) {
			className=className.replace("#","");
			var classes;
			for (var a = 0; a < document.styleSheets.length; a++) {
				console.log(document.styleSheets);
				classes = document.styleSheets[a].rules || document.styleSheets[a].cssRules;
				if (classes) {
					for (var x = 0; x < classes.length; x++) {
						if (classes[x].selectorText == className) {
							classes[x].style[name] = value;
							return classes[x].style.cssText;
						}
					}
				}

			}
		}
	};

	return new css();
})();
