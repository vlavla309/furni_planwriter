$( document ).ready(function(){
	$("#saveBtn").on("click", function(){
		var data=curEditor.canvas.paper.toDataURL();
		console.log(data);
	});
	
	$("#crtBtn").on("click", function(){
		curEditor.furniture(0, 0,"bed", 2039);
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