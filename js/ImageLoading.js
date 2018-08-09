//File for dealing with Images
//Car image variable
var carPic = document.createElement("img");
var otherCarPic = document.createElement("img");
//Array for the track images
var trackPics = [];

//Counter for amount of pics to load, this is done automatically now based on how many images is in the imageList array in the loadImage function
var picsToLoad = 0;

//Function for counting images that have loaded and then start game
function countLoadedImagesAndLaunchIfReady() {
    //When an image loads take 1 off the current number
    picsToLoad--;
    //console.log(picsToLoad);
    //When picsToLoad variable reaches 0, start game
    if (picsToLoad == 0) {
        imageLoadingDoneSoStartGame();
    }
}

//Function for loading our images, removes duplicate code
function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/"+fileName;
}

//Function for loading the track images
function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}

//Function for loading the images, more bulletproof way
function loadImages() {
    //Putting our images in an array list
    var imageList = [
        {varName: carPic, theFile: "player1car.png"},
        {varName: otherCarPic, theFile: "player2car.png"},
        {trackType: TRACK_ROAD, theFile: "track_road.png"},
        {trackType: TRACK_WALL, theFile: "track_wall.png"},
        {trackType: TRACK_GOAL, theFile: "track_goal.png"},
        {trackType: TRACK_TREE, theFile: "track_tree.png"},
        {trackType: TRACK_FLAG, theFile: "track_flag.png"}
        ];
    
    //Making the picsToLoad same number as the length in our list array we created before
    picsToLoad = imageList.length;

    //Running the for loop to count how many images we have in our array and then load our images
    for (var i=0; i<imageList.length; i++) {
        //If the varName does exist, continue
        if (imageList[i].varName != undefined) {
            beginLoadingImage(imageList[i].varName, imageList[i].theFile);
            //Otherwise draw the track images
        } else {
            loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
        }
    }
}