var curX, curY;
var canvas;
var cursorState="none";
$( document ).ready(function(){

	canvas = Raphael(document.getElementById("editor"), 500, 500);
	makeFurniture("bed", 002);


	makeRect(100, 100, 100, 100);
	//가구 클릭 이벤트 ㅎㅎ
	/*$(".rect").on("click", function(){
		//console.log("click rect ");

		var movedX = $(this).attr("x");
		var movedY = $(this).attr("y");

		//console.log("cur X,Y : "+curX+", "+curY);
		//console.log("moved X,Y : "+movedX+", "+movedY);
		if(curX==movedX&&curY==movedY)
			$("#footer").toggle();
	})*/


	$('svg').bind('mousewheel', function(e){
		if(e.originalEventarget.wheelDelta /120 > 0) {
			console.log('scrolling up !');
			console.log("hi"+$("svg").attr("viewBox"));
		}
		else{
			console.log('scrolling down !');
		}
	});

});

function dragStart() {
	curX=this.attr("x");
	curY=this.attr("y");
	this.ox = this.attr("x");
	this.oy = this.attr("y");
	this.attr({opacity: 1});
	//if (this.attr("y") < 60 &&  this.attr("x") < 60)
	//this.attr({fill: "#000"});        
};

function dragMove(dx, dy) {
	this.attr({x: this.ox + dx, y: this.oy + dy}); 
};

function dragUp() {
	this.attr({opacity: .5});
	if(checkOverlap(this)){
		console.log("원상복구");
		this.attr({x: curX, y: curY});
	};
	//if (this.attr("y") < 60 && this.attr("x") < 60)
	//this.attr({fill: "#AEAEAE"});   
	//this.attr({x: curX, y: curY});
};   

function makeRect(x, y,w,h){
	var rect = canvas.rect(x, y, 40, 40).attr({
		fill: "hsb(.8, 1, 1)",
		opacity: .5,
		cursor: "move"
	});

	rect.attr("class", "rect");
	rect.drag(dragMove, dragStart, dragUp);
	rect.click(function(){
		$("#footer").toggle();
	});
	return rect;
}

function makeRoom(){};

function makeFurniture(type, productId){
	var rect=makeRect(100, 100, 200, 300);
	rect.attr("class", type);
	rect.attr("name", productId);
	//$(rect).text(productId);
};

function setCurPosition(e, target){
	curX = e.pageX - $(document).scrollLeft() - $(target).offset().left;
	curY = e.pageY - $(document).scrollTop() - $(target).offset().top;
	//console.log("["+curX+", "+curY+"]");
}


/* 확대 (미완성)*/
function zoomin(viewBoxWidth, viewBoxHeight){
	var tempViewBoxWidth = viewBoxWidth;
	var tempViewBoxHeight = viewBoxHeight;

	viewBoxWidth /= 1.10;
	viewBoxHeight /=1.10;

	viewBoxX -= (viewBoxWidth - tempViewBoxWidth) / 2;
	viewBoxY -= (viewBoxHeight - tempViewBoxHeight) / 2; 

	canvas.setViewBox(viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight, false);
}

/* 겹치는지 체크(미완) */
function checkOverlap(target){
	var state=false;
	var coordinates= new Array();
	coordinates[0] = [target.attr("x"), target.attr("y")];
	coordinates[1] = [target.attr("x") + target.attr("width"), target.attr("y")];
	coordinates[2] = [target.attr("x"), target.attr("y") + target.attr("height")];
	coordinates[3] = [target.attr("x") + target.attr("width"), target.attr("y") + target.attr("height")];

	canvas.forEach(function(elem) {
		
		
		if(elem != target){
			var range= new Array();
			range[0] = [elem.attr("x"), elem.attr("x") + elem.attr("width")];
			range[1] = [elem.attr("y"), elem.attr("y") + elem.attr("height")];

			coordinates.forEach(function(pos, j) {
				if((range[0][0]<=pos[0] && pos[0]<=range[0][1])
						&&(range[1][0]<=pos[1] && pos[1]<=range[1][1])
				   ){
					console.log("겹친다 "+j);
					state=true;
					return true;
				}
			});
		}
	});
	/*coordinates.forEach(function(elt, i) {
		console.log(elt[0]);
	})*/
	return state;
}