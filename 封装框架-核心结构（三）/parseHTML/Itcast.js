(function(window){

	//引入工厂模式
	function Itcast(selector){
		return new Itcast.prototype.init(selector);
	}

	//设置原型 核心成员
	Itcast.prototype = {
		constructor : Itcast,
		length : 0,
		init : function(selector){
			//获得元素 push给this
			//传入的如果是 0 "" null undefined
			if( !selector) return this;
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

	//添加工具方法
	Itcast.extend({
		select:function(selector){
			return document.querySelectorAll(selector);
		},
		isArrayLike:function(obj){
			//判断是不是数组
			if(Object.prototype.toString.call( obj) === '[object Array]'){
				return true;
			}
			//判断是不是伪数组
			var length = 'length' in obj && obj.length;
			return typeof length === 'number' && length >= 0;
		},
		each:function(arr , callback){
			if(Itcast.isArrayLike( arr )){
				for(var i=0 ; i<arr.length; i++){
					if(callback.call(arr[i] , i , arr[i]) === false) break;
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
				for(var i=0 ; i<arr.length;i++){
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

	//添加核心方法
	Itcast.prototype.extend({
		each:function(callback){
			return Itcast.each(this , callback);
		},
		map:function(callback){
			return Itcast.map(this , callback);
		},
		toArray:function(){
			//将伪数组转化成数组
			//方法一
			// var arr=[];
			// for(var i=0;i<this.length;i++){
			// 	arr.push(this[i]);
			// }
			// return arr;
			
			//方法二
			// return this.map(function( v ){
			// 	return v;
			// })
			
			//方法三
			return slice.call(this);
		},
		get:function(index){
			if(index === undefined){
				return this.toArray;
			}
			if(index > 0){
				return this[index];
			}else{
				return this[this.length + index];
			}
		},
		eq:function(index){
			//获取元素 构造Itcast对象
			var iobj = this.constructor;
			if(index === null) return iobj;

			var dom = this.get(index);
			if( dom ){
				iobj[0] = dom;
				iobj.length = 1;
			}
			return iobj;
		},
		first:function(){
			return this.eq(0);
		},
		last:function(){
			return this.eq(-1);
		}
	});

	window.Itcast = window.I = Itcast;

})(window);
