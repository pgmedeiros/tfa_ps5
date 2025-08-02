import Canvas from "./Canvas.js";

export default class CanvasInDiv {
    constructor (width, height, div, sub, color) {
        const self = this;
        self.canva = null;
        new p5(
                function (p5) {
                    p5.setup = function () {
                        p5.createCanvas(400, 400);
                        self.canva = new Canvas(div);
                        if(div.includes('one')) {
                            self.canva.addSub(sub.canva);
                        }
                        self.canva.background(p5, color);
                    };
                    p5.mouseDragged = function () {
                        let lineHue = p5.mouseX - p5.mouseY;
                        let data = {
                            'beforeX': p5.pmouseX,
                            'beforeY': p5.pmouseY,
                            'x': p5.mouseX,
                            'y': p5.mouseY,
                        }
                        p5.stroke('white');
                        p5.stroke(lineHue, 90, 90);
                        self.canva.draw(p5, data);
                        if(div.includes('one')) {
                            self.canva.notify(p5, data, self);
                        }
                    }
                },
        );
    }

}