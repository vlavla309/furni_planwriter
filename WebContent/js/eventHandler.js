
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
}

function dragMove(dx, dy, x, y, e) {
	var m = selectedViewbox.transform().localMatrix; 
	var mx=dx;
	var my=dy;
    if(m){
    	mx = dx/m.a;
    	my = dy/m.d;
    }
	// 드래그시 작업
	this.attr({
		transform: origTransform + (origTransform ? "T" : "t") + [mx, my]
	});
}

function dragDrop(x,y) {
	curEditor.canvas.paper.zpd('toggle');
}
/*------------- 드래그 이벤트 핸들러 끝!--------------*/


