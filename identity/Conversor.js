import Coordinates from "./Coordinates.js";

export default class Convert {

    convertObjectCoordinatesToComplexNumbers(coordinates) {
        const cord = coordinates.getCoordinates();
        const realNumber = cord.x;
        const imgNumber = cord.y;

        return math.complex(realNumber, imgNumber);
    }

    convertObjectComplexNumbersToCoordinates(complex) {
        const coordX = complex.x;
        const coordY = complex.y;

        return Coordinates(coordX, coordY);
    }
}