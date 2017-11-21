$( document ).ready(function(){
	/*$("svg").on('mousewheel', function(e){
		
		var target=Snap($(this).children().first()[0]);
		var mouseE=e.originalEvent;
		if(mouseE.wheelDelta /120 > 0) {
			console.log('scrolling up !');
			
			zoomTo(target, 1+zoomScale);
		}
		else{
			console.log('scrolling down !');
			zoomTo(target, 1-zoomScale);
		}
	});*/
	$("#crtBtn").on("click", function(){
		makeFurniture(0, 0,"bed", 2039);
	});

	$("#rotateBtn").on("click", function(){
		var r=$("#radius").val();
		if(!r)r=45;
		if(selectedElem)rotate(selectedElem, r);
	});
	
	$("#deleteBtn").on("click", function(){
		console.log("가구 삭제");
		if(selectedElem){
			console.log(selectedElem);
			selectedElem.remove();
			selectedElem=null;
		}
	});
});