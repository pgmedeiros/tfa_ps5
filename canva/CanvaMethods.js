const SCALE_CORRECT = 1000;

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

export function canva_config(p5, self) {
    let inverse_of_scale = get_inverse_of_scale(self.scaleFactor);
    p5.scale(self.scaleFactor);
    p5.translate((self.div_interna.clientWidth / 2) * inverse_of_scale, (self.div_interna.clientHeight / 2) * inverse_of_scale);
    p5.circle(0, 0, 100);
}

export function mouse_movement(p5, self, sub, polyy) {
    if (self.canva.div.includes('one')) {
        if(!guard(p5)) {
            return;
        }

        if (self.dragged === true && p5.pmouseX !== p5.mouseX && p5.pmouseX !== p5.mouseX) {
            let position = transform_point(self.scaleFactor, p5.mouseX, p5.mouseY);
            let point = p5.createVector(position.x, position.y);
            let img_p = polyy.getImage(position.x,  position.y, self.poly_user_input);
            let imgPoint = p5.createVector(img_p.x, img_p.y);
            self.current_line.push(point);
            sub[0].current_line.push(imgPoint);
        }
    }
}

export function canva_design(p5, self) {
    const inverse_of_scale = get_inverse_of_scale(self.scaleFactor);
    p5.stroke(self.slider_line_color_one.value(), self.slider_line_color_two.value(), self.slider_line_color_three.value());
    p5.strokeWeight(inverse_of_scale * self.slider_line_width.value());
    p5.strokeJoin(p5.ROUND);
    p5.noFill();
}

export function create_sliders(p5, self) {

    let p = self.div_interna.getBoundingClientRect()

    self.slider_line_color_one = p5.createSlider(0, 255, 255);
    self.slider_line_color_one.position(p.x, p.bottom - 10);

    self.slider_line_color_two = p5.createSlider(0, 255, 255);
    self.slider_line_color_two.position(p.x, p.bottom - 20);

    self.slider_line_color_three = p5.createSlider(0, 255, 255);
    self.slider_line_color_three.position(p.x, p.bottom - 30);

    self.slider_scale = p5.createSlider(1, 50000, 1000);
    self.slider_scale.position(p.x, p.bottom - 40);

    self.slider_line_width = p5.createSlider(1, 5, 3)
    self.slider_line_width.position(p.x, p.bottom - 50);
}

export function create_polynomial_button(p5, self) {
    let p = self.div_interna.getBoundingClientRect();

    if (self.canva.div.includes('one')) {
        self.input = p5.createInput('x');
        self.input.position(p.x, p.bottom - 60);
        self.button = p5.createButton('Enviar');
        self.button.position(p.x + 150, p.bottom - 60);
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
    if (p5.pmouseX >= 0 && p5.pmouseX <= p5.width && p5.pmouseY >= 0 && p5.pmouseY <= p5.height) {
        return true;
    }
}

function transform_point(scale, x_position, y_position) {

    const inverse_of_scale = get_inverse_of_scale(scale);

    return {
        x: inverse_of_scale * (x_position - 200),
        y: inverse_of_scale * (y_position - 200)
    }
}

function get_inverse_of_scale(scale) {
    return 1 / scale;
}


export function scale_guard(p5) {
    return p5.touches[0].x >= 0 && p5.touches[0].x <= p5.width
        && p5.touches[0].y >= 0 && p5.touches[0].y <= p5.height
        && p5.touches[1].x >= 0 && p5.touches[1].x <= p5.width
        && p5.touches[1].y >= 0 && p5.touches[1].y <= p5.height
}

export function calc_distance_between_to_touches(p5) {
    return p5.dist(p5.touches[0].x, p5.touches[0].y, p5.touches[1].x, p5.touches[1].y);

}