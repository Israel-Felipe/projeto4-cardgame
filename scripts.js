let arraycartas = [];
let imggif=[`img src="img/1.gif"`,
    `img src="img/2.gif"`,
    `img src="img/3.gif"`,
    `img src="img/4.gif"`,
    `img src="img/5.gif"`,
    `img src="img/6.gif"`,
    `img src="img/7.gif"`];
      

function preparaojogo(){

    numerodecartas = prompt("Com quantas cartas você quer jogar: 4, 6, 8, 10, 12 ou 14?");

    /* while pra bloquear criação do jogo enquanto um numero correto não for dado */
    while (numerodecartas > 14 || numerodecartas < 4 || numerodecartas%2 != 0 || numerodecartas == null || numerodecartas == ''){
        alert("Apenas escreva um número par entre 4 e 14");
        numerodecartas = prompt("Com quantas cartas você quer jogar: 4, 6, 8, 10, 12 ou 14?");
    }


    /* adicionando PAR de cartas na array */
    for(let i = 0; i < numerodecartas/2; i++) {
        let cartamodelo = `
        <div class="class-carta sempar" onclick="clicandonascartas(this)">
        
            <div class="fundo">        
                <img src="img/macaco.png"> 
            </div>

            <div class="fundo macaco">
                <${imggif[i]}>
            </div>

        </div>`
        
        arraycartas.push(`${cartamodelo}`,`${cartamodelo}`);
    }

    /* embaralhar as cartas */
    arraycartas.sort(comparador);
    function comparador() { 
        return Math.random() - 0.5; 
    }

    /* adicionar as cartas dentro do jogo */
    cartas = document.querySelector(".conteudo");
    for(i = 0; i < numerodecartas; i++) {
        cartas.innerHTML += arraycartas[i];
    }
}
preparaojogo(); /*chamando a função para iniciar assim que carrega o site*/



/* COLOCANDO AS REGRAS NO JOGO */
let comparacartas = []
let limite = 0;

function clicandonascartas(elemento) {
    
    atras = elemento.querySelector("div:nth-child(1)")
    frente = elemento.querySelector("div:nth-child(2)")
    limite++;
    console.log(limite);

    /* (se a carta ainda estiver virada para baixo */
    if (frente.classList.contains("macaco") && limite<3) { 
            atras.classList.add("imggif-gira")
            frente.classList.remove("macaco")
            encontraropar(elemento);      
    }
}

contador = 0;


cartasNaoViradas = cartas.querySelectorAll(".class-carta.sempar");

function encontraropar(elemento) {
    if(contador==0){
        cronometro()
    }
    

    if(comparacartas.length<2){
        comparacartas.push(elemento.innerHTML);

        if(comparacartas.length == 2 && comparacartas[0] === comparacartas[1]) {
            for(i=0; i<cartasNaoViradas.length; i++) {
                if(cartasNaoViradas[i].innerHTML == comparacartas[0]) {
                    cartasNaoViradas[i].classList.remove("sempar");
                    
                }

                if(cartasNaoViradas.length == 0){
                    stopCount();
                }
            }
            comparacartas=[];
            limite=0;

        } else if(comparacartas.length == 2 && comparacartas[0] !== comparacartas[1]) {
            setTimeout(errou, 1000); 
            comparacartas=[];
        }
    }
    
    cartasNaoViradas = cartas.querySelectorAll(".class-carta.sempar");

    setTimeout(vitoria, 1000);
}

function errou() {
    for(i=0; i<cartasNaoViradas.length; i++) {

        let cartaPraDesvirar = cartasNaoViradas[i];

        macaco = cartaPraDesvirar.querySelector("div:nth-child(1)");
        imggif = cartaPraDesvirar.querySelector("div:nth-child(2)");
        macaco.classList.remove("imggif-gira");
        imggif.classList.add("macaco");
        limite = 0;
    }
}


function vitoria() { 
    if(cartasNaoViradas.length === 0) {
        alert(`Parabéns! Você ganhou em ${contador-1} segundos`);

    // let resposta = prompt("Você quer jogar novamente?")
    // if(resposta == 'sim'){
    //     cartas.innerHTML = ""
    //     contador = 0
    //     contador = 0
    //     let imggif=[`img src="img/unicornparrot.gif" alt="unicornparrot"`,
    //     `img src="img/bobrossparrot.gif" alt="bobrossparrot"`,
    //     `img src="img/explodyparrot.gif" alt="explodyparrot"`,
    //     `img src="img/fiestaparrot.gif" alt="fiestaparrot"`,
    //     `img src="img/metalparrot.gif" alt="metalparrot"`,
    //     `img src="img/revertitparrot.gif" alt="revertitparrot"`,
    //     `img src="img/tripletsparrot.gif" alt="tripletsparrot"`]
    //     setTimeout(preparaojogo, 1000)
    // }else if(resposta == 'não'){Window.close()}
    // else{
    //     resposta = prompt("Você quer jogar novamente? Responda sim ou não")    
    //     }
    }
}

function cronometro() {
    document.querySelector(".cronometro").innerHTML = `Timer: ${contador} s</div>`;
    contador++;
    timeout = setTimeout(cronometro, 1000);
  }

  function stopCount() {
    clearTimeout(timeout);
}