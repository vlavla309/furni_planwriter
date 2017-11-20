var curX, curY;
var canvas;
var cursorState="none";
var selectedId=0;
var allFurniture;
$( document ).ready(function(){
	/*가구 배치도 스케치북 화면 생성*/
	canvas = Raphael(document.getElementById("editor"), 500, 500);

	var fur=makeFurniture("bed", 2039);
	
});


function makeRect(x, y,w,h){
	var rect = canvas.rect(x, y, w, h).attr({
		fill: "hsb(.8, 1, 1)",
		opacity: .5,
		cursor: "move"
	});
	return rect;
}
 
function makeFurniture(type, productId){
	var furniture=canvas.rect(0, 0, 40, 40).attr({
		fill: "hsb(.8, 1, 1)",
		class: "furniture"
	}).data("productId", productId);
	
	//클릭 이벤트 등록
	furniture.click(function(){
		select(this);
	});
	
	//드래그 이벤트 등록
	furniture.drag(dragMove, dragStart, dragUp);
	return furniture;
};



