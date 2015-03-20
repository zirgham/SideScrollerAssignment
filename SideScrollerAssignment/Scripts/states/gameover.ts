﻿/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/island.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/plane.ts" />
/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />

/// <reference path="../objects/scoreboard.ts" />

module states {
    // GAME OVER STATE CLASS
    export class GameOver {
        // Game Objects 
        public game: createjs.Container;
        public ocean: objects.Ocean;
        public gameOverLabel: objects.Label;
        public finalScoreLabel: objects.Label;
        public highScoreLabel: objects.Label;
        public tryAgainButton: objects.Button;
        public tryAgain: boolean = false;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);

            //Game Over Label
            this.gameOverLabel = new objects.Label(320, 40, "GAME OVER");
            this.gameOverLabel.font = "60px Consolas";
            this.gameOverLabel.regX = this.gameOverLabel.getMeasuredWidth() * 0.5;
            this.gameOverLabel.regY = this.gameOverLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.gameOverLabel);

            //Final Score Label
            this.finalScoreLabel = new objects.Label(320, 120,("FINAL SCORE: " + currentScore));
            this.game.addChild(this.finalScoreLabel);

            //High Score Label
            this.highScoreLabel = new objects.Label(320, 200,("HIGH SCORE: " + highScore));
            this.game.addChild(this.highScoreLabel);

            //Try Again Button
            this.tryAgainButton = new objects.Button(320, 280, "tryAgainButton");
            this.tryAgainButton.on("click", this.tryAgainClicked, this);

            this.game.addChild(this.tryAgainButton);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

        public tryAgainClicked() {
            this.tryAgain = true;
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public update() {

            this.ocean.update();

            if (this.tryAgain) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

    } // Game Over Class


} // States Module