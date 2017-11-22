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
