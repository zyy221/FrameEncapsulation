(function(window){

	Itcast.parseHTML = function(html){

		//创建一个容器
		var div  = document.createElement("div");
		//将获取的字符串添加到容器里
		div.innerHTML = html;

		//将字符串解析成数组
		var arr =[];
		
		for(var i=0 ;i<div.childNodes.length;i++){

			arr.push(div.childNodes[i]);
		}
		return arr;

	}

})(window);