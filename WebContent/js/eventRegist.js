$( document ).ready(function(){
	$('svg').on('mousewheel', function(e){
		if(e.originalEventarget.wheelDelta /120 > 0) {
			console.log('scrolling up !');
			console.log("hi"+$("svg").attr("viewBox"));
		}
		else{
			console.log('scrolling down !');
		}
	});

	$("#crtBtn").on("click", function(){
		makeFurniture("bed", 002);
	});

	$("#rotateBtn").on("click", function(){
		var target=canvas.getById(selectedId);
		var r=$("#radius").val();
		if(!r)r=45;
		if(target)rotate(target, r);
	});
});