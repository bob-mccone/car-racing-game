//File for dealing with everything to do with the track
//Tracks
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
//Manually drawing our track
var levelOne = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
                1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4];

var trackGrid = [];

//Constants for telling what each number means in our track
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

//Function for checking if track is on the boundary or not
function returnTileTypeAtColRow(col, row) {
    if (col >= 0 && col < TRACK_COLS && 
        row >= 0 && row < TRACK_ROWS) {
            var trackIndexUnderCoord = rowColToArrayIndex(col, row);
            //Draw a brick when the number 1 appears in the array
            return trackGrid[trackIndexUnderCoord];
    } else {
        return TRACK_WALL;
    }
}

//Function for handling car and track collision
function carTrackHandling(whichCar) {
    //Track colums and rows numbers rounded to float
    var carTrackCol = Math.floor(whichCar.x / TRACK_W);
    var carTrackRow = Math.floor(whichCar.y / TRACK_H);
    //Track number in array index
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
    //Making tracks disapear when car hits them and making sure it doesnt delete the track on other side (edge wrap issue)
    if (carTrackCol >= 0 && carTrackCol < TRACK_COLS && 
        carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
            var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);
            
            if (tileHere == TRACK_GOAL) {
                console.log(whichCar.name + " WINS!");
                loadLevel(levelOne);
            }
        //Makes the car bounce off the wall  
            else if (tileHere != TRACK_ROAD) {
                //Stops car from hitting centre of wall and actually bounce off the outside
                whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
                whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
                //making car bounce off walls in half the speed
                whichCar.speed *= -0.5;
            } //End of track found
    } //End of valid col and row
} //End of carTrackHandling function

//Function for drawing the tracks individually
function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

//Function for drawing the tracks
function drawTracks() {

    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    //Have created a for loop for drawing the tracks rather than drawing them individually
    for (var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
        for (var eachCol=0;eachCol<TRACK_COLS; eachCol++) {
            //Makes each track individual rather than an entire column disappearing
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            //General variable for array, stops repeating code
            var tileKindHere = trackGrid[arrayIndex];
            //Variable for images from array
            var useImg = trackPics[tileKindHere];
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            //After this is done we need to reset it outside of this function otherwise it will only draw the top row
            drawTileX += TRACK_W;
            arrayIndex++;
        } //End of for each col
        //We want it to draw it at the end of each row otherwise it wont draw correctly
        drawTileY += TRACK_H;
        //Resetting it back to zero so that it can draw the next line
        drawTileX = 0;
    } //End of for each row    
} //End of drawTracks function