

function F(selector){
	[].push.apply(this , F.select(selector));
}
F.prototype.each=function(callback){
	return F.each(this , callback);
}
F.prototype.map = function(callback){
	return F.map(this , callback);
}
F.select = function (selector){
	return document.querySelectorAll(selector);
}
F.isArrayLike = function (obj){
	if(Object.prototype.toString.call(obj) === '[object Array]'){
		return true;
	}
	var length = 'length' in obj && obj.length;
	return typeof length === 'number' && length >= 0;
}
//each this指向遍历的元素 返回值是遍历的元素
F.each = function (arr , callback){
	if(F.isArrayLike( arr )){
		for(var i=0;i<arr.length;i++){
			if(callback.call( arr[i] , i ,arr[i]) === false ) break;
		}
	}else{
		for(var k in arr){
			if(callback.call( arr[k] , k , arr[k]) === false ) break;
		}
	}
	return arr;
}
//map 返回一个新数组
//没有this指向
F.map = function (arr , callback){
	var newArr = [],tmp;
	if(F.isArrayLike( arr )){
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
//引入工厂函数
function I(selector){
	return new F(selector);
}