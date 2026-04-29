let comecarJogo = true;
const BotoesEscolha = document.querySelectorAll('.escolhas button')
const visor = document.querySelector('.visor')

BotoesEscolha.forEach(botao => {
    botao.addEventListener('click', () => {
        const escolha = Number(botao.value)
        Jogo(escolha)
    })
})

function Jogo(escolhaJogador) {
    if (!comecarJogo) return;

    comecarJogo = false
    const escolhaDoBot = Math.floor(Math.random() * 3) + 1;

    const resultado = validarResultados(escolhaJogador, escolhaDoBot)
    gerarElementos(escolhaJogador, escolhaDoBot, resultado)
    reiniciarJogo()
}

function validarResultados(escolhaJogador, escolhaDoBot) {
    const empate = escolhaJogador === escolhaDoBot

    const vitoria =
        escolhaJogador === 1 && escolhaDoBot === 3 ||
        escolhaJogador === 2 && escolhaDoBot === 1 ||
        escolhaJogador === 3 && escolhaDoBot === 2

    let resultado;

    if (vitoria) {
        resultado = 'vitoria'
    }
    else if (empate) {
        resultado = 'empate'
    }
    else {
        resultado = 'derrota'
    }

    return resultado;
}

function reiniciarJogo() {
    const replayBtn = document.querySelector('.botao-jogarDenovo')

    replayBtn.addEventListener('click', () => {
        visor.innerHTML = ''
        comecarJogo = true
    })
}

function gerarElementos(escolhaJogador, escolhaDoBot, resultado) {
    const ImagemJogador = criarElementos('img', 'escolha1')
    const imagemBot = criarElementos('img', 'escolha2')

    switch (escolhaJogador) {
        case 1:
            ImagemJogador.setAttribute("src", "img/pedra.png")
            break;

        case 2:
            ImagemJogador.setAttribute("src", "img/papel.png")
            break;

        case 3:
            ImagemJogador.setAttribute("src", "img/tesoura.png")
            break;
    }

    switch (escolhaDoBot) {
        case 1:
            imagemBot.setAttribute("src", "img/pedra.png")
            break;

        case 2:
            imagemBot.setAttribute("src", "img/papel.png")
            break;

        case 3:
            imagemBot.setAttribute("src", "img/tesoura.png")
            break;
    }

    const Versus = criarElementos('p', 'versus', 'VS')
    const JogarDenovoTxt = criarElementos('p', 'jogar-novamente', 'Deseja jogar novamente?')
    const botaoPlayAgain = criarElementos('button', 'botao-jogarDenovo', '▶')
    const AnunciamentoVencedor = criarElementos('p', 'resultado')

    const Player1 = criarElementos('p', 'player1', 'Você')
    const Player2 = criarElementos('p', 'player2', 'Adversário')

    if (resultado === 'vitoria') {
        AnunciamentoVencedor.textContent = "Vitória!"
    }
    else if (resultado === 'derrota') {
        AnunciamentoVencedor.textContent = "Derrota!"
    }
    else if (resultado === 'empate') {
        AnunciamentoVencedor.textContent = "Empate!"
    }

    ExibirElementos(imagemBot, ImagemJogador, AnunciamentoVencedor, Versus, JogarDenovoTxt, botaoPlayAgain, Player1, Player2)
}

function ExibirElementos(imagemBot, ImagemJogador, anuncio, Versus, JogarDenovoTxt, botaoPlayAgain, Player1, Player2) {

    visor.appendChild(imagemBot)
    visor.appendChild(ImagemJogador)
    visor.appendChild(anuncio)
    visor.appendChild(Versus)
    visor.appendChild(JogarDenovoTxt)
    visor.appendChild(botaoPlayAgain)
    visor.appendChild(Player1)
    visor.appendChild(Player2)
}

function criarElementos(tag, classe = null, texto = null) {
    let elemento = document.createElement(tag)
    if (classe) {
        elemento.classList.add(classe)
    }

    if (texto) {
        elemento.textContent = texto
    }

    return elemento
}