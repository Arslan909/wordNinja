let words = ["test", "game", "kill", "keyboard", "mouse", "drive", "rizz", "up", "type", "night", "meow", "down", "clock", "glass", "diatribe", "artless", "oz", "chocolate", "basketball", "aran", "mts",]


let score = document.getElementById("score");
let count = 0;
let itr = 0;
let interval = 1000;

let gameOver = false
let intervalId;

function gameOverContainer(){
    let overlay = document.createElement("div")
    overlay.className = "overlay"


    let temp = document.createElement("div")
    temp.className = "gameOver"
    temp.innerHTML = "Game over! Refresh to restart"
    overlay.appendChild(temp)
    document.getElementById("main").appendChild(overlay);

    document.getElementById("word-input").removeAttribute("autofocus");
    
}

function makingWordsFall() {
    let screen = document.getElementById("screen");

    if (gameOver === false && itr < words.length) {
        let moving = document.createElement("div");
        moving.className = "moving";
        moving.innerHTML = words[itr];

        let left = Math.random() * (90 - 10) + 10;
        moving.style.left = left + "%";

        screen.appendChild(moving);
        itr++;
    } else {
        if (gameOver) {
            console.log(gameOver)
            // screen.innerHTML = ""
            // gameOverContainer()
            // clearInterval(intervalId)
            return
        }
        itr = 0
    }

    let movingDivs = screen.querySelectorAll(".moving")

    movingDivs.forEach(ele => {
        ele.addEventListener('animationend', () => {
            gameOver = true;
            screen.innerHTML = ""
            gameOverContainer()
            clearInterval(intervalId)
        })
    })

}


intervalId = setInterval(makingWordsFall, interval);

document.getElementById("word-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        let input = document.getElementById("word-input").value;
        let screen = document.getElementById("screen");
        let movingDivs = screen.querySelectorAll(".moving");

        movingDivs.forEach(ele => {
            let temp = ele.innerHTML;
            if (input === temp) {
                ele.remove();
                count += 10;
                score.innerHTML = count;
                document.getElementById("word-input").value = "";
            }
        });
    }
});
