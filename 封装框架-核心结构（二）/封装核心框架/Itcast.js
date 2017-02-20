(function(window){

	//创建构造函数
	function Itcast(selector){
		return new Itcast.prototype.init(selector);
	}
	//原型的设置
	Itcast.prototype={
		constructor : Itcast,
		init : function(selector){
			[].push.apply(this , Itcast.select(selector));
		}
	};
	//共享原型
	Itcast.prototype.init.prototype = Itcast.prototype;
	//添加扩展方法
	Itcast.extend = Itcast.prototype.extend =function(obj){
		for(var k in obj){
			this[k] = obj[k];
		}
		return this;
	}

	//工具方法
	Itcast.extend({
		select:function(selector){
			return document.querySelectorAll(selector);
		},
		isArrayLike:function(obj){
			if(Object.prototype.toString.call(obj) === '[object Array]'){
				return true;
			}
			var length = 'length' in obj && obj.length;
			return typeof length === 'number' && length >= 0;
		},
		each:function(arr , callback){
			if(Itcast.isArrayLike( arr )){
				for(var i=0;i<arr.length;i++){
					if(callback.call(arr[i] , i , arr[i]) === false ) break;
				}
			}else{
				for(var k in arr){
					if(callback.call(arr[k] , k , arr[k]) === false ) break;
				}
			}
			return arr;
		},
		map:function(arr , callback){
			var newArr = [], tmp;
			if(Itcast.isArrayLike( arr )){
				for(var i=0;i<arr.length;i++){
					var tmp = callback(arr[i] , i);
					if(tmp != null){
						newArr.push(tmp);
					}
				}
			}else{
				for(var k in arr){
					var tmp = callback(arr[k] , k);
					if(tmp != null){
						newArr.push(tmp);
					}
				}
			}
			return newArr;
		}

	});

	//原型上的方法
	Itcast.prototype.extend({
		each:function(callback){
			return Itcast.each(this , callback);
		},
		map:function(callback){
			return Itcast.map(this , callback);
		}
	})

	window.Itcast = window.I = Itcast;

})(window);