/*------------- 가구 클릭 이벤트 핸들러 시작!--------------*/
function select(target){
	unSelectAll(target);
	var id=target.id;
	selectedId=id;
	var produtId=target.data("productId");
	console.log("The Seleted id:"+id+" pid:"+produtId);
	target.attr("stroke-width", 4).attr("stroke-opacity", 0.6);
}

function unSelectAll(target){
	canvas.forEach(function(elem){
		if(elem.attr("class")=="furniture"){
			elem.attr("stroke-width", 1).attr("stroke-opacity", 1);
		}
	})
}


/*------------- 드래그 이벤트 핸들러 시작!--------------*/
function dragStart() {
	curX=this.attr("x");
	curY=this.attr("y");
	/*this.ox = this.attr("x");
	this.oy = this.attr("y");*/
	this.ox = 0;
	this.oy = 0;
	this.attr({opacity: 0.5});
	//if (this.attr("y") < 60 &&  this.attr("x") < 60)
	//this.attr({fill: "#000"});        
};

function dragMove(dx, dy) {
	//this.transform("...T" + x  + "," + y);
	//this.attr({x: this.ox + dx, y: this.oy + dy}); 

	var x = dx - this.ox,
	y = dy - this.oy;
	this.transform("...T" + x  + "," + y);
	this.ox = dx;
	this.oy = dy;
	//console.log(this.ox + " "+this.oy);
	//this.attr({x: x, y: y}); 
};

function dragUp() {
	this.attr({opacity: 1});
	
	//if (this.attr("y") < 60 && this.attr("x") < 60)
	//this.attr({fill: "#AEAEAE"});   
	//this.attr({x: curX, y: curY});
};   
/*------------- 드래그 이벤트 핸들러 끝!--------------*/

/* 겹치는지 체크(미완) */
function checkOverlap(target){
	var isOverlap=false;
	var coordinates=getCoordinates(target);

	canvas.forEach(function(elem) {
		if(elem != target){
			var range= getRange(elem);

			coordinates.forEach(function(pos, j) {
				if((range[0][0]<=pos[0] && pos[0]<=range[0][1])
						&&(range[1][0]<=pos[1] && pos[1]<=range[1][1])
				){
					//console.log("Overlapped!");
					isOverlap=true;
					return true;
				}
			});
		}
	});
	return isOverlap;
}

function getCoordinates(target){
	var coordinates= new Array();
	coordinates[0] = [target.attr("x"), target.attr("y")];
	coordinates[1] = [target.attr("x") + target.attr("width"), target.attr("y")];
	coordinates[2] = [target.attr("x"), target.attr("y") + target.attr("height")];
	coordinates[3] = [target.attr("x") + target.attr("width"), target.attr("y") + target.attr("height")];
	return coordinates;
}

