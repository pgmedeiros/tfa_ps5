export default class Point {
    constructor(domain_x, domain_y, img_x, img_y) {
        this.domain_x = domain_x;
        this.domain_y = domain_y;

        this.img_x = img_x;
        this.img_y = img_y;

        this.current_x = domain_x;
        this.current_y = domain_y;
    }


    new_current() {
        if (this.current_x === this.img_x && this.current_y === this.img_y) {
            return;
        }




    }


}