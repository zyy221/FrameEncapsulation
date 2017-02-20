(function ( window ) {

var arr = [],
    push = arr.push,
    slice = arr.slice;


// 对外公开的函数, 但是原型与构造函数相同, 而且 constructor 也是该函数
// 因此 Itcast 函数也是构造函数
function Itcast ( selector ) {
    return new Itcast.fn.init( selector );
}

// 原型的设置( 核心成员 )
Itcast.fn = Itcast.prototype = {
    constructor: Itcast,
    length: 0,
    init: function ( selector ) {

        // 传入的如果是 0, '', nulll, undefined
        if ( !selector ) return this;

        // 获得元素, 设置 this 
        //push.apply( this, Itcast.select( selector ));
        //判断是不是一个字符串
        if(typeof selector === 'string'){
        	//判断是不是一个包含标签的字符串
        	if(/^\s*</.test(selector)){
        		push.apply(this , Itcast.parseHTML(selector));
        	}else{
        		push.apply(this , Itcast.select(selector));
        	}
        	return this;
        }
        
   
    }
};
// 共享原型
Itcast.fn.init.prototype = Itcast.fn;

// 添加扩展方法
Itcast.extend = Itcast.fn.extend = function ( obj ) {
    for ( var k in obj ) {
        this[ k ] = obj[ k ];
    }
    return this;
};


// 已经写好的工具方法
Itcast.extend({
    select: function ( selector ) {
        return document.querySelectorAll( selector );
    },
    isArrayLike: function ( obj ) {
        if ( Object.prototype.toString.call( obj ) == '[object Array]' ) {
            return true;
        }
        var length = 'length' in obj && obj.length;
        return typeof length === 'number' && length >= 0;
    },
    each: function ( arr, callback ) {
        if ( Itcast.isArrayLike ( arr ) ) {
            for ( var i = 0; i < arr.length; i++ ) {
                if ( callback.call( arr[ i ], i, arr[ i ] ) === false ) break;
            }
        } else {
            for ( var k in arr ) {
                if ( callback.call( arr[ k ], k, arr[ k ] ) === false ) break;
            }
        }
        return arr;
    },
    map: function ( arr, callback ) {
        var newArr = [], tmp;
        if ( Itcast.isArrayLike ( arr ) ) {
            for ( var i = 0; i < arr.length; i++ ) {
                tmp = callback( arr[ i ], i );
                if ( tmp != null ) {
                    newArr.push( tmp );
                }
            }
        } else {
            for ( var k in arr ) {
                tmp = callback( arr[ k ], k );
                if ( tmp != null ) {
                    newArr.push( tmp );
                }
            }
        }
        return newArr;
    }
});

Itcast.fn.extend({
    each: function ( callback ) {
        return Itcast.each( this, callback );
    },
    map: function ( callback ) {
        return Itcast.map( this, callback );
    }
});


// 添加核心方法
Itcast.fn.extend({
    toArray: function () {
        // 要返回的是数组, 而且是 由 this 中的每一个 dom 元素所组成 的数组
        // 方案1
        // var arr = [];
        // for ( var i = 0; i < this.length; i++ ) {
        //     arr.push( this[ i ] );
        // }
        // return arr;

        // 方案2
        // return this.map(function ( v ) {
        //     return v;
        // });


        // 方案3
        return slice.call( this );

    },
    get: function ( index ) {
        if ( index === undefined ) {
            // toArray
            return this.toArray();
        }

        // 正负数
        if ( index < 0 ) {

            return this[ this.length + index ];

        } else {
            return this[ index ];
        }
    },
    first: function (  ) {
        // var iobj = this.constructor(); // Itcast()
        // var dom = this.get( 0 );
        // iobj[ 0 ] = dom;
        // iobj.length = 1;
        // return iobj;
        return this.eq( 0 );
    },
    eq: function ( index ) {
        // 获得元素, 并构造 Itcast 对象
        var iobj = this.constructor();
        
        if ( index == null ) return iobj; 

        var dom = this.get( index );
        if ( dom ) {
            iobj[ 0 ] = dom;
            iobj.length = 1;
        }
        return iobj;
    },
    last: function () {
        return this.eq( -1 );
    } 
});








window.Itcast = window.I = Itcast;


})( window );