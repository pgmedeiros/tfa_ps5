import FreeHandComplexInComplex from "./Animations/FreeHandComplexInComplex.js";
import Canvase from "./Animations/Canvase.js";
import PointComplexInComplex from "./Animations/PointComplexInComplex.js";
import PointRealInReal from "./Animations/PointRealInReal.js";

const elementoTelaCheia = document.getElementById('screen');
const botaoToggle = document.getElementById('toggle-fullscreen');

let canva_domain = null;
let canva_img = null;


const free_hand_complex_to_complex_animation = new FreeHandComplexInComplex();
const point_complex_to_complex_animation = new PointComplexInComplex();
const point_real_to_real_animation = new PointRealInReal();

function create_canva_img() {
    console.log("(1) Iniciando criação do canva domínio");
    return new Promise(resolve => {
        setTimeout(() => {
            const canva_img= new Canvase(400, 400, 'two', 0, [], point_real_to_real_animation);
            console.log("(1) Imagem criada:", canva_img);
            resolve(canva_img);
        }, 1500);
    });
}

function create_canva_domain(img) {
    console.log(`(2) Iniciando criação do dominio`);
    return new Promise(resolve => {
        setTimeout(() => {
            const canva_domain = new Canvase(400, 400, 'one', 100, [img], point_real_to_real_animation);
            console.log("(2) Objeto 2 criado:", canva_domain);
            resolve(canva_domain);
        }, 1000);
    });
}

async function create_everything() {
    console.log("--- PROCESSO INICIADO ---");
    try {
        // 1. ESPERA o Objeto 1 ficar pronto
        canva_img = await create_canva_img();

        // 2. ESTA LINHA SÓ EXECUTA DEPOIS QUE O AWAIT ACIMA TERMINAR
        //    Garantindo que temos o obj1 antes de prosseguir.
        canva_domain = await create_canva_domain(canva_img); // Passa a dependência

        // 3. Tudo pronto!
        console.log("--- PROCESSO CONCLUÍDO ---");
        console.log("Resultado Final (Obj1):", canva_img);
        console.log("Resultado Final (Obj2):", canva_domain);

    } catch (erro) {
        console.error("Ocorreu um erro em uma das etapas:", erro);
    }
}

create_everything();

/**botaoToggle.addEventListener('click', () => {
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
*/
let btn1 = document.getElementById('btn1');
btn1.addEventListener('click', () => {
    canva_domain.domain_stable_points = []
    canva_domain.points = [];
    canva_img.domain_stable_points = []
    canva_img.points = [];
    canva_domain.change_animation(point_real_to_real_animation);
    canva_img.change_animation(point_real_to_real_animation);
});

let btn2 = document.getElementById('c_em_c_ponto');
btn2.addEventListener('click', () => {
    canva_domain.domain_stable_points = []
    canva_domain.points = [];
    canva_img.domain_stable_points = []
    canva_img.points = [];
    canva_domain.change_animation(point_complex_to_complex_animation);
    canva_img.change_animation(point_complex_to_complex_animation);
});

let btn3 = document.getElementById('c_em_c_livre');
btn3.addEventListener('click', () => {
    canva_domain.change_animation(free_hand_complex_to_complex_animation);
    canva_img.change_animation(free_hand_complex_to_complex_animation);
});

/* A "Defesa em Camadas" completa via JavaScript
  para bloquear zoom em todos os dispositivos.
*/

// 1. Bloqueia o "gesturestart" (Específico do Safari/iOS)
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
}, { passive: false });

// 2. Bloqueia o toque com dois dedos (Pinch-to-Zoom genérico)
document.addEventListener('touchstart', function(e) {
    // Se houver mais de um dedo na tela
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// 3. Bloqueia o "toque duplo" (forma alternativa de zoom)
document.addEventListener('dblclick', function(e) {
    e.preventDefault();
}, { passive: false });
