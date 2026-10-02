const maze = document.getElementById("maze");

function createPath(x, y, width, height){
    const div = document.createElement("div");
    div.classList.add("path");
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.style.width = width + "px";
    div.style.height = height + "px";
    maze.appendChild(div);
}

createPath(0, 350, 600, 30);
createPath(570, 200, 30, 180);
createPath(100, 200, 500, 30);
createPath(100, 50, 30, 180);
createPath(100, 50, 500, 30);

const player = document.getElementById("player");

let x = 10;
let y = 350;
const speed = 5;

document.addEventListener("keydown", (e) =>) {
    if (e.key === "ArrowRight") x += speed;
    if (e.key === "ArrowLeft") x -= speed;
    if (e.key === "ArrowUp") y -= speed;
    if (e.key === "ArrowDown") y += speed;

    player.style.left = x + "px";
    player.style.top = y + "px";

}
