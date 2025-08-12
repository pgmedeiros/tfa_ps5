export default class Canvas {

    constructor(div, p5_instance) {
        this.subs = []
        this.div = div;
        this.p5_instance = p5_instance;
    }

    background(color) {
        this.p5_instance.background(color)
    }

    draw(data) {
        this.p5_instance.line(data.beforeX, data.beforeY, data.x, data.y);
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify(data) {
        this.update(data);
    }

    update(data) {
        this.subs[0].draw(data);
    }

}
