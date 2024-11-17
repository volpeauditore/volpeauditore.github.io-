const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector('#lives'),
    },

    values:{
        timerId: null,
        countDowntimerid: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPositivo: 0,
        result:0,
        currentTime: 60,
        liveremaining: 3,
    },
}

function countDown() {
    state.values.currentTime -- ;
    state.view.timeleft.textContent = state.values.currentTime;

    if (state.values.currentTime < 0){
        clearInterval(state.values.countDowntimerid);
        clearInterval(state.values.timerId);
        alert ("Fim de jogo, resultado é:" + state.values.result)
        playsound ("gameover")
    }
}

function randomsquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomnumber = Math.floor(Math.random() * 9);
    let randomsquare = state.view.squares[randomnumber];
    randomsquare.classList.add("enemy");
    state.values.hitPositivo = randomsquare.id;
};

function playsound(audioname) {
    let audio = new Audio (`./src/sounds/${audioname}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

function moveEnemy (){
    state.values.timerId = setInterval(randomsquare, state.values.gameVelocity)
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPositivo){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPositivo = null;
                playsound('hit');
            } else {
                decreaseLife();
            }
        });
    });l
}

function decreaseLife(){
    state.values.liveremaining --;
    state.view.lifes.textContent = state.values.liveremaining;
    playsound('decreaselive');

    if (state.values.liveremaining <= 0){
        clearInterval (state.values.countDowntimerid);
        clearInterval (state.values.timerId);

        alert("Você perdeu suas vidas, seu resultado foi:" + state.values.result);
        playsound("gameover");
    }
}

function initialize (){
    moveEnemy();
    addListenerHitbox();
    playsound('soundtrack');
}



initialize();