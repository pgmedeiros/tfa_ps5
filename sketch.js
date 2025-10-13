import FreeHandComplexInComplex from "./Animations/FreeHandComplexInComplex.js";
import Canvase from "./Animations/Canvase.js";
import Canvas from "./Animations/Canvas.js";
import PointComplexInComplex from "./Animations/PointComplexInComplex.js";
import PointRealInReal from "./Animations/PointRealInReal.js";

const elementoTelaCheia = document.getElementById('screen');
const botaoToggle = document.getElementById('toggle-fullscreen');

botaoToggle.addEventListener('click', () => {
    // Verifica se já estamos em modo tela cheia
    if (!document.fullscreenElement) {
        // Se não estiver, solicita a tela cheia para o elemento
        elementoTelaCheia.requestFullscreen()
            .then(() => console.log('Modo de tela cheia ativado com sucesso.'))
            .catch(err => {
                console.error(`Erro ao tentar ativar a tela cheia: ${err.message} (${err.name})`);
            });
    } else {
        // Se já estiver, sai da tela cheia
        document.exitFullscreen()
            .then(() => console.log('Modo de tela cheia desativado.'))
            .catch(err => {
                console.error(`Erro ao tentar desativar a tela cheia: ${err.message} (${err.name})`);
            });
    }
});

const free_hand_complex_to_complex_animation = new FreeHandComplexInComplex();
const point_complex_to_complex_animation = new PointComplexInComplex();
const point_real_to_real_animation = new PointRealInReal();


const canva_img = new Canvase(400, 400, 'two', 0, [], point_real_to_real_animation);
const canvase = new Canvase(400, 400, 'one', 100, [canva_img], point_real_to_real_animation);


let btn1 = document.getElementById('btn1');
btn1.addEventListener('click', () => {
    canvase.domain_stable_points = []
    canvase.points = [];
    canva_img.domain_stable_points = []
    canva_img.points = [];
    canvase.change_animation(point_real_to_real_animation);
    canva_img.change_animation(point_real_to_real_animation);
});

let btn2 = document.getElementById('c_em_c_ponto');
btn2.addEventListener('click', () => {
    canvase.domain_stable_points = []
    canvase.points = [];
    canva_img.domain_stable_points = []
    canva_img.points = [];
    canvase.change_animation(point_complex_to_complex_animation);
    canva_img.change_animation(point_complex_to_complex_animation);
});

let btn3 = document.getElementById('c_em_c_livre');
btn3.addEventListener('click', () => {
    canvase.change_animation(free_hand_complex_to_complex_animation);
    canva_img.change_animation(free_hand_complex_to_complex_animation);
});
