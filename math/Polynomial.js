export default class Polynomial {

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


}
