import Canvas from "./Canvas.js";
import Polynomial_ from "./math/Polynomial_.js";

export default class CanvasInDiv {
    constructor (width, height, div, color, sub) {
        const self = this;
        self.canva = null;
        self.points = [];
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
                    // entender melhor como essa função funciona.
                    p5.draw = function () {
                        const polyy = new Polynomial_()
                        // dominio
                        if (div.includes('one')) {
                            if (p5.pmouseX !== p5.mouseX && p5.pmouseX !== p5.mouseX) {
                                let point = p5.createVector(p5.mouseX, p5.mouseY);
                                let img_p = polyy.getImage(p5.mouseX, p5.mouseY);
                                let imgPoint = p5.createVector(img_p.x, img_p.y);
                                self.points.push(point);
                                sub[0].points.push(imgPoint);
                            }
                            p5.stroke(255);
                            p5.strokeWeight(5);
                            p5.strokeJoin(p5.ROUND);
                            p5.noFill();
                            p5.beginShape();
                            for(let i = 0; i < self.points.length; i++) {
                                let pt = self.points[i];
                                p5.curveVertex(pt.x, pt.y);
                            }
                            p5.endShape()
                        } else {
                            // imagem
                            p5.stroke(255);
                            p5.strokeWeight(5);
                            p5.strokeJoin(p5.ROUND);
                            p5.noFill();
                            p5.beginShape();
                            for(let i = 0; i < self.points.length; i++) {
                                let pt = self.points[i];
                                p5.curveVertex(pt.x, pt.y);
                            }
                            p5.endShape()

                        }
                    }
                }
                ,div);
    }

}