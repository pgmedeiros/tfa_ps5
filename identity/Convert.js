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

        if (coordY < 0) {
            coordY = 200 + (-coordY);
        } else {
            coordY = 200 - coordY;
        }

        if (coordX < 0) {
            coordX = 200 - (-coordX);
        } else {
            coordX = 200 + (coordX);
        }


        return {
            x : coordX,
            y : coordY
        }
    }
}