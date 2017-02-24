(function(window){

	var arr = [],
		push = arr.push;

	// Itcast.fn.on = function(type , callback){
	// 	return this.each(function(){
	// 		this.addEventListenr(type , callback);
	// 	});
	// }

	// Itcast.fn.off = function(type , callback){
	// 	return this.each(function(){
	// 		this.removeEventListener(type , callback)
	// 	})
	// }
	
	//添加事件方法
	Itcast.fn.extend({
		on:function(type , callback){
			return this.each(function(){
				this.addEventListener(type , callback);
			});
		},
		off:function(type , callback){
			return this.each(function(){
				this.removeEventListener(type , callback);
			})
		}

	});

	//添加其他事件
	Itcast.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "),function( i , v ){
		Itcast.fn[ v ] = function( callback ){
			return this.on( v , callback );
		};
	});

})(window);