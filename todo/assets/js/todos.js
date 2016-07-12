;(function(){

	// Check off specific todos by clicking
	$("ul").on("click", "li", function() {
		$(this).toggleClass("done");
	});

	// Click on x fo delete Todo
	$("ul").on("click", "span", function(e) {
		$(this).parent("li").fadeOut(500, function() {
			$(this).remove();
		});
		e.stopPropagation(); // stop event bubbling
	});

	// Add todo
	$("input[type='text']").keypress(function(e) {
		// if "enter" is pressed:
		if (e.which === 13) {
			var newTodo = $(this).val();
			$("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> " + newTodo + "</li>");
			$(this).val(''); // Clear the input field
		}
	});

	// Toggle the input form
	$(".fa-plus").click(function() {
		$("input[type='text']").fadeToggle(100);
	});

})();