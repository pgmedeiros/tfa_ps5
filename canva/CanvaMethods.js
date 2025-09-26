export function print_line(points, p5) {
    for(let i = 0; i < points.length; i++) {
        let pt = points[i];
        p5.curveVertex(pt.x, pt.y);
    }
}

export function print_lines(lines, p5) {
    for(let i = 0; i < lines.length; i++) {
        p5.beginShape();
        for(let j = 0; j < lines[i].length; j++) {
            let pt = lines[i][j];
            p5.curveVertex(pt.x, pt.y);
        }
        p5.endShape()
    }
}

export function canva_config(p5, scale) {
    p5.translate(200, 200);
    p5.scale(scale.value() / 10);
    p5.circle(0, 0, 100);
}