/**
 * 배치도 화면 클래스
 */
function Editor( ){
	this.canvas;
	this.room;
	this.furnitures;
}


/* 배치도 객체 초기화 */
Editor.prototype.init = function (id){
	this.canvas = Snap("#editorContainer-"+id+" .editor");
	var paper = (this.canvas).paper;
	 var applyZpd = function() {
		 paper.zpd({
			 zoomScale : 0.2,
			 zoomThreshold: 1.1,
			 drag: false
		 });
     };
     // Zpd 플러그인 초기화
     applyZpd();
     
     //배치된 가구리스트 그룹
     this.furnitures=Snap.set();
}

/* 배치도에 새 가구 생성 */
Editor.prototype.room = function(width,height,length){
	var x=80; //방 렌더링 시작 위치;
	var y=80; //방 렌더링 시작 위치;
	var w=width*0.8;
	var h=height*0.8;
	
	var rect = this.canvas.rect(x, y, w, h).attr({
		"fill": "none",
		stroke: "#5D5D5D",
		strokeWidth: 0
	});
	
	var pathStr="M"+x+" "+y;
	pathStr+=" L"+(x+w)+" "+y;
	pathStr+=" L"+(x+w)+" "+(y+h);
	pathStr+=" L"+x+" "+(y+h);
	pathStr+=" L"+x+" "+y;

	var path=this.canvas.path(pathStr).attr({
		fill : "none",
		stroke: "#5D5D5D",
		strokeWidth: 20
	});
}

/* 배치도에 새 가구 생성 */
Editor.prototype.furniture= function(x,y,type, productId){
		var furniture;
		var rect=this.canvas.rect(x, y, 90*0.8, 140*0.8).attr("fill", "none");
		var image=this.canvas.image("images/bed.png", x, y ,90*0.8, 140*0.8);
		
		furniture=this.canvas.g(rect,image).attr({
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
		this.furnitures.push(furniture);
		return furniture;
}