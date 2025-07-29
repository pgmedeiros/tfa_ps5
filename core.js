class core {

    constructor(impl) {
        this.impl = impl;
    }

    process(domainObjectCoordinates) {
        const domainObjectComplex = this.impl.convertObjectCoordinatesToComplexNumbers(domainObjectCoordinates);
        const imageObjectComplex = this.impl.findImagesOfObject(domainObjectComplex);
        const imageObjectCoordinates = this.impl.convertObjectComplexNumbersToCoordinates(imageObjectComplex);
        this.impl.draw(domainObjectCoordinates, imageObjectCoordinates);
    }
}

