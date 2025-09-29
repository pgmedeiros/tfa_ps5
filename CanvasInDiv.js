import Canvas from "./Canvas.js";
import Polynomial_ from "./math/Polynomial_.js";
import {
    canva_config,
    canva_design,
    create_sliders,
    mouse_movement,
    print_line,
    print_lines,
    create_polynomial_button,
    create_subs,
    calc_distance_between_to_touches
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
        self.div_interna = null;
        self.scaleFactor = 1.0;
        self.prevDist = 0;

        this.p5_instance = new p5(
                function (p5) {
                    p5.setup = function () {
                        self.div_interna = document.getElementById(div);
                        console.log(self.div_interna.clientWidth, self.div_interna.clientHeight, div);
                        console.log(p5.windowWidth, p5.windowHeight)
                        let canva = p5.createCanvas(self.div_interna.clientWidth, self.div_interna.clientHeight);
                        canva.parent(div);
                        self.canva = new Canvas(div, p5);
                        create_subs(self);
                        self.canva.background(color);
                        create_sliders(p5, self);
                        create_polynomial_button(p5, self);

                    };

                    p5.draw = function () {
                        self.canva.background(self.color);
                        canva_config(p5, self.scaleFactor);
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

                    p5.windowResized = function () {
                        p5.resizeCanvas(self.div_interna.clientWidth, self.div_interna.clientHeight);
                    }

                    p5.touchStarted = function () {
                        if(p5.touches.length === 2) {
                            self.prevDist = calc_distance_between_to_touches(p5);
                        }

                    }

                    p5.touchMoved = function() {
                        if(p5.touches.length === 2) {
                            let currentDist = calc_distance_between_to_touches(p5);
                            let scaleChange = currentDist / self.prevDist;
                            self.scaleFactor *= scaleChange;
                            self.prevDist = currentDist;
                        } else {
                            p5.mouseDragged();
                        }

                        return false;
                    }

                    p5.touchEnded = function() {
                        if (p5.touches.length < 2) {
                            self.prevDist = 0;
                        }
                    }
                }
                ,div);
    }
}
