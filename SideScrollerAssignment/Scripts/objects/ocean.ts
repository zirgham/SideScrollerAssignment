﻿module objects {
    // OCEAN CLASS
    export class Ocean extends createjs.Bitmap {
        // PUBLIC INSTANCE VARIABLES
        private _dy: number = 5;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("ocean"));

            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x += this._dy;

            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this.x = -1200;
            this.y = 0;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.x === 0) {
                this.reset();
            }
        }

    }

}  