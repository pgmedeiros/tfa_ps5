import FreeHandComplexInComplex from "./CanvaWay/FreeHandComplexInComplex.js";

const elementoTelaCheia = document.getElementById('screen');
const botaoToggle = document.getElementById('toggle-fullscreen');
let img = null;
let domain = null;

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

let btn1 = document.getElementById('btn1');
btn1.addEventListener('click', () => {
    console.log("Botão 1 clicado!");
});

let btn2 = document.getElementById('btn2');
btn2.addEventListener('click', () => {
    img = new FreeHandComplexInComplex(400, 400, 'two', 0, []);
    domain = new FreeHandComplexInComplex(400, 400, 'one', 100, [img]); // cinza, em cima
});

let btn3 = document.getElementById('c_em_c_livre');
btn3.addEventListener('click', () => {
    img = new FreeHandComplexInComplex(400, 400, 'two', 0, []);
    domain = new FreeHandComplexInComplex(400, 400, 'one', 100, [img]); // cinza, em cima
});
