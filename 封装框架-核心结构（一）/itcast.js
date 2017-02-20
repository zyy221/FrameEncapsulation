
// function F(selector){
//     [].push.apply( this , F.select(selector));
// }
// F.prototype.each = function(callback){
//     return F.each(this , callback);
// }
// F.prototype.map = function(callback){
//     return F.map(this , callback);
// }
// F.select = function (selector){
//     return document.querySelectorAll(selector);
// }
// F.isArrayLike = function (obj){
//     //判断是不是一个数组
//     if(Object.prototype.toString.call(obj) === false ) {
//         return true;
//     }
//     //伪数组
//     var length = 'length' in obj && obj.length;
//     return typeof length === 'number' && length >= 0;
// }
// F.each = function (arr , callback){
//     if(F.isArrayLike( arr )){
//         for(var i=0 ; i<arr.length ; i++){
//             if(callback.call(arr[i] , i , arr[i]) === false ) break;
//         }
//     }else{
//         for(var k in arr){
//             if(callback.call(arr[k] , k , arr[k]) === false ) break;
//         }
//     }
//     return arr;
// }
// F.map = function (arr , callback){
//     var newArr = [], tmp;
//     if(F.isArrayLike( arr )){
//         for(var i=0 ; i<arr.length; i++){
//             var tmp = callback(arr[i] , i);
//             if(tmp != null){
//                 newArr.push(tmp);
//             }
//         }
//     }else{
//         for(var k in arr){
//             var tmp = callback(arr[k] , k);
//             if(tmp != null){
//                 newArr.push(tmp);
//             }
//         }
//     }
//     return newArr;
// }

//工厂模式
function I(selector){
    //return new F(selector);

    function F(selector){
        [].push.apply( this , F.select(selector));
    }

    F.prototype.each = function(callback){
        return F.each(this , callback);
    }
    F.prototype.map = function(callback){
        return F.map(this , callback);
    }
    F.select = function (selector){
        return document.querySelectorAll(selector);
    }
    F.isArrayLike = function (obj){
        //判断是不是一个数组
        if(Object.prototype.toString.call(obj) === false ) {
            return true;
        }
        //伪数组
        var length = 'length' in obj && obj.length;
        return typeof length === 'number' && length >= 0;
    }
    F.each = function (arr , callback){
        if(F.isArrayLike( arr )){
            for(var i=0 ; i<arr.length ; i++){
                if(callback.call(arr[i] , i , arr[i]) === false ) break;
            }
        }else{
            for(var k in arr){
                if(callback.call(arr[k] , k , arr[k]) === false ) break;
            }
        }
        return arr;
    }
    F.map = function (arr , callback){
        var newArr = [], tmp;
        if(F.isArrayLike( arr )){
            for(var i=0 ; i<arr.length; i++){
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

    return new F(selector);
}


function exetend = function( obj ){
    for(var k in obj){
        this = obj[k];
    }
}

Itcast.fn.exetend({
    toArray:function(){
        //返回的是数组 
        //并且是 由每一个 DOM元素 组成的数组
        var arr = [];
        for(var i=0;i<this.length;i++){
            arr.push(this[i]);
        }
        return arr;
    }
})