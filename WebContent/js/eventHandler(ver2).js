
/*------------- 가구 클릭 이벤트 핸들러 시작!--------------*/
function select(target){
	selectedElem=target;
	selectedViewbox=target.parent().parent(); // 선택된 가구의 뷰박스 획득
	target.attr({
		strokeWidth: 4 // CamelCase...
	}); 

	$("#footer").toggle();
}

function unSelectAll(){
	selectedElem=null;
	curEditor.furnitures.attr({
		strokeWidth: 0 // CamelCase...
	});
}

function hIn(){
	this.attr("strokeWidth", 4);
}

function hOut(){
	if(selectedElem!=this)
		this.attr("strokeWidth", 0);
}



/*------------- 드래그 이벤트 핸들러 시작!--------------*/
function dragStart(x,y,e) {
	curEditor.canvas.paper.zpd('toggle');
	selectedViewbox=this.parent().parent(); //선택된 가구의 에디터 정보 가져오기
	origTransform = this.transform().local;  //기존 트랜스폼 명령
	target=this;
	ox=0;
	oy=0;
	clonePath.remove();

}

function dragMove(dx, dy, x, y, e) {
	//setTimeout(function() {}, 15000);
	var m = selectedViewbox.transform().localMatrix; 
	var mx=dx;
	var my=dy;
	if(m){
		mx = dx/m.a;
		my = dy/m.d;
	};
	
	//tstr=target.transform().toString();
	console.log("("+dx+", "+dy+")"+" ("+x+", "+y+")");
	
	
	cloneRect=this[0].clone();
	cloneRect.attr({
		transform: origTransform + (origTransform ? "T" : "t") + [mx, my]
	});
	clonePath=getPath(cloneRect);
	
	var direction=isCollisionOfWall(clonePath);
	//console.log(direction);
	
	var pos=[mx, my];
	if(direction=="both"){
		pos=[mx, my];
		ox=mx;
		oy=my;
	}else if(direction=="horizon"){
		pos=[mx, oy];
		ox=mx;
	}
	else if(direction=="vertical"){
		pos=[ox, my];
		oy=my;
	}else {
		pos=[ox, oy];
	}
	
	this.attr({
		transform: origTransform + (origTransform ? "T" : "t") + pos
	});
	//clonePath.remove();
	cloneRect.remove();
}

function dragDrop(x,y) {
	/*collision check*/
	var collisionFurnitures=isCollisionOfFurnitures(target);

	if(collisionFurnitures){
		console.log("겹침");
		this.attr({
			transform: origTransform
		});
	}
	
	//cloneRect.remove();
	
	
	curEditor.canvas.paper.zpd('toggle');
}
/*------------- 드래그 이벤트 핸들러 끝!--------------*/

/*Collision Detect*/
function hasCollision(target, set){
	var result=false;
	var pathTarget;
	if(target.node.nodeName=="path"){
		pathTarget=target.clone();
	}else {
		pathTarget=getPath(target);
	}

	var pathSet=Snap.set();
	set.forEach(function(elem, i) {
		if(target!=elem){
			if(elem.node.nodeName=="path"){
				pathElem=elem.clone();
			}else {
				pathElem=getPath(elem);
			}
			pathSet.push(pathElem);
			var interSection=Snap.path.intersection(pathElem, pathTarget);

			if(interSection.length > 0){
				result = true;
				return;
			}
		}
	});

	pathTarget.remove();
	pathSet.remove();

	return result;
}
/* Check. Is Collision of Furnitures */
function isCollisionOfFurnitures(target){
	console.log(target);
	var result=false;
	var pathTarget=getPath(target);

	var pathSet=Snap.set();
	curEditor.furnitures.forEach(function(elem, i) {
		if(target!=elem){
			pathElem=getPath(elem);
			pathSet.push(pathElem);

			var interSection=Snap.path.intersection(pathElem, pathTarget);

			if(interSection.length > 0){
				result = true;
				return;
			}
		}
	});

	pathTarget.remove();
	pathSet.remove();

	return result;
}

function isCollisionOfWall(target){
	var countHorizon=0;
	var countVertical=0;
	curEditor.wallHorizon.forEach(function(elem, i) {
		countHorizon += Snap.path.intersection(elem, target).length;
	});

	curEditor.wallVertical.forEach(function(elem, i) {
		countVertical += Snap.path.intersection(elem, target).length;
	});
	
	//console.log("벽" +countHorizon+ " " +countVertical);
	
	if(countHorizon==0 && countVertical==0)return "both";
	else if(countHorizon != 0 && countVertical == 0)return "horizon";
	else if(countVertical != 0 && countHorizon == 0)return "vertical";
	
	return "none";
}












/* Get Path by Element*/
function getPath(target){
	var shape=target.node.nodeName;
	var path;
	if(shape=="path"){
		path=target;
	}else if(shape=="rect"){
		path=rect2Path(target);
	}else if(shape=="g"){
		path=g2Path(target);
	}

	return path;
}

/*--- Element 2 Path ------*/
//사각형을 Path로 변환
function rect2Path(target){
	var m=target.transform().localMatrix;
	var x=Number(target.attr("x"));
	var y=Number(target.attr("y"));
	var w=Number(target.attr("width"));
	var h=Number(target.attr("height"));

	var posA=new Coordinate(m.x(x,y), m.y(x,y));
	var posB=new Coordinate(m.x(x+w,y), m.y(x+w,y));
	var posC=new Coordinate(m.x(x+w,y+h), m.y(x+w,y+h));
	var posD=new Coordinate(m.x(x,y+h), m.y(x,y+h));

	var pathStr="M"+posA.x+" "+posA.y;
	pathStr+=" L"+posB.x+" "+posB.y;
	pathStr+=" L"+posC.x+" "+posC.y;
	pathStr+=" L"+posD.x+" "+posD.y;
	pathStr+=" L"+posA.x+" "+posA.y;

	var path=curEditor.canvas.path(pathStr).attr({
		fill : "none",
		stroke:"#888"
		//fill : "#000"
	});

	return path;
}

//g(가구)를 Path로 변환
function g2Path(target){
	var m=target.transform().localMatrix;
	target=target[0];
	var x=Number(target.attr("x"));
	var y=Number(target.attr("y"));
	var w=Number(target.attr("width"));
	var h=Number(target.attr("height"));

	var posA=new Coordinate(m.x(x,y), m.y(x,y));
	var posB=new Coordinate(m.x(x+w,y), m.y(x+w,y));
	var posC=new Coordinate(m.x(x+w,y+h), m.y(x+w,y+h));
	var posD=new Coordinate(m.x(x,y+h), m.y(x,y+h));

	var pathStr="M"+posA.x+" "+posA.y;
	pathStr+=" L"+posB.x+" "+posB.y;
	pathStr+=" L"+posC.x+" "+posC.y;
	pathStr+=" L"+posD.x+" "+posD.y;
	pathStr+=" L"+posA.x+" "+posA.y;

	var path=curEditor.canvas.path(pathStr).attr({
		fill : "none",
		stroke:"#888"
		//fill : "#000"
	});

	return path;
}

