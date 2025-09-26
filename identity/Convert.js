export default class Convert {

    convertObjectCoordinatesToComplexNumbers(coordinates) {
        const cord = coordinates.getCoordinates();
        const realNumber = cord.x;
        const imgNumber = cord.y;

        return Complex(realNumber, imgNumber);
    }

    convertObjectComplexNumbersToCoordinates(complex) {
        let coordX = complex.re;
        let coordY = complex.im;

        return {
            x : coordX,
            y : coordY
        }
    }
}