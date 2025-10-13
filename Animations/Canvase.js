import Polynomial_ from "../math/Polynomial_.js";

export default class Canvase {
    constructor (width, height, div, color, sub, animation) {
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
        self.div = div;
        self.scaleFactor = 1.0;
        self.translate_x = 0;
        self.translate_y = 0;
        self.touch_begin_x = 0;
        self.touch_begin_y = 0;
        self.prevDist = 0;
        self.animation = animation

        this.p5_instance = new p5(
                function (p5, animation) {
                    p5.setup = function () {
                        self.animation.setup(self, p5);
                    };

                    p5.draw = function () {
                        self.animation.draw(self, p5);
                    }

                    p5.mouseDragged = function () {
                        self.animation.mouseDragged(self, p5);
                    }

                    p5.mouseReleased = function () {
                        self.animation.mouseReleased(self, p5);
                    }

                    p5.windowResized = function () {
                        self.animation.windowResized(self, p5)
                    }

                    p5.touchStarted = function () {
                        self.animation.touchStarted(self, p5);
                    }

                    p5.touchMoved = function() {
                        self.animation.touchMoved(self, p5);
                    }

                    p5.touchEnded = function() {
                        self.animation.touchEnded(self, p5);
                    }
                }
                ,div);
    }

    change_animation(animation) {
        this.animation = animation;
    }
}
