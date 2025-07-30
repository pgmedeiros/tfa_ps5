class Core {

    constructor(draw, poly, conversor) {
        this.draw = draw;
        this.poly = poly;
        this.conversor = conversor;
    }

    process(domainObjectCoordinates) {
        const domainObjectComplex = this.conversor.convertObjectCoordinatesToComplexNumbers(domainObjectCoordinates);
        const imageObjectComplex = this.poly.getImageOfGivenDomainNumber(domainObjectComplex);
        const imageObjectCoordinates = this.conversor.convertObjectComplexNumbersToCoordinates(imageObjectComplex);
        this.draw.draw(domainObjectCoordinates, imageObjectCoordinates);
    }
}