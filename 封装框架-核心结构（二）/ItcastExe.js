(function(window){

	var arr = [],
	    push = arr.push;

	function Itcast(selector){
		return new Itcast.fn.init(selector);
	}

	Itcast.fn = Itcast.prototype ={
		constructor : Itcast,
		init : function(selector){

			push.apply(this , Itcast.select(selector));
		}
	};
	//共享原型
	Itcast.fn.init.prototype = Itcast.fn;

	//添加扩展方法
	Itcast.extend = Itcast.fn.extend = function(obj){
		for(var k in obj){
			this[k] = obj[k];
		}
		return this;
	}

	//工具方法
	Itcast.extend({
		select : function (selector){
			return document.querySelectorAll(selector);
		},
		isArrayLike : function (obj){
			if(Object.prototype.toString.call(obj) == '[object Array]'){
				return true;
			}
			var length = 'length' in obj && obj.length;
			return typeof length === 'number' && length >= 0;
		},
		each : function (arr , callback){
			if(Itcast.isArrayLike( arr )){
				for(var i=0;i<arr.length;i++){
					if(callback.call( arr[i] , i ,arr[i]) === false ) break;
				}
			}else{
				for(var k in arr){
					if(callback.call( arr[k] , k , arr[k]) === false ) break;
				}
			}
			return arr;
		},
		map : function (arr , callback){
			var newArr = [],tmp;
			if(Itcast.isArrayLike( arr )){
				for(var i=0;i<arr.length;i++){
					tmp = callback(arr[i] , i);
					if(tmp != null){
						newArr.push(tmp);
					}
				}
			}else{
				for(var k in arr){
					tmp = callback(arr[k] , k);
					if(tmp != null){
						newArr.push(tmp);
					}
				}
			}
			return newArr;
		}
	});
	//添加原型上的方法
	Itcast.fn.extend({
		each : function(callback){
			return Itcast.each(this, callback);
		},
		map : function(callback){
			return Itcast.map(this , callback);
		}
	});

	//添加核心方法
	Itcast.fn.extend({
		toArray:function(){
			//方法一
			// var arr = [];
			// for(var i=0;i<this.length;i++){
			// 	arr.push(this[i]);
			// }
			// return arr;
			
			//方法二
			// return this.map(function(v){
			// 	return v;
			// })

			//方法三
			return slice.call(this);
		}
	})


	

	window.Itcast = window.I = Itcast;






})(window);