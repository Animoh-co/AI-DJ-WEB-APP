leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreofleftwrist = 0;
song = "";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 550);
    canvas.position(550, 200);

    video = createCapture(VIDEO);
    video.hide();

    Posenet = ml5.poseNet(video, modelloaded);
    Posenet.on('pose', posenetresults);

}
function modelloaded(){
console.log("model has been loaded");
}

function posenetresults(results){
    if(results.length>0){
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        scoreofleftwrist = results[0].pose.keypoints[9].score;
        scoreofrightwrist = results[0].pose.keypoints[10].score;
        console.log(leftwristX, leftwristY, rightwristX, rightwristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 550);
fill("blue");
stroke("red");
    if(scoreofleftwrist > 0.2){
        circle(leftwristX, leftwristY, 20);

        leftwrist = Number(leftwristY);
        Noleftwrist = floor(leftwrist);
        volume = Noleftwrist/500;
        song.setVolume(volume);
        document.getElementById("Volume").innerHTML = "Volume = " + volume;
         
    }

    if(scoreofrightwrist>0.2){
        circle(rightwristX, rightwristY, 20);

        if(rightwristY>0 && rightwristY<= 110){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
}
else if(rightwristY>110 && rightwristY<=220){
    document.getElementById("speed").innerHTML = "Speed = 1.0x";
    song.rate(1.0);
}
else if(rightwristY>220 && rightwristY<=330){
    document.getElementById("speed").innerHTML = "Speed = 1.5x";
    song.rate(1.5);
}
else if(rightwristY>330 && rightwristY<=440){
    document.getElementById("speed").innerHTML = "Speed = 2.0x";
    song.rate(2.0);
}
else if(rightwristY>440 && rightwristY<=550){
document.getElementById("speed").innerHTML = "Speed = 2.5x";
song.rate(2.5);
}
    }

}


function play_song(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

