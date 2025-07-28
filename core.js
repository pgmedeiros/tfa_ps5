// todo funcoes devem ser capazes de lidar com número variavel de pontos

function process(domainObjectCoordinates) {
    const imageObjectCoordinates = getImageObjectCoordinates(domainObjectCoordinates);
    draw(domainObjectCoordinates, imageObjectCoordinates);
}

function getImageObjectCoordinates(domainObjectCoordinates) {
    const domainObjectComplex = convertObjectCoordinatesToComplexNumbers(domainObjectCoordinates);
    const imageObjectComplex = findImagesOfObject(domainObjectComplex);
    return convertObjectComplexNumbersToCoordinates(imageObjectComplex);
}
function convertObjectCoordinatesToComplexNumbers(point) {

    // todo
}

function convertObjectComplexNumbersToCoordinates(complex) {
    // todo
}

function findImagesOfObject(coefficient) {
    // todo
}

function draw(objects) {
    // todo
}
