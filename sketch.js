function setup() {
  createCanvas(710, 400);

  background(0);

  strokeWeight(5);

  colorMode(HSB);

}

function mouseDragged() {
  let lineHue = mouseX - mouseY;
  stroke('white');
  stroke(lineHue, 90, 90);
  line(pmouseX, pmouseY, mouseX, mouseY);
}
