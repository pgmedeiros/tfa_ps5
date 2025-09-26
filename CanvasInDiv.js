import Canvas from "./Canvas.js";
import Polynomial_ from "./math/Polynomial_.js";
import {canva_config, canva_design, mouse_movement, print_line, print_lines} from "./canva/CanvaMethods.js";
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
        self.polyy = new Polynomial_()

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

                    p5.draw = function () {
                        self.canva.background(self.color);
                        canva_config(p5, self.slider_scale);
                        mouse_movement(p5, self, sub, self.polyy);
                        canva_design(p5, self);
                        print_lines(self.lines, p5);
                        print_line(self.current_line, p5);
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