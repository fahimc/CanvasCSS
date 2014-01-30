var CanvasManager = (function() {

	function CanvasManager() {

	}


	CanvasManager.prototype = {
		_canvas : null,
		_collection : [],
		create : function() {
			this._canvas = new fabric.Canvas('c');
		},
		add : function(obj, id) {
			if (id)
				this._collection[id] = obj;
			this._canvas.add(obj);
			this.setCanvasStyle(id);
		},
		_camelCase : function(input) {
			return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
				return group1.toUpperCase();
			});
		},
		_cssToObject : function(input) {
			var result = {};
			input = input.replace('}', "");
			input = input.substring(input.indexOf("{") + 1);
			var attributes = input.split(';');
			for (var i = 0; i < attributes.length; i++) {
				var entry = attributes[i].split(':');
				entry[0] = this._camelCase(entry[0].trim());

				if (entry[0])
					result[entry[0]] = entry[1].trim();
			}
			return result;
		},
		setCanvasStyle : function(id) {
			var child = this._collection[id];
			var style = this.getStyle(id);
			var obj = {};
			for (var name in style) {
				switch(name) {
					case 'left': case 'top': case 'width': case 'height':
						obj[name] = Number(style[name].replace(/\D/g, ''));
						break;
					case 'backgroundColor':
						obj.fill = style[name];
						break;
					case 'border':
					var parts =  style[name].split(' ');
						if(parts[0])obj.strokeWidth = Number(parts[0].replace(/\D/g, ''));
						if(parts[2])obj.stroke = parts[2];
						break;
						default:
						obj[name] =style[name];
						break;
				}
			}
			
			child.set(obj);
			this._canvas.renderAll();
		},
		getStyle : function(className) {
			className = "#" + className;
			var classes;
			for (var a = 0; a < document.styleSheets.length; a++) {

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
			className = "#" + className;
			var classes;
			for (var a = 0; a < document.styleSheets.length; a++) {
				console.log(document.styleSheets);
				classes = document.styleSheets[a].rules || document.styleSheets[a].cssRules;
				if (classes) {
					for (var x = 0; x < classes.length; x++) {
						if (classes[x].selectorText == className) {
							classes[x].style[name] = value;
							this.setCanvasStyle(className.replace('#',''));
							return classes[x].style.cssText;
						}
					}
				}

			}
		},
		getElementById:function(id){
			return this._collection[id];
		}
	};

	return new CanvasManager();
})();
