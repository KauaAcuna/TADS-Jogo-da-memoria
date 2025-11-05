// Espera carregar completamente o HTML para depois executar o script
document.addEventListener('DOMContentLoaded', function() {
// Função responável por criar carta 
    function criarCarta(simbolo, indice) {
        const carta = document.createElement('div');
        carta.innerHTML = '🎴';
// Aplica o estilo viasual da carta como por exemplo: A borda, a margem entre elas, o alinhamento, etc.        
        carta.style.cssText = `
            float: left;
            font-size: 100px;
            border: 2px dashed black;
            margin: 10px;
            text-align: center;
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        `;
// Adiciona um evento de click que chama a função "virarCarta", tendo como parâmetro a  carta atual e seu índice       
        carta.addEventListener('click', () => virarCarta(carta, indice));
        return carta;
    }
// Vetor com os símbolos das cartas
    let simbolos = ['🎃', '🦇', '🧟', '⚰️'];
// Duplica o vetor de símbolos para formar pares    
    let cartas = simbolos.concat(simbolos);
// Embaralaha as cartas aleatóriamente    
    cartas.sort(() => Math.random() - 0.5);
// Array que guarda as cartas selecionadas na jogada atual
    let jogada = [];
// Seleciona o corpo (body) do documento para adicionar as cartas
    let body = document.querySelector('body');

    cartas.forEach((simbolo, i) => {
        body.appendChild(criarCarta(simbolo, i));
    });
// Função chamada quando clicar em uma carta
    function virarCarta(carta, i) {
// Verifica se a carta ainda está virada para baixo e se ainda tem menos de 2 cartas viradas
        if (carta.innerHTML == '🎴' && jogada.length < 2) {
// Mostra o símbolo real da carta
            carta.innerHTML = cartas[i];
// Armazena o índice da carta virada na jogada atual
            jogada.push(i);
        }
// Quando duas cartas foram viradas, chama a função de verificação
        if (jogada.length == 2) {
            verificarCartas();
        }
    }
// Função para verificação se as cartas são diferentes e colocando um tempo para elas virarem novamente e verificar se formam pares
    function verificarCartas() {
        let divs = document.querySelectorAll('div');
// Caso as duas cartas viradas sejam diferentes
        if (cartas[jogada[0]] != cartas[jogada[1]]) {
            setTimeout(() => {
                divs[jogada[0]].innerHTML = '🎴';
                divs[jogada[1]].innerHTML = '🎴';
// Limpa o array de jogadas para a próxima rodada
                jogada = [];
            }, 1000);
        } else {
// Se as cartas forem iguais (formaram um par) senão apenas limpa o array
            jogada = [];
        }
    }
});
