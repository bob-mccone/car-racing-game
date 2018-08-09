//File for dealing with everything to do with user input
//Arrow keys
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

//WASD keys
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

//Mouse positions
var mouseX = 0;
var mouseY = 0;

//Function for mouse and key input listeners
function setupInput() {
    //Listener for mouse over the canvas
    canvas.addEventListener('mousemove', updateMousePos);
    //Listener for when key is pressed down
    document.addEventListener('keydown', keyPressed);
    //Listener for when key is released
    document.addEventListener('keyup', keyReleased);
    //Input for green car
    greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
    //Input for blue car
    blueCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

//Function for dealing with mouse movement
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    //Scrolling mouse left to right and vice versa
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
    
    //Cheating to place the car anywhere we want using the mouse
    /*carX = mouseX;
    carY = mouseY;
    carSpeedX = 4;
    carSpeedY = -4;*/
}

//Helper reduces code
function keySet(keyEvent, whichCar, setTo) {
    //Making the car turn left
    if (keyEvent.keyCode == whichCar.controlKeyLeft) {
        whichCar.keyHeld_TurnLeft = setTo;
    }
    //Making car turn right
    if (keyEvent.keyCode == whichCar.controlKeyRight) {
        whichCar.keyHeld_TurnRight = setTo;
    }
    //Making car speed up
    if (keyEvent.keyCode == whichCar.controlKeyUp) {
        whichCar.keyHeld_Gas = setTo;
    }
    //Making car slow down/brake
    if (keyEvent.keyCode == whichCar.controlKeyDown) {
        whichCar.keyHeld_Reverse = setTo;
    }
}

//Function for when the key is pressed
function keyPressed(evt) {
    //console.log("Key pressed: "+evt.keyCode);
    //Makes car move
    keySet(evt, greenCar, true);
    keySet(evt, blueCar, true);
    //Stops the screen from scrolling when pressing the arrow keys
    evt.preventDefault();
}

//Function for when the key is released
function keyReleased(evt) {
    //console.log("Key released: "+evt.keyCode);
    //Stops car from moving
    keySet(evt, greenCar, false);
    keySet(evt, blueCar, false);
}