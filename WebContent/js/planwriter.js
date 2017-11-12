/**
 * http://usejsdoc.org/
 */
  $( function() {
    $( "#tabs" ).tabs({
      beforeLoad: function( event, ui ) {
        ui.jqXHR.fail(function() {
          ui.panel.html(
            "Couldn't load this tab. We'll try to fix this as soon as possible. " +
            "If this wouldn't be a demo." );
        });
      }
    });
  } );

  $( function() {
    // Set effect from select menu value
    $( "#rightToggleBtn" ).on( "click", function() {
    	$( "#tabs" ).toggle("slow", "swing", changeDirection(this));
    });
  } );
  
	$(function() {
		// Set effect from select menu value
		$("#leftToggleBtn").on("click", function() {
			//$("#planitems").toggle("fold", "linear", changeDirection(this));
			$("#planitems").toggle("slide", { direction: "left" });
		});
	});

	function changeDirection(target) {
		var val = $(target).text();
		if (val == ">") {
			$(target).text("<");
		} else {
			$(target).text(">");
		}
		console.log(val);
	}
