/**
 * 배치도 화면 클래스
 */
function Editor( ){
	this.canvas;
	this.room;
	this.furnitures;
	this.walls;
	this.scale=1;
}


/* 배치도 객체 초기화 */
Editor.prototype.init = function (id){
	this.canvas = Snap("#editorContainer-"+id+" .editor");
	var paper = (this.canvas).paper;
	 var applyZpd = function() {
		 paper.zpd({
			 zoomscale : 0.2,
			 zoomThreshold: 1.1,
			 drag: false
		 });
     };
     // Zpd 플러그인 초기화
     applyZpd();
     
     //배치된 가구리스트 그룹
     this.furnitures=Snap.set();
     
     //배치된 가구리스트 그룹
     this.walls=Snap.set();
     
}

/* 배치도에 새 가구 생성 */
Editor.prototype.room = function(width,height,length){
	
	var x=80; //방 렌더링 시작 위치;
	var y=80; //방 렌더링 시작 위치;
	var w=width*this.scale;
	var h=height*this.scale;
	var wallWidth=14*this.scale;
	
	var rect = this.canvas.rect(x, y, w, h).attr({
		"fill": "none",
		stroke: "#5D5D5D",
		strokeWidth: 0
	});
	
	var image = this.canvas.image("images/floor10.jpg", x, y ,w, h);
	
	var horizonGradient = this.canvas.paper.gradient("l(0, 0, 0, 1)#BDBDBD-#CFCFCF-#BDBDBD");
	var verticalGradient = this.canvas.paper.gradient("l(0, 1, 1, 1)#BDBDBD-#CFCFCF-#BDBDBD");
	
	//북쪽 벽
	var pathStr="M"+x+" "+y;
	pathStr+=" L"+(x+w)+" "+y;
	pathStr+=" L"+(x+w+wallWidth)+" "+(y-wallWidth);
	pathStr+=" L"+(x-wallWidth)+" "+(y-wallWidth);
	pathStr+=" L"+x+" "+y;

	var wallNorth=this.canvas.path(pathStr).attr({
		fill : horizonGradient,
	});
	this.walls.push(wallNorth);

	//동쪽 벽
	pathStr =" M"+(x+w)+" "+y;
	pathStr+=" L"+(x+w)+" "+(y+h);
	pathStr+=" L"+(x+w+wallWidth)+" "+(y+h+wallWidth);
	pathStr+=" L"+(x+w+wallWidth)+" "+(y-wallWidth);
	pathStr+=" L"+(x+w)+" "+y;
	
	var wallEast=this.canvas.path(pathStr).attr({
		fill : verticalGradient,
	});;
	this.walls.push(wallEast);
	
	//남쪽 벽
	pathStr="M"+x+" "+(y+h);
	pathStr+=" L"+(x+w)+" "+(y+h);
	pathStr+=" L"+(x+w+wallWidth)+" "+(y+h+wallWidth);
	pathStr+=" L"+(x-wallWidth)+" "+(y+h+wallWidth);
	pathStr+=" L"+x+" "+(y+h);
	
	var wallWest=this.canvas.path(pathStr).attr({
		fill : horizonGradient,
	});
	this.walls.push(wallWest);
	
	
	//서쪽 벽
	pathStr="M"+x+" "+y;
	pathStr+=" L"+x+" "+(y+h);
	pathStr+=" L"+(x-wallWidth)+" "+(y+h+wallWidth);
	pathStr+=" L"+(x-wallWidth)+" "+(y-wallWidth);
	pathStr+=" L"+x+" "+y;
	
	var wallWest=this.canvas.path(pathStr).attr({
		fill : verticalGradient,
	});
	this.walls.push(wallWest);
	
	
	this.walls.attr({
		stroke: "#666",
		strokeWidth: 0.5,
		strokeOpacity : 0.9
	});
	//var bbox=path.getBBox();
//	/console.log(bbox);
}

/* 배치도에 새 가구 생성 */
Editor.prototype.furniture= function(x,y,type, productId){
		var furniture;
		var rect=this.canvas.rect(x, y, 157*this.scale, 213*this.scale).attr("fill", "none");
		var image=this.canvas.image("images/bed.png", x, y ,157*this.scale, 213*this.scale);
		
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