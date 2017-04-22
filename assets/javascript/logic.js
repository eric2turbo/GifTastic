var topics = ["dog", "cat", "lemur", "monkey", "manatee", "goldfish", "bird", "ferret",
			  "turtle", "teacup pig"];

//function to add buttons based on topics array
function renderButtons() {
	$("#topicButtons").empty();
	
	for (var i=0; i<topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#topicButtons").append(a);
	}
}	

//function to display 10 gifs from giphy
function displayTopicGifs() {
	var topic = $(this).attr("data-name");
	console.log("data-name");
//api request to giphy with search term q= and limit=10
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic +
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
			topicImage.attr("src", results[i].images.original_still.url);
			topicImage.attr("data-still", results[i].images.original_still.url);
			topicImage.attr("data-animate", results[i].images.original.url);
			topicImage.attr("data-state", "still");
			topicImage.addClass("gif");
			topicDiv.append(topicImage);
			topicDiv.append(p);
			$("#gifs-appear-here").prepend(topicDiv);
		
		}
	});	
}

$("#addtopic").on("click", function(event) {
	event.preventDefault();
	var topic = $("#topic-input").val().trim();
	topics.push(topic);
	renderButtons();
});

$(document).on("click", ".topic", displayTopicGifs);

$(document).on("click", ".gif", animateGif);
$(".gif").on("click", animateGif);
	
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

renderButtons();