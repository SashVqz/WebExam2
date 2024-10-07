const OPCIONES = {
    1: 'uno',
    2: 'dos'
};

let puntuacionJugador1=0;
let puntuacionJugador2=0;
let puntuacionJugador3=0;

function eleccionMaquina() {
    return Math.floor(Math.random()*2)+1;
}

function determinarGanador(eleccionJugador1, eleccionJugador2, eleccionJugador3) {
    if (eleccionJugador1 !== eleccionJugador2 && eleccionJugador1 !== eleccionJugador3) {
        return 'Jugador 1';
    } else if (eleccionJugador2 !== eleccionJugador1 && eleccionJugador2 !== eleccionJugador3) {
        return 'Jugador 2';
    } else if (eleccionJugador3 !== eleccionJugador1 && eleccionJugador3 !== eleccionJugador2) {
        return 'Jugador 3';
    } else {
        return 'Nadie'; 
    }
}

function jugarRonda(eleccionJugador1, eleccionJugador2, eleccionJugador3) {
    const resultado = determinarGanador(eleccionJugador1, eleccionJugador2, eleccionJugador3);

    if (resultado === 'Jugador 1') {
        puntuacionJugador1++;
    }

    if (resultado === 'Jugador 2') {
        puntuacionJugador2++;
    }

    if (resultado === 'Jugador 3') {
        puntuacionJugador3++;
    }

    return resultado;
}

function actualizarInterfaz(resultado, eleccionJugador1, eleccionJugador2, eleccionJugador3) {
    alert(`Ganador: ${resultado}`);
    
    document.getElementById('puntuacionJugador1').textContent = puntuacionJugador1;
    document.getElementById('puntuacionJugador2').textContent = puntuacionJugador2;
    document.getElementById('puntuacionJugador3').textContent = puntuacionJugador3;

    document.getElementById('imgJugador1').src = `./img/${OPCIONES[eleccionJugador1]}.png`;
    document.getElementById('imgJugador1').alt = `${OPCIONES[eleccionJugador1]}`;
    
    document.getElementById('imgJugador2').src = `./img/${OPCIONES[eleccionJugador2]}.png`;
    document.getElementById('imgJugador2').alt = `${OPCIONES[eleccionJugador2]}`;
    
    document.getElementById('imgJugador3').src = `./img/${OPCIONES[eleccionJugador3]}.png`;
    document.getElementById('imgJugador3').alt = `${OPCIONES[eleccionJugador3]}`;
}

let numRondas=1;
let rondasJugadas=0;

function jugar(numJugadores) {
    let eleccionJugador1 = null;
    let eleccionJugador2 = null;
    let eleccionJugador3 = null;

    if (numJugadores === '0') {
        eleccionJugador1 = eleccionMaquina();
        eleccionJugador2 = eleccionMaquina();
        eleccionJugador3 = eleccionMaquina();
    } else if (numJugadores === '1') {
        eleccionJugador1 = eleccionMaquina();
        eleccionJugador2 = eleccionMaquina();
        alert(`Elecciones de los jugadores:\nJugador 1: ${OPCIONES[eleccionJugador1]}\nJugador 2: ${OPCIONES[eleccionJugador2]}`);
        eleccionJugador3 = parseInt(prompt('Elige tu opción: 1, 2'));
    } else if (numJugadores === '2') {
        eleccionJugador1 = parseInt(prompt('Jugador 1, elige tu opcion: 1, 2'));
        eleccionJugador2 = parseInt(prompt('Jugador 2, elige tu opcion: 1, 2'));
        eleccionJugador3 = eleccionMaquina();
    } else if (numJugadores === '3') {
        eleccionJugador1 = parseInt(prompt('Jugador 1, elige tu opcion: 1, 2'));
        eleccionJugador2 = parseInt(prompt('Jugador 2, elige tu opcion: 1, 2'));
        eleccionJugador3 = parseInt(prompt('Jugador 3, elige tu opcion: 1, 2'));
    }

    // const pista = document.createElement('button');
    // pista.textContent = 'pista';
    // pista.addEventListener('click', function () {
    //     alert(`Elecciones de los jugadores:\nJugador 1: ${OPCIONES[eleccionJugador1]}\nJugador 2: ${OPCIONES[eleccionJugador2]}\nJugador 3: ${OPCIONES[eleccionJugador3]}`);
    // });

    // const gameContainer = document.querySelector('.game-container');
    // gameContainer.appendChild(pista);

    if (eleccionJugador1>=1 && eleccionJugador1<=3 && eleccionJugador2>=1 && eleccionJugador2<=3 && eleccionJugador3>=1 && eleccionJugador3<=3) {
        const resultado=jugarRonda(eleccionJugador1, eleccionJugador2, eleccionJugador3);
        actualizarInterfaz(resultado, eleccionJugador1, eleccionJugador2, eleccionJugador3);
        document.getElementById('finalizar').style.display='block';
    } else {
        alert('Por favor elija una opcion');
    }
}

function reiniciarJuego() {
    puntuacionJugador1 = 0;
    puntuacionJugador2 = 0;
    puntuacionJugador3 = 0;

    document.getElementById('puntuacionJugador1').textContent = '0';
    document.getElementById('puntuacionJugador2').textContent = '0';
    document.getElementById('puntuacionJugador3').textContent = '0';

    document.getElementById('imgJugador1').src = `./img/cero.png`;
    document.getElementById('imgJugador2').src = `./img/cero.png`;
    document.getElementById('imgJugador3').src = `./img/cero.png`;
    
    document.getElementById('finalizar').style.display = 'none';
}

document.getElementById('iniciarPartida').addEventListener('click', function () {
    numRondas=parseInt(document.getElementById('numRondas').value);
    rondasJugadas=0;

    function playRoundAndCheck() {
        if (rondasJugadas<numRondas) {
            jugar(document.getElementById('numJugadores').value, numRondas);
            rondasJugadas++;
            setTimeout(playRoundAndCheck, 5000);
        } else {
            document.getElementById('finalizar').style.display = 'block';
        }
    }

    playRoundAndCheck();
});

document.getElementById('finalizar').addEventListener('click', function () {
    reiniciarJuego();
});