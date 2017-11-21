function rotate(target, r){
	var cx, cy;
	if (cx == null || cy == null) {
        var bbox = target.getBBox(1);
        cx = bbox.x + bbox.width / 2;
        cy = bbox.y + bbox.height / 2;
    }
	var matrix= target.matrix;	
	matrix.rotate(r,cx,cy);
	
	target.transform(matrix.toTransformString());
}

function translate(){
	
}

function scale(){
	
}


function makeFurniture(x,y,type, productId){
	var furniture;
	var polygon=canvas.polygon([x,y, x+90,y,  x+90,y+140, x,y+140]).attr("fill-opacity", 0);
	var rect=canvas.rect(x, y, 90, 140).attr("fill", "none");
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
	furniture.drag(dragMove, dragStart,dragDrop);
	furniture.hover(hIn, hOut);
	setFurniture.push(furniture);
	return furniture;
};