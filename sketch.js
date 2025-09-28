import CanvasInDiv from "./CanvasInDiv.js";

const elementoTelaCheia = document.getElementById('display');
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



const img = new CanvasInDiv(400, 400, 'two', 0, []); // preto, embaixo
new CanvasInDiv(400, 400, 'one', 100, [img]); // cinza, em cima

