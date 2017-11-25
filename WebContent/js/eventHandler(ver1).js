
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
	var target=this;
	clone=target[0].clone();
}

function dragMove(dx, dy, x, y, e) {
	
	var m = selectedViewbox.transform().localMatrix; 
	var mx=dx;
	var my=dy;
	if(m){
		mx = dx/m.a;
		my = dy/m.d;
	}
	;
	

	clone.attr({
		transform: origTransform + (origTransform ? "T" : "t") + [mx, my]
	});
	var path=getPath(clone);
	
	var collisionWalls=hasCollision(path, curEditor.walls);
	
	if(!collisionWalls){
		// 드래그시 작업
		this.attr({
			transform: origTransform + (origTransform ? "T" : "t") + [mx, my]
		});
	}/*else{
		this.attr({
			transform: savedTransform
		});
	}
	
*/path.remove();
	//setTimeout(1500);
}

function dragDrop(x,y) {
	/*collision check*/
	var target=this;


	var collisionFurnitures=hasCollision(target, curEditor.furnitures);

	if(collisionFurnitures){
		console.log("겹침");
		this.attr({
			transform: origTransform
		});
	}

	curEditor.canvas.paper.zpd('toggle');
}
/*------------- 드래그 이벤트 핸들러 끝!--------------*/

/*Collision Detect (ver.5)*/
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


/*해당 도형에서 path를 그림*/
function getPath(target){
	var rect;
	if(target.node.nodeName=="rect"){
		rect= target;
	}else{
		rect= target[0];
	}
	var m=target.transform().localMatrix;
	var x=Number(rect.attr("x"));
	var y=Number(rect.attr("y"));
	var w=Number(rect.attr("width"));
	var h=Number(rect.attr("height"));

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
		fill : "#000"
	});
	return path;
}

