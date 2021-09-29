video="";
status="";
object=[];

function setup(){
    canvas=createCanvas(400,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(390,300);
    video.position(485,248);
}

function draw(){
    image(video,0,0,390,300);
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    if (status !="") {
        objectDetector.detect(video,gotResults);
        for (let i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML="Status : Detecting Object";
            document.getElementById("number_of_object").innerHTML="Number of object detected are : "+object.length;

            fill("#FF0000");
            percent=floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%"+object[i].x+15+object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].height,object[i].width);
        }
}
}

function gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = result;
}

function start(){
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Object";
}

function modelLoaded() {
    console.log("Model Loaded!");
}