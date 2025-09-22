export default class Coordinates {
    constructor(x, y) {

        if (x < 200) {
            this.x = (x - 200);
        } else {
            this.x = (x - 200);
        }

        if (y < 200) {
            this.y = (200 - y);
        } else {
            this.y = (200 - y);
        }

    }

    getCoordinates() {
        return {
            x: this.x,
            y: this.y
        }
    }
}