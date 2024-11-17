const emojis = [
    "🙉", "🙉",
    "🙊", "🙊",
    "🙈", "🙈",
    "🐱‍👤", "🐱‍👤",
    "🐵", "🐵",
    "🐺", "🐺",
    "🐱", "🐱",
    "🦁", "🦁"
];

let opencards = [];

// Embaralhar os emojis
let shuffleemojis = emojis.sort(() => Math.random() < 0.5);

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleemojis[i];
    box.onclick = handleclick;
    document.querySelector(".game").appendChild(box);
}

function handleclick() {
    if (opencards.length < 2 && !this.classList.contains("boxOpen")) {
        this.classList.add("boxOpen");
        opencards.push(this);
    }

    if (opencards.length == 2) {
        setTimeout(checkMath, 500);
    }
}

function checkMath() {
    if(opencards[0].innerHTML === opencards[1].innerHTML) {
        opencards[0].classList.add("boxMatch");
        opencards[1].classList.add("boxMatch");
    }else{
        opencards[0].classList.remove("boxOpen");
        opencards[1].classList.remove("boxOpen");
    }

    opencards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert ("Você acertou todas e venceu!");
    }
}
