const maze = document.getElementById("maze");
const player = document.getElementById("player");
const paths = [];

const PLAYER_SIZE = 20;

// Criar caminhos
function createPath(x, y, width, height) {
    const div = document.createElement("div");
    div.classList.add("path");
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.width = width + "px";
    div.style.height = height + "px";
    maze.appendChild(div);

    paths.push({ x, y, width, height });
}

// Criar saída (guarda a posição para detectar a vitória)
let exitBox = null;

function createExit(x, y, size) {
    const div = document.createElement("div");
    div.classList.add("exit");
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.width = size + "px";
    div.style.height = size + "px";
    maze.appendChild(div);

    exitBox = { x, y, size };
}

// Labirinto (um caminho só: de baixo, sobe, vai à esquerda, sobe de novo e termina no topo à direita)
createPath(0, 350, 600, 30);    // 1. corredor de baixo
createPath(570, 200, 30, 180);  // 2. sobe pela direita
createPath(100, 200, 500, 30);  // 3. corredor do meio
createPath(100, 50, 30, 180);   // 4. sobe pela esquerda
createPath(100, 50, 500, 30);   // 5. corredor de cima

// Saída: no FINAL do labirinto (ponta direita do corredor de cima)
createExit(580, 55, 20);

// Player
let x = 10;
let y = 350;
const speed = 5;
let venceu = false;

// Movimento
document.addEventListener("keydown", (e) => {
    if (venceu) return;

    let newX = x;
    let newY = y;

    if (e.key === "ArrowRight") newX += speed;
    else if (e.key === "ArrowLeft") newX -= speed;
    else if (e.key === "ArrowUp") newY -= speed;
    else if (e.key === "ArrowDown") newY += speed;
    else return; // ignora outras teclas

    e.preventDefault(); // evita que a página role com as setas

    // Só anda se continuar dentro de um caminho
    if (isInsidePath(newX, newY)) {
        x = newX;
        y = newY;
    }

    player.style.left = x + "px";
    player.style.top = y + "px";

    // Vitória: o jogador encosta na saída
    if (touchingExit()) {
        venceu = true;
        // pequeno atraso para o jogador ser desenhado na saída antes do alerta
        setTimeout(() => {
            alert("Você venceu!");
            window.location.href = "curriculo.html";
        }, 50);
    }
});

function isInsidePath(px, py) {
    return paths.some(path => {
        return (
            px >= path.x &&
            px <= path.x + path.width - PLAYER_SIZE &&
            py >= path.y &&
            py <= path.y + path.height - PLAYER_SIZE
        );
    });
}

function touchingExit() {
    return (
        x < exitBox.x + exitBox.size &&
        x + PLAYER_SIZE > exitBox.x &&
        y < exitBox.y + exitBox.size &&
        y + PLAYER_SIZE > exitBox.y
    );
}
