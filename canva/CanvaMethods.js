export function print_line(line, p5) {
    p5.beginShape();
    line.forEach(point => {
        p5.curveVertex(point.x, point.y);
    })
    p5.endShape()
}

export function print_lines(lines, p5) {
    lines.forEach(line => {
        p5.beginShape();
        line.forEach(point => {
            p5.curveVertex(point.x, point.y);
        })
        p5.endShape()
    })
}

export function canva_config(p5, scale) {
    p5.translate(200, 200);
    p5.scale(scale.value() / 10);
    p5.circle(0, 0, 100);
}