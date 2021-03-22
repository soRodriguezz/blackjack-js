let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias de HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
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
    //NOTE: El substring() método devuelve un subconjunto de un objeto String.
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

// Turno computadora
const turnoComputadora = ( puntosMinimos ) => {

    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ) break;

    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos < 21 ) );

    setTimeout( () => {
        if ( puntosComputadora === puntosMinimos ) {
            alert('¡Nadie gana!');
        } else if ( puntosMinimos > 21 ) {
            alert('¡La computadora gana!');
        } else if ( puntosComputadora > 21 ){
            alert('¡Ganaste!');
        } else if (puntosMinimos === 21) {
            alert('¡Ganaste!');
        }else {
            alert('¡La computadora gana!');
        }
    }, 10);

}

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
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }else if ( puntosJugador === 21 ) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
});

btnNuevo.addEventListener('click', () => {
    
    console.clear();
    deck = [];
    deck = crearDeck();
    
    
    puntosComputadora = 0;
    puntosJugador = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = ''
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});