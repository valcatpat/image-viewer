var images = [];

var dropdown = document.getElementById('imageSelection');

dropdown.onchange = function subredditRequest() {
    var selectedValue = imageSelection.value;
    ajaxRequest(selectedValue);
};

var updateImage = function() {
    var div = document.getElementById('slider');
    div.innerHTML = '<img src="' + images[counter] + '" width="auto" height="300px"  />';
};

var ajaxRequest = function (subreddit) {
    images = [];
    $.ajax({
      url: "https://www.reddit.com/r/" + subreddit + ".json"}).done(function(data) {
       for (var i = 0; i < data.data.children.length; i++) {
           var imagePath = data.data.children[i].data.url;
           var splitPath = imagePath.split(".");
           if (["jpg", "gif", "png"].includes(splitPath[splitPath.length - 1])) {
           images.push(imagePath);
           } 
       };
        updateImage();
    });
}

var counter = 0;

var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');
var stopButton = document.getElementById('stop');
var playButton = document.getElementById('start');

nextButton.onclick = function () {
    counter++;
    if (counter >= images.length) {
        counter = 0;
    } 
    updateImage();
};

prevButton.onclick = function () {
    counter--;
    if (counter === -1) {
        counter = images.length - 1;
    }
    updateImage();
};

function changePicture () {
        counter++;
    if (counter >= images.length) {
        counter = 0;
    } 
    updateImage();
}

var timer = function () {
    return setInterval(changePicture, 3000);
};

var timerID;

console.log(timerID);

playButton.onclick = function () {
    timerID = timer();
}

stopButton.onclick = function () { 
    clearInterval(timerID);
    console.log("WHAT THE FUCK");
};