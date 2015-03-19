﻿/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />



/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/plane.ts" />
/// <reference path="objects/island.ts" />
/// <reference path="objects/cloud.ts" />
/// <reference path="objects/ocean.ts" />




// Global game Variables
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;


// Game Objects 
var plane: objects.Plane;
var island: objects.Island
var clouds: objects.Cloud[] = [];
var ocean: objects.Ocean;

var manifest = [
    { id: "cloud", src: "assets/images/cloud.png" },
    { id: "island", src: "assets/images/island.png" },
    { id: "ocean", src: "assets/images/ocean.jpg" },
    { id: "plane", src: "assets/images/spaceship.jpg" },
    { id: "engine", src: "assets/audio/engine.ogg" },
    { id: "yay", src: "assets/audio/yay.ogg" },
    { id: "thunder", src: "assets/audio/thunder.ogg" }
];


function Preload() {
    assetLoader = new createjs.LoadQueue(); // create a new preloader
    assetLoader.installPlugin(createjs.Sound); // need plugin for sounds
    assetLoader.on("complete", init, this); // when assets finished preloading - then init function

    assetLoader.loadManifest(manifest);

}



function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}


// UTILITY METHODS

// DISTANCE CHECKING METHOD
function distance(p1: createjs.Point, p2: createjs.Point): number {
    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
}

// CHECK COLLISION METHOD
function checkCollision(collider: objects.GameObject) {
    var planePosition: createjs.Point = new createjs.Point(plane.x, plane.y);
    var cloudPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
    var theDistance = distance(planePosition, cloudPosition);
    if (theDistance < ((plane.height * 0.5) + (collider.height * 0.5))) {
        if (collider.isColliding != true) {
            createjs.Sound.play(collider.sound);
        }
        collider.isColliding = true;
    } else {
        collider.isColliding = false;
    }
}





function gameLoop() {

    ocean.update();

    island.update();

    plane.update();

    for (var cloud = 2; cloud >= 0; cloud--) {
        clouds[cloud].update();

       checkCollision(clouds[cloud]);
    }

    checkCollision(island);

    stage.update(); // Refreshes our stage
}





// Our Game Kicks off in here
function main() {

    //Ocean object
    ocean = new objects.Ocean();
    stage.addChild(ocean);

    //Island object
    island = new objects.Island();
    stage.addChild(island);


    //Plane object
    plane = new objects.Plane();
    stage.addChild(plane);

    //Cloud object
    for (var cloud = 2; cloud >= 0; cloud--) {
        clouds[cloud] = new objects.Cloud();
        stage.addChild(clouds[cloud]);
    }



    
    

    
}