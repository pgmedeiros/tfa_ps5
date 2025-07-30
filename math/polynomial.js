import { pow, multiply, complex, polynomialRoot, sum} from 'mathjs'

export default class Polynomial {

    constructor(...terms) {
        this.terms = terms;
    }

    getComplex(real, imaginary) {
        return complex(real, imaginary);
    }

    getImageOfGivenDomainNumber(terms){
        let acummulator = complex();

        terms.forEach(term => {
            acummulator = sum(acummulator, multiply(pow(term.number, term.degree), term.coeff));
        });

        return acummulator;
    }

    // todo corrigir para ser capaz de ir até n termos, por enquanto só vai até o coeficiente cubico
    getRootOfPolynomial(terms){
        polynomialRoot(terms);
    }


}
