/* ==========================================================
   Sparkle Engine
========================================================== */

let sparkleContainer = null;
let sparkles = [];

function initSparkles() {
    sparkleContainer = document.getElementById("sparkle-container");
    if (!sparkleContainer) {
        return;
    }

    sparkles = [];
    const sparkleCount = 25;

    for(let i = 0; i < sparkleCount; i++){
        const star = document.createElement("div");
        star.className = "sparkle";
        sparkleContainer.appendChild(star);
        const sizeTypes = ["small", "medium", "large"];
        star.classList.add(sizeTypes[Math.floor(Math.random() * sizeTypes.length)]);
        randomize(star);
        sparkles.push(star);
    }

    setInterval(() => {
        sparkles.forEach(star => {
            if(Math.random() < 0.15){
                randomize(star);
            }
        });
    }, 1000);
}

function randomize(star){
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.animationDuration = (2 + Math.random() * 3) + "s";
    star.style.animationDelay = (Math.random() * 3) + "s";
}

function startFireworks() {
    if (!sparkleContainer) {
        sparkleContainer = document.getElementById("sparkle-container");
    }
    if (!sparkleContainer) return;

    const explosionCount = 15;
    for(let i = 0; i < explosionCount; i++){
        const star = document.createElement("div");
        star.className = "sparkle medium";
        sparkleContainer.appendChild(star);
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = x + "vw";
        star.style.top = y + "vh";
        star.style.animationDuration = (0.5 + Math.random() * 1) + "s";
        star.style.animationDelay = "0s";
        
        setTimeout(() => {
            star.remove();
        }, 1500);
    }
}

// Initialize immediately when script loads
initSparkles();