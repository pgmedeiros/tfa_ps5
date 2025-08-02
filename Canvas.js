export default class Canvas {

    constructor(div) {
        this.subs = []
        this.div = div;
    }

    background(p5, color) {
        p5.background(color)
    }

    draw(p5, data) {
        p5.line(data.beforeX, data.beforeY, data.x, data.y);
        p5.point(100, 100);
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify(p5, data) {
        this.update(p5, data);
    }

    update(p5, data) {
        this.subs[0].draw(p5, data);
    }

}
