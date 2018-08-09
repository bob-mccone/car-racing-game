//Main javascript file, basically calls everything
var canvas, canvasContext;

//Creating a new car class
var blueCar = new carClass();
var greenCar = new carClass();

//When window loads we are getting the canvas and then making it drawable with objects kind of thing
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    //Displaying a loading screen when the game loads rather than seeing a blank white screen
    colorRect(0, 0, canvas.width, canvas.height, 'red');
    //Displaying words on the loading screen
    colorText("LOADING IMAGES" , canvas.width/2, canvas.height/2, 'black');

    //Function for loading the car, track and wall images when window loads
    loadImages();
}

//Function for starting game once final image has been loaded
function imageLoadingDoneSoStartGame() {
    //Run updateAll function 30 times a second
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);
    //Function for setting up the mouse and keyboard listeners when the window loads
    setupInput();
    //Function for loading the level
    loadLevel(levelOne);
       
}

//Functin for loading the level
function loadLevel(whichLevel) {
    //Note slice would copy parts from one array to another
    trackGrid = whichLevel.slice();
    //Function that draws the car when window loads
    greenCar.reset(otherCarPic, "Green Machine");
    blueCar.reset(carPic, "Blue Storm");
}

//updateAll function
function updateAll() {
    //Have seperated the moving and drawing of objects into two different functions for cleaniness of code
    moveAll();
    drawAll();
}

//moveAll function, deals with car movement on the canvas
function moveAll() {
    //Calling car move function
    greenCar.move();
    blueCar.move();
        
    //Calling car track handling function
    //carTrackHandling(greenCar);
    //carTrackHandling(blueCar);
}

//drawAll function, deals with drawing the canvas, car and other things
function drawAll() {
    //Drawing the tracks
    drawTracks();
    //Drawing the car
    greenCar.draw();
    blueCar.draw();
}