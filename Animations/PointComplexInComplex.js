import Canvas from "./Canvas.js";
import {
    calc_distance_between_to_touches,
    canva_config,
    canva_design,
    create_polynomial_button,
    create_subs,
    get_inverse_of_scale,
    guard,
    mouse_movement,
    print_point,
    print_points,
    scale_and_movement,
    transform_point
} from "../canva/CanvaMethods.js";
import Point from "../canva/Point.js";

export default class PointComplexInComplex {
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
            print_points(p5, self);
        }

        mouseDragged(self, p5) {
        }

        mouseReleased(self, p5) {
        }

        windowResized(self, p5) {
        }

        touchStarted(self, p5) {
            if(p5.touches.length === 2) {
                self.prevDist = calc_distance_between_to_touches(p5);
                self.touch_begin_x = p5.touches[0].x;
                self.touch_begin_y = p5.touches[0].y;
            }
            if(p5.touches.length === 1) {
                let position = transform_point(self.scaleFactor, p5.mouseX, p5.mouseY);

                if (self.canva.div.includes('one')) {
                    if(!guard(p5)) {
                        return;
                    }

                    const img = self.polyy.getImage(position.x - self.translate_x, position.y - self.translate_y, self.poly_user_input);

                    const point = new Point(position.x - self.translate_x, position.y - self.translate_y, img.x - self.translate_y + (1000 * get_inverse_of_scale(self.scaleFactor)), img.y - self.translate_y);
                    print_point(p5, self, point);
                }
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
        }




}