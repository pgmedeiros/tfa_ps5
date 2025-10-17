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

export function get_circle_points(self, p5){

    if (self.canva.div.includes('one')) {
        self.circle_line = []
        self.sub.forEach(sub_obj => {
            sub_obj.circle_line = [];
        });

        for (let angulo = 0; angulo < 360; angulo += 1) {

            let x = (self.raio) * p5.cos(degreesToRadians(angulo));
            let y = (self.raio) * p5.sin(degreesToRadians(angulo));

            self.circle_line.push(p5.createVector(x, y));


            let img_p = self.polyy.getImage(x, y, self.poly_user_input);
            let imgPoint = p5.createVector(img_p.x, img_p.y);

            self.sub.forEach(sub_obj => {
                sub_obj.circle_line.push(imgPoint);
            });
        }
    }
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

        self.points.forEach(point => {
            point.current_x = p5.lerp(point.current_x, point.current_img_x, 0.01);
            point.current_y = p5.lerp(point.current_y, point.img_y, 0.01);

            if (point.current_x > (p5.width * get_inverse_of_scale(self.scaleFactor))/2) {
                self.sub.forEach(sub_obj => {
                    sub_obj.points.push(new Point(-250 * get_inverse_of_scale(sub_obj.scaleFactor),
                        point.current_y - self.translate_y,
                        point.img_x - self.translate_x,
                        point.img_y - self.translate_y,
                        point.img_x - self.translate_x));
                });

                self.points = self.points.filter(point => point.current_x >= p5.width);

            }



        })


        self.points.forEach(point => {
            p5.point(point.current_x, point.current_y);
        })
    }else {

        self.points.forEach(point => {
            point.current_x = p5.lerp(point.current_x, point.img_x, 0.01);
            point.current_y = p5.lerp(point.current_y, point.img_y, 0.01);

            p5.point(point.current_x, point.current_y);
        })

    }




}

export function canva_config(p5, self) {
    let inverse_of_scale = get_inverse_of_scale(self.scaleFactor);
    p5.scale(self.scaleFactor);
    p5.translate(((self.div_interna.clientWidth / 2) * inverse_of_scale) + self.translate_x, ((self.div_interna.clientHeight / 2) * inverse_of_scale) + self.translate_y);
    //p5.circle(0, 0, 100);
}

export function mouse_movement(p5, self, sub, polyy) {
    if (self.canva.div.includes('one')) {
        if(!guard(p5)) {
            return;
        }

        if (self.dragged === true && p5.pmouseX !== p5.mouseX && p5.pmouseX !== p5.mouseX) {
            let position = convert_absolute_position_to_scaled_position(self, p5);
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

export function convert_absolute_position_to_scaled_position(self, p5) {

    const inverse_of_scale = get_inverse_of_scale(self.scaleFactor);

    return {
        x: inverse_of_scale * (p5.mouseX - (p5.width)/2),
        y: inverse_of_scale * (p5.mouseY - (p5.height)/2)
    }
}

export function convert_scaled_position_to_absolute_position(self, p5, img) {
    const inverse_of_scale = get_inverse_of_scale(self.scaleFactor);

    return {
        x: (img.x + (p5.width)/2) / inverse_of_scale,
        y: (img.y + (p5.height)/2) / inverse_of_scale
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

export function get_deslocation_in_domain(self) {

    if (self.translate_x === self.subs[0].translate_y) {
        return 0;
    }

    if (self.translate_y < 0 && self.subs[0].translate_y > 0) {
        return abs(self.translate_y) + abs(self.subs[0].translate_y)
    }

    if (self.translate_y > 0 && self.subs[0].translate_y < 0) {
        return -(abs(self.translate_y) + abs(self.subs[0].translate_y))
    }

    if (self.translate_y > 0 && self.subs[0].translate_y > 0) {
        if(self.translate_y > self.subs[0].translate_y) {
            return -(abs(self.translate_y) + abs(self.subs[0].translate_y))
        } else {
            return (abs(self.translate_y) + abs(self.subs[0].translate_y))
        }
    }

    if (self.translate_x < 0 && self.translate_y < 0) {
        if(self.translate_x < self.translate_y) {
            return (abs(self.translate_x) + abs(self.translate_y))
        } else {
            return -(abs(self.translate_x) + abs(self.translate_y))
        }
    }



}


function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function get_velocity(self) {
    if (self.velocity_state === -1) {
        return -0.05;
    }else if (self.velocity_state === 0) {
        return 0;
    } else {
        return 0.05;
    }
}