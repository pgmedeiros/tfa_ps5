import Canvas from "./Canvas.js";
import {
    canva_config, canva_design,
    create_polynomial_button,
    create_subs, guard, mouse_movement, print_point, print_points, transform_point
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
            mouse_movement(p5, self, self.sub, self.polyy);
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
            let position = transform_point(self.scaleFactor, p5.mouseX, p5.mouseY);

            if (self.canva.div.includes('one')) {
                if(!guard(p5)) {
                    return;
                }

                const img = self.polyy.getImage(position.x - self.translate_x, position.y - self.translate_y, self.poly_user_input);

                const point = new Point(position.x - self.translate_x, position.y - self.translate_y, img.x - self.translate_y + 1000, img.y - self.translate_y);
                print_point(p5, self, point);
            }
        }

        touchMoved(self, p5) {
        }

        touchEnded(self, p5) {
        }




}