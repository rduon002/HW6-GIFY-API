//GIF initial choices to select from
let gifs = ["Fish", "birds", "cars", "rhino", "squirrels", "hippo", "fruits", "anime", "Jennifer", "friends", "no sleep", "hungry", "coffee", "turtles", "snakes"];

//Functions

//Retrieve gifs from server
function displayGif() {

    let userInput = (this).attr("data-name");
    let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=nW4Wkca57CHDG6Ku23W6fS7jpwnMjBK7&limit=10";
    
//Ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    //Create div for gifs
    let gifDiv = $("<div class='gifs'>");

    for (i = 0; i < response.data.length; i++) {
        
        //Retrieval of rating data
        let rating = response.data[i].rating;

        //Generate element for rating display 
        let displayRating = $("<p>").text("Rating: " + rating);
        
        //Retrieval of image data
        let imgSource = response.data[i].images;
        
        //Generate div for image display
        let img = $("<img>");

        //Applies attributes
            img.attr("class", "gif");
            img.attr("src", imgSource.fixed_height_still.url);
            img.attr("data-still", imgSource.fixed_height.url);
            img.attr("data-animate", imgSource.fixed_height_still.url);

      //Population of images and ratings to div
      gifDiv.append(displayRating);
      gifDiv.append(image);

    };

    //GIF to html
    $("#gifs-view").prepend(gifDiv);

  });

}

//Button generation
$("#add-gif").on("click", function(event) {
    
    //Enter press
    event.preventDefault();

    //Grab user input
    let gifInput = $("#gif-input").val().trim();
    
    //Populate GIF from user to view window
    
    //Function to render GIF array into buttons
    renderButtons();

});

//Global event listeners adding to buttons

    //Animate

    //Pause

//Render intial gif choices    
renderButtons();
