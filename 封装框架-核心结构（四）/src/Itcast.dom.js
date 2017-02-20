(function(window){

	var arr = [],
		push = arr.push;
	Itcast.parseHTML = function(html){
		var div = document.createElement("div");

		div.innerHTML = html;
		//将伪数组转化成数组
		var arr = [];
		for(var i=0;i<div.childNodes.length;i++){
			arr.push(div.childNodes[i]);
		}
		return arr;
		
	}

	var tmpDomMethod = {
		appendTo: function(currentNode , objNode){
			objNode.appendChild(currentNode);
		},
		prependTo: function(currentNode , objNode){
			if(objNode.childNodes.length == 0){
				objNode.appendChild(currentNode);
			}else{
				objNode.insertBefore(currentNode , objNode.firstChild);
			}
		},
		insertBefore:function(currentNode , objNode){
			objNode.parentNode.insertBefore(currentNode , objNode);
		},
		insertAfter:function(currentNode , objNode){
			var nextNode = objNode.nextSibling;

			if(nextNode){
				objNode.parentNode.insertBefore(currentNode , nextNode);
			}else{
				objNode.parentNode.appendChild(currentNode);
			}
		}
	};

	Itcast.extend(tmpDomMethod);

	Itcast.each(tmpDomMethod , function( k , v){
		Itcast.fn[k] = function(selector){

				var arr = [],
					push = arr.push;
				//得到一个Itcast对象 将this（伪数组）添加到iobj对象中
				var iobj = this.constructor(selector);

				var tmp = [], tmpNode;
				//获取传入参数（伪数组）中的每一项遍历
				for(var i = 0 ; i < this.length ; i++){
					//
					for(var j = 0 ; j < iobj.length ; j++){

						tmpNode = j == iobj.length - 1? this[i] : this[i].cloneNode(true);

						tmp.push(tmpNode);

						v(tmpNode , iobj[j]);
					}
				}
				//得到一个新的空的Itcast对象
				var objNode = this.constructor();

				//给新创建的对象添加一个属性 防止链被破坏 记录之前的状态
				objNode.prevObject = this;

				//将tmp中的元素push到Itcast的新对象里
				push.apply(objNode , tmp);
				//返回这个对象
				return objNode;

		}
	});

	Itcast.each({
		'append':'appendTo',
		'prepend':'prependTo',
		'before':'insertBefore',
		'after':'insertAfter'
	},function( k , v){
		Itcast.fn[k] = function(selector){
			this.constructor(selector)[v](this);
			return this;
		}
	});


})(window);