import Polynomial from "./math/polynomial.js";
import Term from "./math/term.js";
import Coordinates from "./identity/Coordinates.js";
import Convert from "./identity/Conversor.js";

// testes polynomial

function testGetComplex() {
    let p = new Polynomial();

    console.log(p.getComplex(1,2));
}

function testGetImageOfGivenDomainNumber() {
    let p = new Polynomial();

    const c1= p.getComplex(0,0);
    const term1 = new Term(0, 0, c1);
    const term2 = new Term(1, 1, c1);

    const v = p.getImageOfGivenDomainNumber([term1, term2]);
    console.log('Deve ser igual a zero: ', v);

    let p2 = new Polynomial();

    const d1= p2.getComplex(2,1);
    const cterm1 = new Term(4, 0, d1);
    const cterm2 = new Term(6, 8, d1);

    const v2 = p.getImageOfGivenDomainNumber([cterm1, cterm2]);

    console.log('Deve ser -3158 - 2016', v2);

}

// Testa conversao de coordenadas para complexos

function testConvertconvertObjectCoordinatesToComplexNumbers() {

    const coordinates = new Coordinates(0, 0);
    let v = new Convert(coordinates);

    console.log('Deve ser 0, 0', v.convertObjectCoordinatesToComplexNumbers(coordinates));

    const coordinates2 = new Coordinates(10, 15);
    let v2 = new Convert(coordinates2);

    console.log('Deve ser 10, 15', v2.convertObjectCoordinatesToComplexNumbers(coordinates2));


}

function testConvertObjectComplexNumbersToCoordinates() {

    let v = new Convert();
    const coordinates = new Coordinates(0, 0);


    console.log('Deve ser 0, 0', v.convertObjectCoordinatesToComplexNumbers(coordinates));

    const coordinates2 = new Coordinates(10, 15);
    let v2 = new Convert(coordinates2);

    console.log('Deve ser 10, 15', v2.convertObjectCoordinatesToComplexNumbers(coordinates2));


}
testGetComplex();
testGetImageOfGivenDomainNumber();
testConvertconvertObjectCoordinatesToComplexNumbers();
testConvertObjectComplexNumbersToCoordinates();