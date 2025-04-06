console.log(acertos)
console.log(perdidos)


/* quantidade de acertos */
var acertos;
acertos = 0;

/* quantidade de toupeiras perdidas */
var perdidos = 0;

/* quantidade de marteladas erradas */
var errados = 0;

/* quantidade de marteladas erradas */
var saldo = 0;

/* timer */
var timer = null;

/* verifica se jogo começou */
var gameStart = false;

/* valor inicial CountDown */
var tempoRestante = 30;

onload = function () { /* equivale a window.onload = function () */
    document.getElementById('start-cel').addEventListener('click',start);
    document.getElementById('start-pc').addEventListener('click',start);
    document.getElementById('idGramado').addEventListener('mousedown',marteloBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', marteloCima);
    document.getElementById('idGramado').addEventListener('click',martelada);
    document.getElementById('buraco0').addEventListener('click',martelada);
    document.getElementById('buraco1').addEventListener('click',martelada);
    document.getElementById('buraco2').addEventListener('click',martelada);
    document.getElementById('buraco3').addEventListener('click',martelada);
    document.getElementById('buraco4').addEventListener('click',martelada);
    
}

function start (){
    tempoRestante = 30;
    if (tempoRestante == 30){
        errados = 0;
        acertos = 0;
        perdidos = 0;
    }
    var botao = document.getElementById('start-cel');
    var botao = document.getElementById('start-pc');
    botao.removeEventListener('click',start);
    botao.disable = true;
    gameStart = true;
    sobeToupeira();

    const timerInterval = setInterval(function() {
        
        let minutes = Math.floor(tempoRestante / 60);
        let seconds = tempoRestante % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;  // define valor de seconds -> modo de escrever if-else diferente -> condição ? valor_se_verdadeiro : valor_se_falso;
 
        /* Atualização do display */
        document.getElementById('tempo').textContent = `${minutes}:${seconds}`;
        console.log(`${tempoRestante}`);
        tempoRestante--; /* menos 1 s */

            if (tempoRestante < 0) {
                clearInterval(timerInterval); 
                document.getElementById('tempo').textContent = "Acabou o tempo!"; 
                alert(`Acabou o Tempo! Você fez ${saldo} pontos!`);
                document.getElementById('start-cel').addEventListener('click',start);
                document.getElementById('start-pc').addEventListener('click',start);
                gameStart = false;
            }

        }, 1000);
}

function sobeToupeira(){
       
    console.log("sobeToupeira() foi chamado!"); // Debug

    /* tempo entre cada toupeira sair do buraco */
    var intervalo = Math.floor(Math.random() * (3000 - 4000 + 1)) + 3000;
    var intervalo2 = Math.floor(Math.random() * (3000 - 4000 + 1)) + 3000;
    /* tempo que a toupeira fica fora do buraco */
    var janela = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
    var janela2 = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;

    var buraco = Math.floor(Math.random() * 5);
    var objBuraco = document.getElementById('buraco'+ buraco);
    var buraco2 = Math.floor(Math.random() * 5);
    var objBuraco2 = document.getElementById('buraco'+ buraco2);

    if (buraco != buraco2){
    objBuraco2.src = 'images/hole-mole.png';
    timer2 = setTimeout(tiraToupeira,janela2,buraco2);
    }

    if (gameStart === true){
    objBuraco.src = 'images/hole-mole.png';
    
    timer = setTimeout(tiraToupeira,janela,buraco);
    setTimeout(sobeToupeira,intervalo);
    }
}

function tiraToupeira(buraco){
    var objBuraco = document.getElementById('buraco'+ buraco);
    if (objBuraco.src.includes('hole-mole')){
        perdidos++
        mostraPontuacao();
    }
    objBuraco.src = 'images/hole.png';
    mostraPontuacao();
}


function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    saldo = Math.max(acertos - perdidos - errados, 0)
    mostraPontuacaoDe('saldo', saldo);
    
}

function mostraPontuacaoDe(display,valor) {
/* pega imagens */
let objCentena = document.getElementById(display).firstChild;
let objDezena = objCentena.nextSibling;
let objUnidade = objDezena.nextSibling;

/* calc valor de cada algarismo */
let centena = parseInt(valor/100);
let dezena = parseInt((valor/10)%10);
let unidade = (valor%10);

//muda a imagem e o valor do atributo para o leitor da tela
objCentena.src = 'images/caractere_' + centena + '.gif';
objCentena.alt = centena;
objDezena.src = 'images/caractere_' + dezena + '.gif';
objDezena.alt = dezena;
objUnidade.src = 'images/caractere_' + unidade + '.gif';
objUnidade.alt = unidade;
}

function marteloBaixo(){
    document.getElementById('idGramado').style.cursor = 'url(images/hammerDown.png), default';

}

function marteloCima(){
    document.getElementById('idGramado').style.cursor = 'url(images/hammer.png), default';
    
}

function martelada(evento) {
    evento.stopPropagation();
    if (gameStart === true){
    if (evento.target.tagName === "IMG") {

        if (evento.target.src.includes('hole-mole') && evento.target.src !== 'images/hole.png') {
            acertos++; 
            evento.target.src = 'images/hole.png'; 
            clearTimeout(timer); 
        } else {
            errados++; 
        }
    } else {
        errados++; 
    }

    mostraPontuacao(); 
    }
}

function openForm() {
    document.getElementById('regras').style.display = 'block';
  }
  
  function closeForm() {
    document.getElementById('regras').style.display = 'none';
  }