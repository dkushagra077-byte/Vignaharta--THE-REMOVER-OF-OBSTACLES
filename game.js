const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let W = window.innerWidth;
let H = window.innerHeight;

canvas.width = W;
canvas.height = H;

window.addEventListener("resize", () => {
    W = window.innerWidth;
    H = window.innerHeight;

    canvas.width = W;
    canvas.height = H;
});
const levels = [

    {
        day: 1,
        asura: "Krodha",
        location: "The Festive Pandal",
        health: 70,
        power: "Modak Blessing"
    },

    {
        day: 2,
        asura: "Lobha",
        location: "Moonlit Temple",
        health: 100,
        power: "Lotus Shield"
    },

    {
        day: 3,
        asura: "Moha",
        location: "Whispering Forest",
        health: 130,
        power: "Durva Grace"
    },

    {
        day: 4,
        asura: "Mada",
        location: "Mountain of Echoes",
        health: 160,
        power: "Parashu Strike"
    },

    {
        day: 5,
        asura: "Matsarya",
        location: "River of Lamps",
        health: 200,
        power: "Mushak Companion"
    },

    {
        day: 6,
        asura: "Dambha",
        location: "Storm-Swept Fort",
        health: 250,
        power: "Trishul Thunder"
    },

    {
        day: 7,
        asura: "Krodhaj",
        location: "Flame Valley",
        health: 300,
        power: "Agni Astra"
    },

    {
        day: 8,
        asura: "Ahamkara",
        location: "Celestial Gate",
        health: 360,
        power: "Gada Force"
    },

    {
        day: 9,
        asura: "Vighna",
        location: "Ancient Cosmic Ruins",
        health: 430,
        power: "Siddhi Surge"
    },

    {
        day: 10,
        asura: "Mahavighna",
        location: "Anant Chaturdashi Arena",
        health: 520,
        power: "Vighnaharta Aura"
    }

];
let player = {
    x: W * 0.25,
    y: H * 0.65,

    width: 70,
    height: 110,

    health: 100,
    maxHealth: 100,

    speed: 5,

    direction: 1,

    attacking: false,

    attackCooldown: 0,

    power: 0,

    mushakUnlocked: false
};

let currentLevel = 0;

let asura = {
    x: W * 0.75,
    y: H * 0.60,

    width: 120,
    height: 150,

    health: levels[currentLevel].health,
    maxHealth: levels[currentLevel].health,

    speed: 1.5,

    attacking: false,

    attackCooldown: 0,

    stunned: false
};

let gameState = "menu";

let score = 0;

let particles = [];

let hitParticles = [];

let projectiles = [];

let gameRunning = false;

const keys = {
    left: false,
    right: false,
    attack: false,
    power: false
};

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keys.left = true;
    }

    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        keys.right = true;
    }

    if (event.code === "Space") {
        event.preventDefault();
        keys.attack = true;
    }

    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        event.preventDefault();
        keys.power = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keys.left = false;
    }

    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        keys.right = false;
    }

    if (event.code === "Space") {
        event.preventDefault();
        keys.attack = false;
    }

    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        event.preventDefault();
        keys.power = false;
    }
});

function updatePlayer() {

    if (keys.left) {
        player.x -= player.speed;
        player.direction = -1;
    }

    if (keys.right) {
        player.x += player.speed;
        player.direction = 1;
    }

    if (keys.attack) {

    playerAttack();

    keys.attack = false;

    }

    player.x = Math.max(
        50,
        Math.min(W - 50, player.x)
    );

}
function gameLoop() {

    updatePlayer();

    updateHitParticles();

    drawGame();

    drawHitParticles();

    requestAnimationFrame(gameLoop);

}

