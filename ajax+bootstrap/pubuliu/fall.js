//图片布局
(function($){
	$.fn.extend({
		fall:function(){
			var bigWidth=this.width();//容器的宽
			var box1=this.find(".box1");
			var boxWidth=box1.outerWidth();
			var rowNum=5;
			var space=(bigWidth-(boxWidth*rowNum))/(rowNum-1);
			//定义一个空数组存放高度
			var arr=[];  
			//循环
			box1.each(function(index,el){
				//计算第一行图片存放的位置
				if(index<rowNum){
					arr[index]=$(el).outerHeight();
					left=index*(boxWidth+space);
					$(el).css({
						left:left,
						top:0
					})
				}else{
					//比较并找到最矮的高度
					var minHeight=arr[0];
					var minIndex=0;
					var height=$(el).outerHeight();
					for(var i in arr){
						if(arr[i]<minHeight){
							minHeight=arr[i];
							minIndex=i;
						}
					}
					//将图片放在高度最矮之后，其高度增加
					arr[minIndex]=minHeight+height+space;
					$(el).css({
						top:minHeight+space,
						left:minIndex*(boxWidth+space)
					});
				}
				
			})
			var maxHeight=arr[0];
			for(var j in arr){
				if(arr[j]>maxHeight){
					maxHeight=arr[j];
					
				}
			}
			
			this.height(maxHeight)
		}
	});
})(jQuery);



//ajax加载图片
function ajaxGetImg(pageNum){
	$.ajax({
		url:"fall.php",
		type:"post",
		data:{page:pageNum},
		dataType:"json",
		success:function(responseData){
			//当加载结束时显示
			if(responseData.length==0){
				$("#loadmore").text("加载结束");
			}
			for(var i in responseData){
				var title=responseData[i].tltle;
				var img=responseData[i].path;
//				console.log(img)
				//添加标签
				var divo=$("<div/>",{class:"box1"}).appendTo(".box");
				$("<img/>",{src:img}).appendTo(divo);
				$("<p/>").html(title).appendTo(divo);
			}
			$(".box img").on("load",function(){
				$(".box").fall();
			})
		},
		error:function(xhr,error,ex){
			alert("服务器出错，稍后重试！")
		}
	});
}

//调用函数
$(window).on("load",function(){
	var pageNum=1;
	ajaxGetImg(1);
	$(window).scroll(function(){
		var tolHeight=Math.ceil($(window).height()+$(window).scrollTop());
		if(tolHeight>=$(document).height()){
			pageNum++;
			ajaxGetImg(pageNum)
		}
	});
});
