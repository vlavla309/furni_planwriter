/*var curX, curY;

var setFurniture;
var cursorState="none";
var selectedElem;
var selectedViewbox;
var allFurniture;

$( document ).ready(function(){
	
	가구 배치도 스케치북 화면 생성
	var canvas = Snap("#editorContainer-1 .editor");
	//console.log(canvas);
	setFurniture = Snap.set();
	
	 var applyZpd = function() {
		 canvas.paper.zpd({
			 zoomScale : ZOOM_SCALE,
			 zoomThreshold: 1.1,
			 drag: false
		 });
     };

     // run initializer
     applyZpd();
      
     
     //방 생성!!
     //makeRoom(700, 500, 200);	
     
});


function makeRoom(width, height, length){
	var room;
	var rect=canvas.polygon([0,0, width,0,  width,height, 0,height]).attr({
		"fill": "none",
		stroke: "#5D5D5D",
		strokeWidth: 10,
	});
	rect.undrag();
	return room;
}*/