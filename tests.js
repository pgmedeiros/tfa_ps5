import Polynomial from "./polynomial.js";
import Term from "./term.js";

// testes polynomial

function testGetComplex() {
    let p = new Polynomial();

    console.log(p.getComplex(1,2));
}

function testgetImageOfGivenDomainNumber() {
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

testGetComplex();
testgetImageOfGivenDomainNumber();