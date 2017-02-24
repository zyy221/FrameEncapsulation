

(function( window){


	Itcast.fn.extend ({
		    hasClass: function ( className ) {
        // 判断 this 中的所有 DOM 元素, 只要有一个含有该类样式的元素就返回 true
        // dom.className.split( ' ' ).indexOf (  'c' ) > -1
        className = className.trim();
        for ( var i = 0; i < this.length; i++ ) {
            var dom = this[ i ],
                classNames = dom.className && dom.className.split( ' ' );

            if ( classNames && classNames.indexOf( className ) > -1 ) {
                // 存在
                return true;
            }
        }
        return false;
    },


    addClass: function ( className ) {
        return this.each(function () {
            if ( this.className ) {
                this.className += ' ' + className;
            } else {
                this.className = className;
            }
        });
    } ,


    removeClass: function ( className ) {
        // 将 this 中 每一个 DOM 元素的 className 属性中符合 参数中描述的 className 的类样式删除
        className = className.trim(); // ES5
        return this.each(function () {

            // 删除 this 中的 对应 className
            var classNames = this.className && this.className.split( ' ' );
            if ( !classNames ) return;

            // 移除数组中符合要求的字符串
            var index; // undefined
            while( ( index = classNames.indexOf( className ) ) != -1 ) {
                classNames.splice( index, 1 );
            }

            this.className = classNames.join( ' ' );

        });
    },

    toggleClass:function( className ){
    	//判断每一个元素 有则删除 没有则添加
    	return this.each(function(){
    		if(I(this).hasClass( className )){
    			I(this).removeClass( className );
    		}else{
    			I(this).addClass( className );
    		}
    	})
    }
    





})
	})

})(window);

