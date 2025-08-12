import Canvas from "./Canvas.js";

export default class CanvasInDiv {
    constructor (width, height, div, color, sub) {
        const self = this;
        self.canva = null;
        this.p5_instance = new p5(
                function (p5) {
                    p5.setup = function () {
                        p5.createCanvas(400, 400);
                        self.canva = new Canvas(div, p5);
                        if(div.includes('one')) {
                           self.canva.addSub(sub[0].canva);
                        }
                        self.canva.background(color);
                    };
                    p5.mouseDragged = function (event) {
                        if(event.target === p5.canvas) {
                            let lineHue = p5.mouseX - p5.mouseY;
                            let data = {
                                'beforeX': p5.pmouseX,
                                'beforeY': p5.pmouseY,
                                'x': p5.mouseX,
                                'y': p5.mouseY,
                            }
                            p5.stroke('white');
                            p5.stroke(lineHue, 90, 90);
                            self.canva.draw(data);
                            if(div.includes('one')) {
                                self.canva.notify(data);
                            }
                        }
                    }
                }
                ,div);
    }

}