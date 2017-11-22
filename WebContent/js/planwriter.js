/**
 */
var ZOOM_SCALE=0.2; //0.2배씩

var selectedElem;
var planCount=1;
var editorList;
var curEditor;

$( function() {
	//초기화!!!
	editorList= new Map();
	
	
	// 새 배치도 작성폼 다이얼로그 
	var newPlanDlg = $( "#newPlanForm" ).dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			Add: function() {
				var planid=addPlanItem();
				selectPlan(planid);
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			form[ 0 ].reset();
		}
	});

	// AddTab form: calls addTab function on submit and closes the dialog
	var form = newPlanDlg.find( "form" );

	// 새 배치도 작성폼 버튼
	$( "#newPlanBtn" ).button().on( "click", function() {
		newPlanDlg.dialog( "open" );
	});

	// 배치도 목록 화면 영역 토글 버튼 이벤트 처리
	$("#leftToggleBtn").on("click", function() {
		//$("#planitems").toggle("fold", "linear", changeDirection(this));
		$("#planitemTabs").toggle("slide", { direction: "left" }, changeDirection(this));
	});
	
	
	//배치도 리스트 항목 버튼 이벤트 처리
	$("#planitems").on("click", ".planitem a",function(evt){
		evt.preventDefault();
		var pid=$(this).attr("href");
		$(".editorContainer").removeClass("active");
		$("#editorContainer-"+pid).addClass("active");
		
		var id=parseInt(pid)
		curEditor=editorList.get(id);
	});
	
	/*----------------------상품 카테고리 탭----------------------*/
	$( "#tabs" ).tabs({
		beforeLoad: function( event, ui ) {
			ui.jqXHR.fail(function() {
				ui.panel.html("페이지 로드불가!!" );
			});
		}
	});
	
	// 상품 카테고리 탭 영역 토글 버튼 이벤트처리
	$( "#rightToggleBtn" ).on( "click", function() {
		$( "#tabs" ).toggle("slow", "swing", changeDirection(this));
	});
	/*----------------------상품 카테고리 탭 끝!!!----------------------*/
	
} );

function changeDirection(target) {
	var val = $(target).text();
	if (val == ">") {
		$(target).text("<");
	} else {
		$(target).text(">");
	}
	console.log(val);
}


function addPlanItem(){
	var id=planCount++;
	
	var planName=$("#planName").val();
	var planWidth=$("#planWidth").val();
	var planHeigth=$("#planHeigth").val();
	var planLength=$("#planLength").val();
	
	$("#planitems").append("<li><div class='planitem'><a href='"+id+"'>"+planName+"</a></div></li>");
	

	var planStr="<div id='editorContainer-"+id+"' class='editorContainer'>";
	planStr +="<svg width='100%' height='100%'>";
	planStr +="<g class='editor'>";
	planStr +="</g>";
	planStr +="</svg>";
	
	$("#editorWrap").append(planStr);
	
	var editor=new Editor();
	editor.init(id);
	editorList.set(id, editor);
	return id;
}

function selectPlan(id){
	$(".planitem a[href="+id+"]").trigger("click");
}