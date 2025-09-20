import Canvas from "./Canvas.js";
import Convert from "./identity/Convert.js";
import Coordinates from "./identity/Coordinates.js";

export default class CanvasInDiv {
    constructor (width, height, div, color, sub) {
        const self = this;
        self.canva = null;
        this.p5_instance = new p5(
                function (p5) {
                    p5.setup = function () {
                        p5.createCanvas(400, 400);
                        self.canva = new Canvas(div, p5);
                        if(div.includes('one')) {
                           self.canva.addSub(sub[0].canva);
                        }
                        self.canva.background(color);
                    };
                    p5.mouseDragged = function (event) {
                        if(event.target === p5.canvas) {
                            let lineHue = p5.mouseX - p5.mouseY;

                            let domainPositionData = {
                                'beforeX': p5.pmouseX,
                                'beforeY': p5.pmouseY,
                                'x': p5.mouseX,
                                'y':  p5.mouseY,
                            }

                            const convert = new Convert();

                            // recebe coordenadas do dominio

                            const domainOriginCoordinates = new Coordinates(domainPositionData.beforeX, domainPositionData.beforeY);
                            const domainActualCoordinates = new Coordinates(domainPositionData.x, domainPositionData.y);

                            // converte essas coordenadas para numeros complexos.
                            const domainOriginComplexNumberOfCoordinates = convert.convertObjectCoordinatesToComplexNumbers(domainOriginCoordinates);
                            const domainActualComplexNumberOfCoordinates = convert.convertObjectCoordinatesToComplexNumbers(domainActualCoordinates);

                            /** constroi polinomio para calcular a imagem
                            const domainOriginPolyFirstTerm = new Term(1, 1, domainOriginComplexNumberOfCoordinates);
                            const domainOriginPolySecondTerm = new Term(1, 1, domainOriginComplexNumberOfCoordinates);
                            const domainActualPolyFirstTerm = new Term(1, 1, domainActualComplexNumberOfCoordinates);
                            const domainActualPolySecondTerm = new Term(1, 1, domainActualComplexNumberOfCoordinates);


                            faz calculo da imagem

                            const imgOriginComplexNumber = new Polynomial_(domainOriginPolyFirstTerm, domainOriginPolySecondTerm).getImageOfGivenDomainNumber();
                            const imgActualComplexNumber = new Polynomial_(domainActualPolyFirstTerm, domainActualPolySecondTerm).getImageOfGivenDomainNumber();

                            */

                            // converter objetos complexos para tipo complexo da lib

                            const TdomainOriginComplexNumberOfCoordinates = new Complex(domainOriginComplexNumberOfCoordinates.re, domainOriginComplexNumberOfCoordinates.im);
                            const TdomainActualComplexNumberOfCoordinates = new Complex(domainActualComplexNumberOfCoordinates.re, domainActualComplexNumberOfCoordinates.im);

                            Polynomial.setField("C");
                            const poly = new Polynomial('x');

                            const imgOriginComplexNumber = poly.eval(TdomainOriginComplexNumberOfCoordinates);
                            const imgActualComplexNumber = poly.eval(TdomainActualComplexNumberOfCoordinates);

                            // converte numeros encontrados para coordenadas
                            const imgOriginCoordinatesOfComplexNumber = convert.convertObjectComplexNumbersToCoordinates(imgOriginComplexNumber);
                            const imgActualCoordinatesOfComplexNumber = convert.convertObjectComplexNumbersToCoordinates(imgActualComplexNumber);

                            // monta objeto para ser printado
                            let imagePositionData = {
                                'beforeX': imgOriginCoordinatesOfComplexNumber.x,
                                'beforeY': imgOriginCoordinatesOfComplexNumber.y,
                                'x': imgActualCoordinatesOfComplexNumber.x,
                                'y': imgActualCoordinatesOfComplexNumber.y
                            }


                            p5.stroke('white');
                            p5.stroke(lineHue, 90, 90);
                            self.canva.draw(domainPositionData);
                            if(div.includes('one')) {
                                self.canva.notify(imagePositionData);
                            }
                        }
                    }
                }
                ,div);
    }

}