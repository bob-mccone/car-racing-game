//File for dealing with graphics
//Function for making the car rotate
function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    //Saving
    canvasContext.save();
    //Moving the car
    canvasContext.translate(atX, atY);
    //Making the car roate aroung the origin (center)
    canvasContext.rotate(withAng);
    //We are centering the image relative to itself
    canvasContext.drawImage(useBitmap,-useBitmap.width/2,-useBitmap.height/2);
    //We restore which means it forgets any rotating, translate etc since the last save
    canvasContext.restore();
}

//Function for creating a color rectangle or object
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

//Function for creating a color circle or round object
function colorCircle(centerX, centerY, radius, fillColor) {
    //Creating a circle
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

//Function for creating text color visible on the canvas
function colorText(showWords, textX, textY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}