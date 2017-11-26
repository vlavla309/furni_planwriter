$( document ).ready(function(){
	$("#saveBtn").on("click", function(){
		unSelectAll();
		var data=curEditor.canvas.paper.toDataURL();
		console.log(data);
	});
	
	$("#crtBtn").on("click", function(){
		console.log(curEditor.offsetX+" "+curEditor.offsetY);
		curEditor.furniture(curEditor.offsetX, curEditor.offsetY,"bed", 2039);
	});

	$("#clockwiseRotateBtn").on("click", function(){
		var r=45;
		if(selectedElem)rotate(selectedElem, r);
	});
	
	$("#counterclockwiseRotateBtn").on("click", function(){
		var r=-45;
		if(selectedElem)rotate(selectedElem, r);
	});
	
	$("#deleteBtn").on("click", function(){
		console.log("가구 삭제");
		if(selectedElem){
			curEditor.furnitures.exclude(selectedElem);
			console.log(selectedElem);
			selectedElem.remove();
			selectedElem=null;
		}
	});
});