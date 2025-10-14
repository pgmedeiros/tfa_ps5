export default class Point {
    constructor(domain_x, domain_y, img_x, img_y, current_img_x, abs_domain_x, abs_domain_y, abs_img_x, abs_img_y) {
        this.domain_x = domain_x;
        this.domain_y = domain_y;

        this.img_x = img_x;
        this.img_y = img_y;

        this.abs_domain_x = abs_domain_x;
        this.abs_domain_y = abs_domain_y;

        this.abs_img_x = abs_img_x;
        this.abs_img_y = abs_img_y;

        this.current_img_x = current_img_x;

        this.current_x = abs_domain_x;
        this.current_y = abs_domain_y;
    }


    new_current() {
        if (this.current_x === this.img_x && this.current_y === this.img_y) {
            return;
        }




    }


}