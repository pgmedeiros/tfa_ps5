import CanvasInDiv from "./CanvasInDiv.js";


document.addEventListener('DOMContentLoaded', function() {
    // Tenta bloquear a orientação assim que o conteúdo for carregado
    lockOrientation();
});

function lockOrientation() {
    // Verifica se a API screen.orientation e a função lock estão disponíveis
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(function(error) {
            console.log("Falha ao bloquear a orientação: ", error);
            // Fallback para CSS ou mostrar uma mensagem se o bloqueio falhar
            showRotationMessage();
        });
    } else if (screen.lockOrientation) { // Métodos antigos (legado)
        screen.lockOrientation('landscape');
    } else if (screen.mozLockOrientation) {
        screen.mozLockOrientation('landscape');
    } else if (screen.msLockOrientation) {
        screen.msLockOrientation('landscape');
    }
}

function showRotationMessage() {
    // Se o bloqueio falhar (por exemplo, em alguns navegadores iOS),
    const message = document.createElement('div');
    message.style.position = 'fixed';
    message.style.top = '0';
    message.style.left = '0';
    message.style.width = '100%';
    message.style.height = '100%';
    message.style.backgroundColor = 'rgba(0,0,0,0.8)';
    message.style.color = 'white';
    message.style.display = 'flex';
    message.style.justifyContent = 'center';
    message.style.alignItems = 'center';
    message.style.textAlign = 'center';
    message.style.zIndex = '9999';
    message.innerHTML = '<p>Para a melhor experiência, por favor, gire seu dispositivo para o modo paisagem.</p>';
    document.body.appendChild(message);
}

const img = new CanvasInDiv(400, 400, 'two', 0, []); // preto, embaixo


new CanvasInDiv(400, 400, 'one', 100, [img]); // cinza, em cima

