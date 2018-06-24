//GIF initial choices to select from
let gifs = ["Fish", "birds", "cars", "rhino", "squirrels", "hippo", "fruits", "anime", "Jennifer", "friends", "no sleep", "hungry", "coffee", "turtles", "snakes"];

//Functions

//Retrieve gifs from server
function displayGif() {

    //No multiple loading of same gif
    $("#gifs-appear-here").empty();

    let gif = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=nW4Wkca57CHDG6Ku23W6fS7jpwnMjBK7&limit=10";
    
//Ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
     console.log(response);

     let results = response.data;

     for (let i = 0; i < results.length; i++) {
    //Construct a div to hold gif
    let gifDiv = $("<div class='gifs'>");

    //Storing of rating data
    let rate = results[i].rating;

    //Generate element for rating display 
    let p = $("<p>").text("Rating: " + rate);

    //Generate element for GIF display
    let gifImage = $("<img>");
        gifImage.attr("class", "gif");
       gifImage.attr("src", results[i].images.fixed_height_still.url);  
       gifImage.attr("data-still", results[i].images.fixed_height.url);
       gifImage.attr("data-animate", results[i].images.fixed_height_still.url);   
   
    //Append GIF
    gifDiv.append(gifImage);
    
    //Display rating
    gifDiv.append(p);
    
    // GIF to html
    $("#gifs-appear-here").prepend(gifDiv);
  
    
    }
  });

}

//Function for displaying gif data
function renderButtons() {
    
    //No repeat searches when clicked multiple times
    $("#buttons-view").empty();

     //Obtain from each array item
     for (let i = 0; i < gifs.length; i++) {

        //Populate buttons for each gif parameter found in array
        let button = $("<button>");
        
        //Class attribute changes to HTML elements
        button.addClass("gif-btn");

        //Data attribute store custom data private to the page
        button.attr("data-name", gifs[i]);
        
        //display text in button
        button.text(gifs[i]);

        //append to button-view
        $("#buttons-view").append(button);
    }

}

// starts and stops gif animation
function pauseGif() {

    //Set attribute to html
    let state = $(this).attr("data-state");
  
    //Image's state is still, clicking will update and animate
    //else image is still 
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  
  }; 

//Global event listeners click added to buttons

$("#add-gif").on("click", function(event) {

    //Prevents page from refreshing and allows buttons to remain 
    event.preventDefault();
    

    //Grab user input
    let gif = $("#gif-input").val().trim();
    
    gifs.push(gif);
    //Populate GIF from user input to array
    
    //Function to render GIF array into buttons
    renderButtons();

});

//Allow all buttons to be display GIF when clicked
$(document).on("click", ".gif-btn", displayGif);
$(document).on("click", ".gif", pauseGif);



//Render initial gif choices    
renderButtons();
