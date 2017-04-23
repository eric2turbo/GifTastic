
//Topics for buttons on top of page
var topics = ["alison brie", "lemur", "cruise", "manatee", "poochie", "heman",
			  "simpsons", "turtle", "shia", "nope", "guile", "psy", "kanye", 
			  "antonio banderas", "both"];

//function to add buttons based on topics array
function renderButtons() {
	$("#topicButtons").empty();
	
	for (var i=0; i<topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic btn btn-success btn-sm");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#topicButtons").append(a);
	}
}	

//function to display 10 gifs from giphy
function displayTopicGifs() {
	var topic = $(this).attr("data-name");
//api request to giphy with search term q= and limit=10
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic +
					"&api_key=dc6zaTOxFJmzC&limit=10";
	
	$.ajax({
			url: queryURL,
			method: "GET"
	}).done(function(response) {
		var results = response.data;
//loop to create divs that contain images and their rating
		for (var i=0; i<results.length; i++) {
			var topicDiv = $("<div>");
			topicDiv.addClass("topicGif");
			var p = $("<p>");
			p.text("Rating: " + results[i].rating);
//adding img element with attributes for default and animated locations
			var topicImage = $("<img>");
			topicImage.attr("src", results[i].images.fixed_height_still.url);
			topicImage.attr("data-still", results[i].images.fixed_height_still.url);
			topicImage.attr("data-animate", results[i].images.fixed_height.url);
			topicImage.attr("data-state", "still");
			topicImage.addClass("gif");
			topicDiv.append(topicImage);
			topicDiv.append(p);
			$("#gifs-appear-here").prepend(topicDiv);
		
		}
	});	
}


//event listener for submit button
$("#addtopic").on("click", function(event) {
	event.preventDefault();
	var topic = $("#topic-input").val().trim();
	topics.push(topic);
	renderButtons();
});

//Changes state of img element to animate or still
function animateGif() {
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}			
}

$(document).on("click", ".topic", displayTopicGifs);

//Event listener for animateGif for all gif class elements created by document
$(document).on("click", ".gif", animateGif);
//$(".gif").on("click", animateGif);
	

renderButtons();