/**
 * 배치도 화면 클래스
 */
function Editor( ){
	this.canvas;
	this.room;
	this.furnitures;
	this.wallHorizon;
	this.wallVertical;
	this.wallNorth;
	this.wallEast;
	this.wallSouth;
	this.wallWest;
	this.scale=1;
	this.offsetX=80;
	this.offsetY=80;
}


/* 배치도 객체 초기화 */
Editor.prototype.init = function (id){
	this.canvas = Snap("#editorContainer-"+id+" .editor");
	var paper = (this.canvas).paper;
	 var applyZpd = function() {
		 paper.zpd({
			 zoomscale : 0.2,
			 zoomThreshold: [0.4, 1.8],
			 drag: false
		 });
     };
     // Zpd 플러그인 초기화
     applyZpd();
     
     //배치된 가구리스트 집합
     this.furnitures=Snap.set();
     
     //벽 집합
     this.wallHorizon=Snap.set();
     this.wallVertical=Snap.set();
     
}

/* 배치도에 새 가구 생성 */
Editor.prototype.room = function(width,height,length){
	
	var x=80; //방 렌더링 시작 위치;
	var y=80; //방 렌더링 시작 위치;
	var w=width*this.scale;
	var h=height*this.scale;
	var wallWidth=14*this.scale;

	var pathStr="M"+x+" "+y;
	pathStr+=" L"+(x+w)+" "+y;
	pathStr+=" L"+(x+w)+" "+(y+h);
	pathStr+=" L"+(x)+" "+(y+h);
	pathStr+=" L"+x+" "+y;
	var path=this.canvas.path(pathStr).attr({
		"fill": "none",
		stroke: "#5D5D5D",
		strokeWidth: 0
	});
	
	var image = this.canvas.image("images/floor10.jpg", x, y ,w, h);
	
	var horizonGradient = this.canvas.paper.gradient("l(0, 0, 0, 1)#BDBDBD-#CFCFCF-#BDBDBD");
	var verticalGradient = this.canvas.paper.gradient("l(0, 1, 1, 1)#BDBDBD-#CFCFCF-#BDBDBD");
	
	//북쪽 벽
	pathStr="M"+x+" "+y;
	pathStr+=" L"+(x+w)+" "+y;
	pathStr+=" L"+(x+w+wallWidth)+" "+(y-wallWidth);
	pathStr+=" L"+(x-wallWidth)+" "+(y-wallWidth);
	pathStr+=" L"+x+" "+y;

	this.wallNorth=this.canvas.path(pathStr);
	this.wallHorizon.push(this.wallNorth);

	//동쪽 벽
	pathStr =" M"+(x+w)+" "+y;
	pathStr+=" L"+(x+w)+" "+(y+h);
	pathStr+=" L"+(x+w+wallWidth)+" "+(y+h+wallWidth);
	pathStr+=" L"+(x+w+wallWidth)+" "+(y-wallWidth);
	pathStr+=" L"+(x+w)+" "+y;
	
	this.wallEast=this.canvas.path(pathStr);
	this.wallVertical.push(this.wallEast);
	
	//남쪽 벽
	pathStr="M"+x+" "+(y+h);
	pathStr+=" L"+(x+w)+" "+(y+h);
	pathStr+=" L"+(x+w+wallWidth)+" "+(y+h+wallWidth);
	pathStr+=" L"+(x-wallWidth)+" "+(y+h+wallWidth);
	pathStr+=" L"+x+" "+(y+h);
	
	this.wallSouth=this.canvas.path(pathStr);
	this.wallHorizon.push(this.wallSouth);
	
	
	//서쪽 벽
	pathStr="M"+x+" "+y;
	pathStr+=" L"+x+" "+(y+h);
	pathStr+=" L"+(x-wallWidth)+" "+(y+h+wallWidth);
	pathStr+=" L"+(x-wallWidth)+" "+(y-wallWidth);
	pathStr+=" L"+x+" "+y;
	
	this.wallWest=this.canvas.path(pathStr);
	this.wallVertical.push(this.wallWest);
	
	
	
	this.wallVertical.attr({
		fill : verticalGradient,
		stroke: "#666",
		strokeWidth: 0.5,
		strokeOpacity : 0.9
	});
	
	this.wallHorizon.attr({
		fill : horizonGradient,
		stroke: "#666",
		strokeWidth: 0.5,
		strokeOpacity : 0.9
	});
	
	walls=this.canvas.g(this.wallNorth,this.wallEast,this.wallSouth,this.wallWest);
}

/* 배치도에 새 가구 생성 */
Editor.prototype.furniture= function(x,y,type, productId){
		var furniture;
		var rect=this.canvas.rect(x, y, 100*this.scale, 213*this.scale).attr("fill", "none");
		var image=this.canvas.image("images/bed.png", x, y ,100*this.scale, 213*this.scale);
		
		furniture=this.canvas.g(rect,image).attr({
			stroke: "#6799FF",
			strokeWidth: 0,
			class: "furniture"}
		).data("productId", productId).transform("");

		//클릭 이벤트 등록
		furniture.mousedown(function(){
			unSelectAll();
		});
		
		furniture.mouseup(function(){
			select(this);
		});

		//드래그 이벤트 등록
		furniture.drag(dragMove, dragStart,dragDrop);
		furniture.hover(hIn, hOut);
		this.furnitures.push(furniture);
		return furniture;
}