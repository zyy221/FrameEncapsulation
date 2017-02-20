(function(window){

		Itcast.parseHTML = function(html){

			var div = document.createElement("div");

			div.innerHTML = html;

			var arr= [];

			for(var i=0;i<div.childNodes.length;i++){

				arr.push(div.childNodes[i]);
			}

			return arr;
		}


})(window);