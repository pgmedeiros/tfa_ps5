import CanvasInDiv from "./CanvasInDiv.js";

document.body.style.overflow = 'hidden';

const img = new CanvasInDiv(400, 400, 'two', 0, []); // preto, embaixo


new CanvasInDiv(400, 400, 'one', 100, [img]); // cinza, em cima

