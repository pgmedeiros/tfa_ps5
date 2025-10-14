import Point from "./Point.js";

export function print_line(t_x, t_y, line, p5) {
    p5.beginShape();
    line.forEach(point => {
        p5.curveVertex(point.x, point.y);
    })
    p5.endShape()
}

export function print_lines(t_x, t_y, lines, p5) {
    lines.forEach(line => {
        p5.beginShape();
        line.forEach(point => {
            p5.curveVertex(point.x, point.y);
        })
        p5.endShape()
    })
}

export function print_point(p5, self, point) {
    self.points.push(point);
    self.domain_stable_points.push(point);
}

export function print_points(p5, self) {

    if (self.canva.div.includes('one')) {
        self.domain_stable_points.forEach(point => {
            p5.point(point.domain_x, point.domain_y);
        })
    }

    self.points.forEach(point => {
        point.current_x = p5.lerp(point.current_x, point.img_x, 0.05);
        point.current_y = p5.lerp(point.current_y, point.img_y, 0.05);

        if (point.current_x > (400 * get_inverse_of_scale(self.scaleFactor))) {
            let new_point = new Point((-200 * get_inverse_of_scale(self.scaleFactor)), point.current_y, point.img_x - (1000 * get_inverse_of_scale(self.scaleFactor)), point.img_y);

            self.sub.forEach(sub_obj => {
                sub_obj.points.push(new_point);
            })
        }


    })

    self.points = self.points.filter(point => point.current_x < (400 * get_inverse_of_scale(self.scaleFactor)));

    self.points.forEach(point => {
        p5.point(point.current_x, point.current_y);
    })
}

export function canva_config(p5, self) {
    let inverse_of_scale = get_inverse_of_scale(self.scaleFactor);
    p5.scale(self.scaleFactor);
    p5.translate(((self.div_interna.clientWidth / 2) * inverse_of_scale) + self.translate_x, ((self.div_interna.clientHeight / 2) * inverse_of_scale) + self.translate_y);
    p5.circle(0, 0, 100);
}

export function mouse_movement(p5, self, sub, polyy) {
    if (self.canva.div.includes('one')) {
        if(!guard(p5)) {
            return;
        }

        if (self.dragged === true && p5.pmouseX !== p5.mouseX && p5.pmouseX !== p5.mouseX) {
            let position = transform_point(self.scaleFactor, p5.mouseX, p5.mouseY);
            let point = p5.createVector(position.x - self.translate_x, position.y - self.translate_y);
            let img_p = polyy.getImage(position.x,  position.y, self.poly_user_input);
            let imgPoint = p5.createVector(img_p.x, img_p.y);
            self.current_line.push(point);
            sub[0].current_line.push(imgPoint);
        }
    }
}

export function canva_design(p5, self) {
    const inverse_of_scale = get_inverse_of_scale(self.scaleFactor);
    p5.stroke(255, 255, 255);
    p5.strokeWeight(inverse_of_scale * 3);
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
        self.input.parent('one');
        self.input.position(15, 15);

        self.input.style('padding', '0');

        // Remove o espaçamento externo
        self.input.style('margin', '0');

        // Remove a borda (você pode usar 'none' ou '0')
        self.input.style('border', 'none');

        // Opcional: Remove o fundo padrão para que pareça mais com texto puro
        self.button = p5.createButton('Enviar');
        self.button.parent('one');
        self.button.position(150, 15);

        self.button.style('padding', '0');

        // Remove o espaçamento externo
        self.button.style('margin', '0');

        // Remove a borda (você pode usar 'none' ou '0')
        self.button.style('border', 'none');

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

export function guard(p5) {
    if (p5.pmouseX >= 0 && p5.pmouseX <= p5.width && p5.pmouseY >= 0 && p5.pmouseY <= p5.height) {
        return true;
    }
}

export function transform_point(scale, x_position, y_position) {

    const inverse_of_scale = get_inverse_of_scale(scale);

    return {
        x: inverse_of_scale * (x_position - 200),
        y: inverse_of_scale * (y_position - 200)
    }
}

export function get_inverse_of_scale(scale) {
    return 1 / scale;
}

export function scale_and_movement(self, p5) {
    if(p5.touches.length === 2) {
        if(scale_guard(p5)) {
            let inverse_of_scale = get_inverse_of_scale(self.scaleFactor);
            let currentDist = calc_distance_between_to_touches(p5);
            let scaleChange = currentDist / self.prevDist;
            self.scaleFactor *= scaleChange;
            self.prevDist = currentDist;
            //self.translate_x += (p5.touches[0].x - self.touch_begin_x)/80*inverse_of_scale;
            //self.translate_y += (p5.touches[0].y - self.touch_begin_y)/80*inverse_of_scale;
            self.translate_x += p5.movedX;
            self.translate_y += p5.movedY;
        }
    }
    else {
        p5.mouseDragged();
    }
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