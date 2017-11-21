var curX, curY;
var canvas;
var setFurniture;
var cursorState="none";
var selectedElem;
var selectedViewbox;
var allFurniture;
var zoomScale=0.2; //0.1배씩
$( document ).ready(function(){
	
	/*가구 배치도 스케치북 화면 생성*/
	canvas = Snap(".editor");
	
	setFurniture = Snap.set();
	
	 var applyZpd = function() {
		 canvas.paper.zpd({
			 zoomScale : zoomScale,
			 zoomThreshold: 1.1,
			 drag: false
		 });
     };

     // run initializer
     applyZpd();
     
     makeRoom(700, 500, 200);	
     
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
}