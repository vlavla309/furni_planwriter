/**
 * 좌표(Coordinate) 도메인 클래스
 */
function Coordinate(x, y){
	this.x=x;
	this.y=y;
}

Coordinate.prototype.toString = function (){
	return "("+this.x+", "+this.y+")";
}