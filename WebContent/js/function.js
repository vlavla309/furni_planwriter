function rotate(target, r){
	var cx, cy;
	if (cx == null || cy == null) {
        var bbox = target.getBBox(1);
        cx = bbox.x + bbox.width / 2;
        cy = bbox.y + bbox.height / 2;
    }
	
	var matrix= Raphael.matrix();
	matrix.rotate(r,cx,cy);
	
	target.transform("..."+matrix.toTransformString());
}

function translate(){
	
}

function scale(){
	
}

function checkCollision(target){
	var result=false;
	var tCoordi = getCoordinates(target);
	var oCoordi;
	canvas.forEach(function(elem, i) {
		if(elem!=target){
			oCoordi=getCoordinates(elem);
			console.log("ID:"+ elem.id);
			var a=oCoordi[0];
			var b=oCoordi[1];
			var c=oCoordi[2];
			var d=oCoordi[3];
			
			console.log("a:"+a.toString());
			console.log("b:"+b.toString());
			console.log("c:"+c.toString());
			console.log("d:"+d.toString());
			
			
			var ab;
			var bc;
			var cd;
			var ad;
			
			tCoordi.forEach(function(p, i) {
				
				
				ab=checkLineVal(a, b, p) * checkLineVal(a, b, c);
				bc=checkLineVal(b, c, p)*checkLineVal(b, c, a);
				cd=checkLineVal(c, d, p)*checkLineVal(c, d, b);
				ad=checkLineVal(a, d, p)*checkLineVal(a, d, c);
				
				console.log("ab p"+i+":"+p.toString()+", "+ab);
				console.log("bc p"+i+":"+p.toString()+", "+bc);
				console.log("cd p"+i+":"+p.toString()+", "+cd);
				console.log("ad p"+i+":"+p.toString()+", "+ad);
			});
			
			/*
			console.log("ab :"+ab);
			console.log("bc :"+bc);
			console.log("cd :"+cd);
			console.log("ad :"+ad);
			*/
		}
	});
	
	return result;
}


function getCoordinates(target){
	var coordinates=new Array();
	var m=target.matrix;
	var pos=new Coordinate(target.attr("x"),target.attr("y"))
	var width=target.attr("width");
	var height=target.attr("height");

	coordinates[0] = new Coordinate(m.x(pos.x, pos.y), m.y(pos.x, pos.y));
	coordinates[1] = new Coordinate(m.x(pos.x+width, pos.y), m.y(pos.x+width, pos.y));
	coordinates[2] = new Coordinate(m.x(pos.x+width, pos.y+height), m.y(pos.x+width, pos.y+height));
	coordinates[3] = new Coordinate(m.x(pos.x, pos.y+height), m.y(pos.x, pos.y+height));
	
	return coordinates;
}

function transformedCoordinate(){
	
}

/**
 * 직선 ab가 있을때 한점 p가 직선과 관계하여 어디에 위치하여있는지 확인
 * @param a 
 * @param b
 * @param p
 * @returns 0일경우 직선상에 위치, 음수일 경우 직선 아래, 양수일 경우 직선 위에 위치
 */
function checkLineVal(a,b,p){
	var result =(p.y-a.y)*(b.x-a.x)-(p.x-a.x)*(b.y-a.y);
	//console.log(result);
	return result;
}