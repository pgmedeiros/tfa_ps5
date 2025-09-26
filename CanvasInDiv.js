import Canvas from "./Canvas.js";
import Polynomial_ from "./math/Polynomial_.js";

export default class CanvasInDiv {
    constructor (width, height, div, color, sub) {
        const self = this;
        self.canva = null;
        self.color = color;
        self.points = [];
        self.lines = [];
        self.current_line = [];
        self.dragged = false;
        self.slider_line_color = null;
        self.slider_line_width = null;
        self.slider_scale = null;
        self.poly_user_input = 'x';
        let input = null;
        let button = null;

        this.p5_instance = new p5(
                function (p5) {
                    p5.setup = function () {
                        p5.createCanvas(400, 400);
                        self.canva = new Canvas(div, p5);
                        if(self.canva.div.includes('one')) {
                           self.canva.addSub(sub[0].canva);
                        }
                        self.canva.background(color);
                        self.slider_line_color_one = p5.createSlider(0, 255, 255);
                        self.slider_line_color_two = p5.createSlider(0, 255, 255);
                        self.slider_line_color_three = p5.createSlider(0, 255, 255);
                        p5.textLeading(30);
                        self.slider_scale = p5.createSlider(5, 20, 10);

                        self.slider_line_width = p5.createSlider(1, 5, 3)



                        if (self.canva.div.includes('one')) {
                            input = p5.createInput('x');
                            button = p5.createButton('Enviar');
                            button.mousePressed(() => {
                                self.poly_user_input = input.value();
                                self.canva.background(self.color);
                                sub[0].canva.background(sub[0].color);
                            });
                        }
                    };
                    // entender melhor como essa função funciona.
                    p5.draw = function () {
                        const polyy = new Polynomial_()
                        // dominio
                        self.canva.background(self.color);

                        if (self.canva.div.includes('one')) {
                            p5.translate(200, 200);
                            p5.scale(self.slider_scale.value() / 10);
                            p5.circle(0, 0, 100);
                            if (self.dragged === true && p5.pmouseX !== p5.mouseX && p5.pmouseX !== p5.mouseX) {
                                let point = p5.createVector(p5.mouseX - 200, p5.mouseY - 200);
                                let img_p = polyy.getImage( p5.mouseX - 200, p5.mouseY - 200, self.poly_user_input);
                                let imgPoint = p5.createVector(img_p.x, img_p.y);
                                self.current_line.push(point);
                                sub[0].current_line.push(imgPoint);
                            }
                            p5.stroke(self.slider_line_color_one.value(), self.slider_line_color_two.value(), self.slider_line_color_three.value());
                            p5.strokeWeight(self.slider_line_width.value());
                            p5.strokeJoin(p5.ROUND);
                            p5.noFill();
                            if(self.lines.length !== 0) {
                                for(let i = 0; i < self.lines.length; i++) { // entender melhor o motivo de não poder remover -1
                                    p5.beginShape();
                                        for(let j = 0; j < self.lines[i].length; j++) {
                                            let pt = self.lines[i][j];
                                            p5.curveVertex(pt.x, pt.y);
                                        }
                                    p5.endShape()
                                }
                            }
                            p5.beginShape();
                            for(let i = 0; i < self.current_line.length; i++) {
                                let pt = self.current_line[i];
                                p5.curveVertex(pt.x, pt.y);
                            }
                            p5.endShape()
                        } else {
                            // imagem
                            p5.stroke(self.slider_line_color_one.value(), self.slider_line_color_two.value(), self.slider_line_color_three.value());
                            p5.strokeWeight(self.slider_line_width.value());
                            p5.strokeJoin(p5.ROUND);
                            p5.noFill();
                            p5.beginShape();
                            for(let i = 0; i < self.current_line.length; i++) {
                                let pt = self.current_line[i];
                                p5.curveVertex(pt.x, pt.y);
                            }
                            p5.endShape()

                        }
                    }

                    p5.mouseDragged = function () {
                        self.dragged = true;
                    }

                    p5.mouseReleased = function () {
                        self.dragged = false;
                        self.lines.push(self.current_line);
                        self.current_line = [];
                    }
                }
                ,div);
    }
}