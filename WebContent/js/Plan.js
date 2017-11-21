/**
 * 방 도면 클래스
 */

function Plan(target, width, heigth){
	this.editor=Snap(target).g().addClass("editor");
	this.furnitures = Snap.set();
}

Room.prototype.makeFurniture = function (x,y, productId){
	var furniture;
	var polygon=canvas.polygon([x,y, x+90,y,  x+90,y+140, x,y+140]).attr("fill-opacity", 0);
	var rect=canvas.rect(x, y, 90, 140).attr("fill-opacity", 0);
	var image=canvas.image("images/bed.png", x, y ,90, 140);
	
	furniture=canvas.g(polygon,rect,image).attr({
		stroke: "#6799FF",
		strokeWidth: 0,
		class: "furniture"}
	).data("productId", productId).transform("");

	//클릭 이벤트 등록
	furniture.click(function(){
		unSelectAll();
		select(this);
	});

	//드래그 이벤트 등록
	furniture.drag(dragMove, dragStart);
	furniture.hover(hIn, hOut);
	furnitures.push(furniture);
	
	return furniture;
}