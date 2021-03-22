let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias de HTML
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugador = document.querySelector('#jugador-cartas');
const puntosHTML = document.querySelectorAll('small');

//ANCHOR: Creacion deck
const crearDeck = () => {
    for(let i = 2; i <= 10; i++) {
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for( let tipo of tipos ){
        for(let especial of especiales){
            deck.push(especial + tipo);
        }
    }
    
    deck = _.shuffle(deck);
    //console.log(deck);
    return deck;
}

crearDeck();

//ANCHOR: Tomar una carta
const pedirCarta = () => {

    if(deck.length === 0) throw 'No hay cartas en el deck';
    
    //NOTE: borro una carta y la retorno
    const carta = deck.pop();

    //console.log(deck);
    //console.log(carta);
    return carta;

}
// pedirCarta();

//ANCHOR: Valor carta
const valorCarta = ( carta ) => {
    
    //NOTE: corto el string desde la posicioin 0 a el penultimo.
    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN( valor )) ? 
        ( valor === 'A' ) ? 11 : 10
    : valor * 1;

    // //NOTE: evalua si es un numero o no
    // if(isNaN( valor )) {
    //     puntos = ( valor === 'A' ) ? 11 : 10;
    // } else {
    //     //NOTE: para convertir un string a un numero.
    //     puntos = valor  * 1;
    // }
    //console.log( puntos );

}
// const valor = valorCarta( pedirCarta() );
// console.log({ valor });

// Eventos
//NOTE: funcion que se manda como argumento es conocido como callback
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

//ANCHOR: sumar puntos del jugador
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

//ANCHOR: crear imagen por cada carta que robe. 
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
    }else if ( puntosJugador === 21 ) {
        console.warn('21, genial');
        btnPedir.disabled = true;
    }
});