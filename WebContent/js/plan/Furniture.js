/**
 * 가구 도메인
 */

function Furniture(id,category,name,brand,color,width,length,height){
	this.productId;  // 테이블 column :  product_id 
	this.category;  // 선반, 쇼파, 식탁, 옷장, 책상, 침대
	this.name; //상품명 
	this.brand;  //일룸, 까사미아, 이케아
	this.color;  //black, white, braun , walnut, green
	this.width; //가로
	this.height; //세로
	this.length; //높이
	this.imgPath; //상품 사진
}