export default class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getCoordinates() {
        return {
            x: this.x,
            y: this.y
        }
    }
}