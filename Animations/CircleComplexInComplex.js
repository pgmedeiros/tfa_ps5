import Canvas from "./Canvas.js";
import {
    calc_distance_between_to_touches,
    canva_config,
    canva_design,
    create_polynomial_button,
    create_subs, get_circle_points, get_velocity,
    print_line, scale_and_movement
} from "../canva/CanvaMethods.js";

export default class CircleComplexInComplex {
    setup(self, p5) {
        self.div_interna = document.getElementById(self.div);
        let canva = p5.createCanvas(self.div_interna.clientWidth, self.div_interna.clientHeight);
        canva.parent(self.div);
        self.canva = new Canvas(self.div, p5, canva);
        create_subs(self);
        self.canva.background(self.color);
        create_polynomial_button(p5, self);
    };

    draw(self, p5){
        self.canva.background(self.color);
        canva_config(p5, self);
        canva_design(p5, self);
        get_circle_points(self, p5);
        print_line(self.translate_x, self.translate_y, self.circle_line, p5);
        self.raio = get_velocity(self) + self.raio;
    }

    mouseDragged(self, p5) {
        self.dragged = true;
    }

    mouseReleased(self, p5) {
        self.dragged = false;
        self.lines.push(self.current_line);
        self.current_line = [];
    }

    windowResized(self, p5) {
        p5.resizeCanvas(self.div_interna.clientWidth, self.div_interna.clientHeight);
    }

    touchStarted(self, p5) {
        if(p5.touches.length === 2) {
            self.prevDist = calc_distance_between_to_touches(p5);
            self.touch_begin_x = p5.touches[0].x;
            self.touch_begin_y = p5.touches[0].y;
        }
    }

    touchMoved(self, p5) {

        scale_and_movement(self, p5);

        return false;
    }

    touchEnded(self, p5) {
        if (p5.touches.length < 2) {
            self.prevDist = 0;
        }

        p5.mouseReleased();
    }
}