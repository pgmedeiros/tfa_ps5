import Canvas from "./Canvas.js";
import Polynomial_ from "./math/Polynomial_.js";
import {
    canva_config,
    canva_design,
    create_sliders,
    mouse_movement,
    print_line,
    print_lines,
    create_polynomial_button, create_subs
} from "./canva/CanvaMethods.js";
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
        self.input = null;
        self.button = null;
        self.polyy = new Polynomial_()
        self.sub = sub;

        this.p5_instance = new p5(
                function (p5) {
                    p5.setup = function () {
                        p5.createCanvas(400, 400);
                        self.canva = new Canvas(div, p5);
                        create_subs(self);
                        self.canva.background(color);
                        create_sliders(p5, self);
                        create_polynomial_button(p5, self);

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