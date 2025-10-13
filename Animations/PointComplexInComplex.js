import Canvas from "./Canvas.js";
import {
    canva_config, canva_design,
    create_polynomial_button,
    create_subs, mouse_movement
} from "../canva/CanvaMethods.js";

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
        }

        mouseDragged(self, p5) {
        }

        mouseReleased(self, p5) {
        }

        windowResized(self, p5) {
        }

        touchStarted(self, p5) {
        }

        touchMoved(self, p5) {
        }

        touchEnded(self, p5) {
        }




}