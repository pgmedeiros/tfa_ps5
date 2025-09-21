export default class Coordinates {
    constructor(x, y) {

        if (x < 200) {
            this.x = (x - 200) / 10;
        } else {
            this.x = (x - 200) / 10;
        }

        if (y < 200) {
            this.y = (200 - y) / 10;
        } else {
            this.y = (200 - y) / 10;
        }

    }

    getCoordinates() {
        return {
            x: this.x,
            y: this.y
        }
    }
}