import Convert from "../identity/Convert.js";
import Coordinates from "../identity/Coordinates.js";

export default class Polynomial_ {

    constructor(...terms) {
        this.terms = terms;
    }

    getComplex(real, imaginary) {
        return math.complex(real, imaginary);
    }

    getImageOfGivenDomainNumber(terms){
        let acummulator = math.complex();

        this.terms.forEach(term => {
            acummulator = math.sum(acummulator, math.multiply(math.pow(term.number, term.degree), term.coeff));
        });

        return acummulator;
    }

    // todo corrigir para ser capaz de ir até n termos, por enquanto só vai até o coeficiente cubico
    getRootOfPolynomial(terms){
        polynomialRoot(terms);
    }

    getImage(x, y, poly_expression) {

        const convert = new Convert();

        // recebe coordenadas do dominio


        let domainOriginCoordinates = new Coordinates(x, y);

        // converte essas coordenadas para numeros complexos.
        const domainOriginComplexNumberOfCoordinates = convert.convertObjectCoordinatesToComplexNumbers(domainOriginCoordinates);


        // converter objetos complexos para tipo complexo da lib

        const TdomainOriginComplexNumberOfCoordinates = new Complex(domainOriginComplexNumberOfCoordinates.re, domainOriginComplexNumberOfCoordinates.im);

        Polynomial.setField("C");
        const poly = new Polynomial(poly_expression);

        const imgOriginComplexNumber = poly.eval(TdomainOriginComplexNumberOfCoordinates);

        // converte numeros encontrados para coordenadas
        const imgOriginCoordinatesOfComplexNumber = convert.convertObjectComplexNumbersToCoordinates(imgOriginComplexNumber);

        // monta objeto para ser printado
        return {
            'x': imgOriginCoordinatesOfComplexNumber.x,
            'y': imgOriginCoordinatesOfComplexNumber.y,
        };
    }
}
