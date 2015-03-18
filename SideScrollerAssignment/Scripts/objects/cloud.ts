module objects {
    // CLOUD CLASS
    export class Cloud extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("cloud");
            this.sound = "thunder";
            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.x -= this._dx;
            this.y -= this._dy;

            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this.x = 640;
            this.y = Math.floor(Math.random() * 480);
            this._dx = Math.floor(Math.random() * 5) + 5;
            this._dy = Math.floor(Math.random() * 4) - 2;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.x <= 0-this.width) {
                this.reset();
            }
        }

    }

}  