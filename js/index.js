$(document).ready(function(){
	var main=$(".main");
	var add=$(".img2");
	var close=$("#close");
	var collect=$("#collect")
	var list=$("#list");
	var nav=$("#nav");
	var side=$(".side");
	
	var year=$("#year")
	var month=$("#month")
	var day=$("#day")
	var hour=$("#hour")
	var minute=$("#minute")
	var second=$("#second")
	var todos=[];
//显示main 2

	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		for(var i=0;i<todos.length;i++){
		var title1=todos[i].title;
		var content1=todos[i].content;
	    var v=title1.charAt(0);
	   var c=todos[i].stats?"color":""
		$("<div class='one'><div class='logo'>"+v+"</div><div class='neirong'><div class='title1'>"+title1+"</div><div class='content1'>"+content1+"</div><a class='"+c+" baocun' >&#xe612;</a><a class='guanbi'>&#xe605;</a></div></div>").
		appendTo(main.eq(2));
		}
	}
	
	

//	主页面
	console.log(add)
	add.eq(0).on("touchstart",function(){
		main.css("display","none");
		main.eq(2).css("display","block")	
	})
	add.eq(1).on("touchstart",function(){
		main.css("display","none");
		main.eq(1).css("display","block")
		var date=new Date();
           //	var year1=date.
		year.html(date.getFullYear());
		month.html(date.getMonth());
		day.html(date.getDate());
		hour.html(date.getHours());
		minute.html(date.getMinutes());
		second.html(date.getSeconds());
		
	})
	
	
	
	
	
//  添加页面
   collect.on("touchstart",function(){
   	var title=$(".title");
	var content=$(".content");
	var v1=$.trim(title.val());
	var v2=$.trim(content.val());

	if(v1||v2){
		if(!v1){v1=v2}
		if(!v2){v2=v1}
		var todo={
			state:0,
			title:v1,
			content:v2
		}
	}
	todos.push(todo);
	console.log(todos)
	localStorage.todos=JSON.stringify(todos);
	title.val("")
	content.val("")
   })
	
	
	close.on("touchstart",function(){
		if(localStorage.todos){
			main.css("display","none")
			main.eq(2).css("display","block")
			render();
		}else{
			main.css("display","none")
			main.eq(0).css("display","block")
		}
	})
	
	
	
	
	
	
//  设置页面
	list.on("touchend",function(){
		nav.css("display","block")
		side.animate({"width":"80%"},200,"linear")
	})
	$("#nav:not(.side)").on("touchend",function(){
		nav.css("display","none")
		side.animate({"width":"0"},200,"linear")
	})
	
	
	
//渲染
	function render(){
		main.eq(2).empty();
		if(localStorage.todos){
		todos=JSON.parse(localStorage.todos);
		for(var i=0;i<todos.length;i++){
		var title1=todos[i].title;
		var content1=todos[i].content;
	    var v=title1.charAt(0);
	   var c=todos[i].stats?"color":""
		$("<div class='one'><div class='logo'>"+v+"</div><div class='neirong'><div class='title1'>"+title1+"</div><div class='content1'>"+content1+"</div><a class='"+c+" baocun' >&#xe612;</a><a class='guanbi'>&#xe605;</a></div></div>").
		appendTo(main.eq(2));
		}
	}
	}
})