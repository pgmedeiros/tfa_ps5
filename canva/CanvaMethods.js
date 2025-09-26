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
    //p5.circle(0, 0, 100);
}

export function mouse_movement(p5, self, sub, polyy) {
    if (self.canva.div.includes('one')) {
        if(guard(p5)) {
            return;
        }
        if (self.dragged === true && p5.pmouseX !== p5.mouseX && p5.pmouseX !== p5.mouseX) {
            let point = p5.createVector(p5.mouseX, p5.mouseY);
            let img_p = polyy.getImage(p5.mouseX, p5.mouseY, self.poly_user_input);
            let imgPoint = p5.createVector(img_p.x, img_p.y);
            self.current_line.push(point);
            sub[0].current_line.push(imgPoint);
        }
    }
}

export function canva_design(p5, self) {
    p5.stroke(self.slider_line_color_one.value(), self.slider_line_color_two.value(), self.slider_line_color_three.value());
    p5.strokeWeight(self.slider_line_width.value());
    p5.strokeJoin(p5.ROUND);
    p5.noFill();
}

export function create_sliders(p5, self) {
    self.slider_line_color_one = p5.createSlider(0, 255, 255);
    self.slider_line_color_two = p5.createSlider(0, 255, 255);
    self.slider_line_color_three = p5.createSlider(0, 255, 255);
    self.slider_scale = p5.createSlider(5, 20, 10);
    self.slider_line_width = p5.createSlider(1, 5, 3)
}

export function create_polynomial_button(p5, self) {
    if (self.canva.div.includes('one')) {
        self.input = p5.createInput('x');
        self.button = p5.createButton('Enviar');
        self.button.mousePressed(() => {
            self.poly_user_input = self.input.value();
            self.lines = [];
            self.sub.forEach(canva => {
                canva.lines = [];
            })
        });
    }
}

export function create_subs(self) {
    if(self.canva.div.includes('one')) {
        self.sub.forEach(canva => {
            self.canva.addSub(canva);
        })
    }
}

function guard(p5) {
    if (p5.pmouseX < 0 || p5.pmouseX >= p5.width || p5.pmouseY < 0 || p5.pmouseY >= p5.height) {
        return true;
    }
}