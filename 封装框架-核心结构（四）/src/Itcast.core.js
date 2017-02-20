(function(window){

	//用数组中的方法
	var arr = [],
		push = arr.push;

	//公开函数(工厂函数)
	function Itcast(selector){
		return new Itcast.fn.init(selector);
	}

	//设置原型
	Itcast.fn = Itcast.prototype = {
		constructor : Itcast,
		length : 0,
		init : function(selector){
			if( !selector ) return this;

			//如果传入是的字符串
			if(typeof selector == 'string'){
				//包含标签的字符串
				if(/^\s*</.test(selector)){
					push.apply(this , Itcast.parseHTML(selector));
				}else{ //或者是选择器
					push.apply(this , Itcast.select(selector));
				}
				return this;
			}
			//dom对象
			if(selector.nodeType){
				//将该dom元素装换成Itcast对象
				this[0] = selector;
				this.length = 1;
				return this;
			}
			//Itcast对象
			if(selector.constructor == Itcast){
				//this 谁调用就指向谁
				push.apply(this , selector);
				return this;
			}
		}
	};

	//共享原型
	Itcast.fn.init.prototype = Itcast.prototype;

	//添加扩展方法
	Itcast.extend = Itcast.fn.extend=function(obj){
		for(var k in obj){
			this[k] = obj[k];
		}
		return this;
	};

	//添加工具方法
	Itcast.extend({
		//传入字符串
		select:function(selector){
			return document.querySelectorAll(selector);
		},
		//判断是不是数组
		isArrayLike:function(obj){
			//判断是不是数组在原型上判断
			if(Object.prototype.toString.call(obj) == '[object Array]'){
				return true;
			}
			//或是伪数组
			var length = 'length' in obj && obj.length;
			return typeof length === 'number' && length >= 0;
		},
		each:function(arr , callback){
			if(Itcast.isArrayLike( arr )){
				for(var i=0;i<arr.length;i++){
					if(callback.call( arr[i] , i , arr[i]) === false ) break;
				}
			}else{
				for(var k in arr){
					if(callback.call( arr[k] , k , arr[k]) === false ) break;
				}
			}
			return arr;
		},
		map:function(arr ,callback){
			var newArr = [], tmp;
			if(Itcast.isArrayLike( arr )){
				for(var i=0;i<arr.length;i++){
					tmp = callback(arr[i] , i);
					//只有不为空时才添加到新的数组中
					if(tmp != null){
						newArr.push(tmp);
					}
				}
			}else{
				for(var k in arr){
					tmp = callback(arr[i] , i);
					if(tmp != null){
						newArr.push(tmp);
					}
				}
			}
			return newArr;
		}
	});

	//核心方法
	Itcast.fn.extend({
		each:function(callback){
			return Itcast.each(this , callback);
		},
		map:function(callback){
			return Itcast.map(this , callback);
		},
		//将伪数组转化成数组
		toArray:function(){
			//方案一
			// var arr = [];
			// for(var i=0;i<this.length;i++){
			// 	arr.push(this[i]);
			// }
			// return this;
			//方案二
			// return this.map(function( v ){
			// 	return v;
			// });
			// 方法三
			return slice.call(this);
		},
		get:function(index){
			if(index === undefined){
				//不传入值会获取所有元素的一个数组
				return this.toArray();
			}
			//如果是正负数
			if(index > 0){
				return this[index];
			}else{
				return this[this.length + index];
			}
		},
		eq:function(index){
			//获取元素 创建一个Itcast对象
			var iobj = this.constructor();
			if( index == null) return iobj;
			var dom = this.get(index);

			if( dom ){
				iobj[0] = dom;
				iobj.length = 1;//iobj是一个伪数组 长度不会自动加一 
			}
			return iobj;
		},
		first:function(){
			return this.eq(0);
		},
		last:function(){
			return this.eq(-1);
		},
		end:function(){
			return this.prevObject || this.constructor();
		}
	});


	window.Itcast = window.I = Itcast;

})(window);