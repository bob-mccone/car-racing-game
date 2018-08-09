//File for dealing with everything to do with the car

//Constants for car speed and movement
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;

function carClass() {
    //Car Location
    this.x = 75;
    this.y = 75;
    //Car angle
    this.ang = 0;
    //Car speed
    this.speed = 0;
    //Which picture to use
    this.myCarPic;
    //Name of car
    this.name = "Untitled car";

    //Making keys more like buttons, when we press the key it will make it true 
    //and when we release the key it will turn it back to false again
    //The reason we have put it in here is becuase we have 2 cars and want them to go separatley
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    //Player 2 variables
    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    //Setting up player 2 input
    this.setupInput = function(upKey, rightKey, downKey, leftKey) {
        this.controlKeyUp = upKey;
        this.controlKeyRight = rightKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
    }

    //Car reset function
    this.reset = function(whichImage, carName) {
        this.name = carName;
        this.myCarPic = whichImage;
        //Reset car speed when game resets
        this.speed = 0;
        
        for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
            for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
                var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
                //Putting the car where we put the number 2 in the grid
                if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
                    //Drawing the road
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    //Making the car point in the right direction at the start or resets
                    //Remember this is in raduns
                    this.ang = -Math.PI/2;
                    //Making the car start in the centre of the square
                    this.x = eachCol * TRACK_W + TRACK_W/2;
                    this.y = eachRow * TRACK_H + TRACK_H/2;
                    //Bail
                    return;
                } //End of player start if statement
            } //End of column drawing
        } //End of row drawing
        console.log("NO PLAYER START FOUND!")
    } //End of carReset function

    //Function for dealing with car movement only
    this.move = function() {
        //Making car slow down when buttons are not pressed
        this.speed *= GROUNDSPEED_DECAY_MULT;

        //Speed up car every frame
        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        //Slow down car every frame
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        //Checking to see if car is moving otherwise wont turn
        if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
            //Make car turn left every frame
            if (this.keyHeld_TurnLeft) {
                this.ang -= TURN_RATE;
            }
            //Make car turn right every frame
            if (this.keyHeld_TurnRight) {
                this.ang += TURN_RATE;
            }
        }
        //Everytime the screen is updated it moves the car on an angle
        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        //Removes duplicate code
        carTrackHandling(this);
    }

    //Function for drawing the car
    this.draw = function() {
        //Car pic
        drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
    }
}   