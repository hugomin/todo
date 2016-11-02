$(document).ready(function(){
	var main=$(".main");
	var add=$(".img2");
	var close=$("#close");
	var collect=$("#collect")
	var list=$("#list");
	var nav=$("#nav");
	var side=$(".side");
	var todos=[];
	var id=$("#text");
	var jishu=0;
	var yiwan=[];
	
//	刚进去页面
	if(!localStorage.todos){
		localStorage.todos=JSON.stringify(todos)
	}
	todos=JSON.parse(localStorage.todos)
	if(localStorage.todos&&todos.length!=0){
		
		main.css("display","none")
		main.eq(2).css("display","block")
		render();
	}
	else{
		main.css("display","none")
		main.eq(0).css("display","block")
	}
//	yemiancaouzo   展示页面2
		main.eq(2).on("touchstart",".baocun",function(){
			var baocuns=$(".baocun")
			var index=baocuns.index($(this));
			
			console.log(todos)
			if(todos[index].state==1){
			$(this).removeClass("color")
			todos[index].state=0;
			}
			else if(todos[index].state==0){
			$(this).addClass("color")
			todos[index].state=1;
			}
			localStorage.todos=JSON.stringify(todos)
		})
		main.eq(2).on("touchstart",".guanbi",function(){
			var text=$("#text")
			if(text.html()=="默认"||"未完成"){
			 var delete1=$(".guanbi")
			 var index=delete1.index($(this))
			 var li=$(".one")
			 todos.splice(index,1);
			 localStorage.todos=JSON.stringify(todos);
			 if(todos.length==0){
				main.css("display","none").eq(0).css("display","block")
			}
			 li.eq(index).remove();
			
			}
			if(text.html()=="清除完成"){
			 var delete1=$(".guanbi")
			 var index=delete1.index($(this))
			 var li=$(".one")
			 todos.splice(index,1);
			 localStorage.todos=JSON.stringify(todos);
			 if(todos.length==0){
				main.css("display","none").eq(0).css("display","block")
			}
			 li.eq(index).remove();
			
			}
			if(text.html()=="已完成")
			{
			 var delete1=$(".guanbi")
			 var index1=delete1.index($(this))
			 index=yiwan[index1]
			 yiwan.splice(index1,1)
			 var li=$(".one")
			 
			 todos.splice(index,1);
			 localStorage.todos=JSON.stringify(todos);
			 console.log(li.get(index1))
			 jishu--
			 if(todos.length==0||jishu==0){
				main.css("display","none").eq(0).css("display","block")
			}
			 li.eq(index).remove();	
			}
			
			
		
			
//			else if(){
//				
//			}
			
		})	

//	内容页面
	main.eq(0).on("touchstart",".img2",function(){
		var text=$("#text")
		if(text.html()=="默认"){
			if(localStorage.todos&&todos.length!=0){
			main.css("display","none");
			main.eq(2).css("display","block")	
			render()}
			else{
				main.css("display","none");
				main.eq(1).css("display","block");
				date1();
		}
		}
		else if(text.html()=="已完成"){
			if(yiwan.length!=0){
			main.css("display","none");
			main.eq(2).css("display","block")	
			render()
		}
		else{
				main.css("display","none");
				main.eq(1).css("display","block");
				date1();
		}
		}
		else if(text.html()=="全部清空"){
			main.css("display","none");
			main.eq(1).css("display","block");
			date1();
		}
	})
	main.eq(2).on("touchstart",".img2",function(){	
		main.css("display","none");
		main.eq(1).css("display","block")
		date1();
	})
	
	
	
	
	
//  添加内容页面
   collect.on("touchstart",function(){
   	var title=$(".title");
	var content=$(".content");
	var v1=$.trim(title.val());
	var v2=$.trim(content.val());
	console.log(Boolean(v1||v2))
	if(v1||v2){
		if(!v1){v1=v2}
		if(!v2){v2=v1}
		var todo={
			state:0,
			title:v1,
			content:v2
		}
	todos.push(todo);
	localStorage.todos=JSON.stringify(todos);
	title.val("")
	content.val("")
	}
	
   })
	
	
	close.on("touchstart",function(){
		var text=$("#text")
		text.html("默认")
		if(localStorage.todos&&todos.length!=0){
			
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
	$("#nav").on("touchend",function(){
		nav.css("display","none")
		side.animate({"width":"0"},200,"linear")
	})
//	$(".side").on("touchend",function(){
//		nav.css("display","none")
//		side.animate({"width":"0"},200,"linear")
//	})
//	
	
//  选择页面
	var side=$(".side")
	var set=$(".bot li")
	set.on("touchstart",function(){
		var text=$("#text")
		var c=$("b",$(this)).html();
		text.html(c)
		main.css("display","none")
		
		//默认
		if($(this).attr("data-rote")=="mr"){
			if(localStorage.todos&&todos.length!=0){
				main.eq(2).css("display","block")
				render();
			}
			else{
				console.log(2)
				main.eq(0).css("display","block")
			}
		}
		//已完成
		if($(this).attr("data-rote")=="yw"){
			jishu=0;
			
			for(var i=0;i<todos.length;i++){
				if(todos[i].state==1){
					jishu++
					yiwan.push(i)
				}
			}
//		   console.log(yiwan);
			if(localStorage.todos&&jishu!=0){
				main.eq(2).css("display","block")
				main.eq(2).empty();
				if(localStorage.todos){
				todos=JSON.parse(localStorage.todos);
				for(var i=0;i<todos.length;i++){
				if(todos[i].state==1){
					var title1=todos[i].title;
					var content1=todos[i].content;
		    		var v=title1.charAt(0);
					$("<img src='image/02.jpg'  class='img2'/><div class='one'><div class='logo'>"+v+"</div><div class='neirong'><div class='title1'>"+title1+"</div><div class='content1'>"+content1+"</div><a class='color baocun' >&#xe612;</a><a class='guanbi'>&#xe605;</a></div></div>").
			appendTo(main.eq(2));
				}		
		}
	}
			}
			else{
				console.log(2)
				main.eq(0).css("display","block")
			}
		}
		
	//未完成
		 if($(this).attr("data-rote")=="ww"){
		  var text=$("#text")
	 		var arr1=[]
	 		console.log(todos.length)
	 		for(var i=0;i<todos.length;i++){
		 		if(todos[i].state==0){
		 			arr1.push(todos[i])
		 		}
	 		}
	 		
			if(arr1.length!=0){
				text.html("未完成")
				main.eq(2).css("display","block")
				main.eq(2).empty();
				for(var i=0;i<arr1.length;i++){
				var title1=arr1[i].title;
				var content1=arr1[i].content;
	    		var v=title1.charAt(0);
	   			var c=arr1[i].state?"color":""
				$("<img src='image/02.jpg'  class='img2'/><div class='one'><div class='logo'>"+v+"</div><div class='neirong'><div class='title1'>"+title1+"</div><div class='content1'>"+content1+"</div><a class='"+c+" baocun' >&#xe612;</a><a class='guanbi'>&#xe605;</a></div></div>").
				appendTo(main.eq(2));
		}
			}
			else{
				text.html("未完成")
				main.eq(0).css("display","block")
			}
		 }
		
	//清楚已完成
	 if($(this).attr("data-rote")=="qk"){
	 	 var text=$("#text")
	 		var arr=[]
	 		console.log(todos.length)
	 		for(var i=0;i<todos.length;i++){
		 		if(todos[i].state==0){
		 			arr.push(todos[i])
		 		 }
		 		
		 	
	 		}
	 		 todos=arr;
	 		console.log(todos)
	 		localStorage.todos=JSON.stringify(todos)
			if(localStorage.todos&&todos.length!=0){
				text.html("清除完成")
				main.eq(2).css("display","block")
				render();
			}
			else{
				text.html("清除完成")
				main.eq(0).css("display","block")
			}
		}
	 
	 
	 
//	 清除所有
	 
	  if($(this).attr("data-rote")=="qb"){
	  	    var text=$("#text") 
	 		var newarr=[]	
		 	 todos=newarr;
	 		console.log(todos)
	 		localStorage.todos=JSON.stringify(todos)
			if(localStorage.todos&&todos.length!=0){
				text.html("默认")
				main.eq(2).css("display","block")
				render();
			}
			else{
				text.html("默认")
				main.eq(0).css("display","block")
			}
		}
	
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
	   var c=todos[i].state?"color":""
		$("<img src='image/02.jpg'  class='img2'/><div class='one'><div class='logo'>"+v+"</div><div class='neirong'><div class='title1'>"+title1+"</div><div class='content1'>"+content1+"</div><a class='"+c+" baocun' >&#xe612;</a><a class='guanbi'>&#xe605;</a></div></div>").
		appendTo(main.eq(2));
		}
	}
	}
	
	function date1(){
		var date=new Date();
		var year=$("#year")
		var month=$("#month")
		var day=$("#day")
		var hour=$("#hour")
		var minute=$("#minute")
		var second=$("#second")
           //	var year1=date.
		year.html(date.getFullYear());
		month.html(date.getMonth()+1);
		day.html(date.getDate());
		hour.html(date.getHours());
		minute.html(date.getMinutes());
		second.html(date.getSeconds());
	}
	
	
})