gameLoop();
function drawGame() {

    // Background
    ctx.fillStyle = "#12091c";
    ctx.fillRect(0, 0, W, H);

    // Ground
    ctx.fillStyle = "#21101c";
    ctx.fillRect(0, H * 0.75, W, H * 0.25);

    // Ganesh Ji
    drawGanesh();

    // Asura
    drawAsura();

}
function drawGanesh() {

    ctx.save();

    ctx.translate(player.x, player.y);

    // Body
    ctx.fillStyle = "#e8894f";

    ctx.beginPath();
    ctx.ellipse(
        0,
        0,
        38,
        50,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Head
    ctx.beginPath();

    ctx.arc(
        0,
        -60,
        35,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Ears
    ctx.beginPath();

    ctx.ellipse(
        -34,
        -60,
        15,
        25,
        0,
        0,
        Math.PI * 2
    );

    ctx.ellipse(
        34,
        -60,
        15,
        25,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Crown
    ctx.fillStyle = "#ffd45c";

    ctx.beginPath();

    ctx.moveTo(-25, -90);
    ctx.lineTo(0, -125);
    ctx.lineTo(25, -90);

    ctx.closePath();

    ctx.fill();

    // Trunk
    ctx.strokeStyle = "#e8894f";
    ctx.lineWidth = 12;

    ctx.beginPath();

    ctx.moveTo(0, -60);
    ctx.quadraticCurveTo(
        20,
        -40,
        10,
        -20
    );

    ctx.stroke();

    ctx.restore();
}
function drawAsura() {

    ctx.save();

    ctx.translate(asura.x, asura.y);

    // Body
    ctx.fillStyle = "#633747";

    ctx.beginPath();

    ctx.ellipse(
        0,
        0,
        55,
        80,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Head
    ctx.fillStyle = "#8b5360";

    ctx.beginPath();

    ctx.arc(
        0,
        -80,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // Horns
    ctx.fillStyle = "#d4a45e";

    ctx.beginPath();

    ctx.moveTo(-25, -110);
    ctx.lineTo(-65, -150);
    ctx.lineTo(-45, -95);

    ctx.moveTo(25, -110);
    ctx.lineTo(65, -150);
    ctx.lineTo(45, -95);

    ctx.fill();

    // Eyes
    ctx.fillStyle = "#ffdf67";

    ctx.beginPath();

    ctx.arc(-15, -82, 5, 0, Math.PI * 2);
    ctx.arc(15, -82, 5, 0, Math.PI * 2);

    ctx.fill();

    ctx.restore();
}
let attackDamage = 20;

let attackRange = 130;

let attackCooldown = 0;

let playerInvincible = false;

let bossAttackCooldown = 0;

let gameMessage = "";

let gameMessageTimer = 0;
function playerAttack() {

    if (attackCooldown > 0) {
        return;
    }

    attackCooldown = 0.5;

    player.attacking = true;

    setTimeout(() => {
        player.attacking = false;
    }, 200);

    const distance = Math.abs(
        player.x - asura.x
    );

    if (distance <= attackRange) {

        asura.health -= attackDamage;

        createHitEffect(
            asura.x,
            asura.y - 40
        );

        gameMessage =
            "-" + attackDamage + " DAMAGE!";

        gameMessageTimer = 500;

        score += 10;

        if (asura.health <= 0) {

            asura.health = 0;

            defeatAsura();

        }
    }
}

// ==============================
// HIT PARTICLE SYSTEM
// ==============================


function createHitEffect(x, y) {

    for (let i = 0; i < 18; i++) {

        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            2 + Math.random() * 4;

        hitParticles.push({

            x: x,

            y: y,

            vx: Math.cos(angle) * speed,

            vy: Math.sin(angle) * speed,

            size:
                3 + Math.random() * 5,

            life: 1,

            gravity: 0.08

        });
    }
}
function updateHitParticles() {

    for (let i = hitParticles.length - 1; i >= 0; i--) {

        const particle = hitParticles[i];

        particle.x += particle.vx;

        particle.y += particle.vy;

        particle.vy += particle.gravity;

        particle.life -= 0.025;

        particle.size *= 0.97;

        if (particle.life <= 0) {

            hitParticles.splice(i, 1);

        }
    }
}
function drawHitParticles() {

    for (const particle of hitParticles) {

        ctx.save();

        ctx.globalAlpha = particle.life;

        ctx.fillStyle = "#ffd166";

        ctx.shadowBlur = 15;

        ctx.shadowColor = "#ff9f1c";

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }
}
