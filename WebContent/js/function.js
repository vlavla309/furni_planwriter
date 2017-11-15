function rotate(target, r){
	var cx, cy;
	if (cx == null || cy == null) {
        var bbox = target.getBBox(1);
        cx = bbox.x + bbox.width / 2;
        cy = bbox.y + bbox.height / 2;
    }
	
	var matrix= Raphael.matrix();
	matrix.rotate(r,cx,cy);
	//console.log(matrix.toTransformString());
	
	var matrixStr = matrix.toTransformString();
	target.transform("..."+matrixStr);
	var xx=target.matrix.x(target.attr("x")+target.attr("width"),target.attr("y")+target.attr("height"));
	console.log(xx);
}

function translate(){
	
}

function scale(){
	
}

function getRotateMatrix(target, r){
	var cx, cy;
	if (cx == null || cy == null) {
        var bbox = target.getBBox(1);
        cx = bbox.x + bbox.width / 2;
        cy = bbox.y + bbox.height / 2;
    }
	
	var matrix= Raphael.matrix();
	matrix.rotate(r,cx,cy);
	//console.log(matrix.toTransformString());
	return matrix;
}

function toMatrix(transform) {
	  var transforms = transform.split(' '),
	      matrix = Raphael.matrix();
	  
	  for (var i=0; i<transforms.length; i++) {
	    var match = /^(\w+)\((.+)\)$/.exec(transforms[i]),
	        tranform = match[1],
	        values = toFloatArray(match[2]);
	    
	    if ('translate' === transform) matrix.translate.apply(matrix, values);
	    if ('rotate' === transform) matrix.rotate.apply(matrix, values);
	    if ('scale' === transform) matrix.scale.apply(matrix, values);
	  }
	  
	  function toFloatArray() {
	    var values = vals.split(','),
	        numbers = [];
	    for (var i=0; i<values.length; i++) {
	        numbers.push(parseFloat(values[i], 10));
	    }
	    return numbers;
	  }
	  
	  return matrix;
	}