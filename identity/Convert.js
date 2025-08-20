export default class Convert {

    convertObjectCoordinatesToComplexNumbers(coordinates) {
        const cord = coordinates.getCoordinates();
        const realNumber = cord.x;
        const imgNumber = cord.y;

        return math.complex(realNumber, imgNumber);
    }

    convertObjectComplexNumbersToCoordinates(complex) {
        const coordX = complex.re;
        const coordY = complex.im;

        return {
            x : coordX,
            y : coordY
        }
    }
}