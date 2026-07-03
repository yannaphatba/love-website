/* ==========================================================
   Floating Hearts Engine
========================================================== */

function initHearts() {

    const heartContainer = document.getElementById("heart-container");

    if (!heartContainer) {
        return;
    }

    const HEART_COUNT = 35;
    const hearts = [];
    const icons = ["❤️", "💖", "💕", "💗", "💝"];

    for(let i = 0; i < HEART_COUNT; i++){
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = icons[Math.floor(Math.random() * icons.length)];
        heartContainer.appendChild(heart);
        hearts.push({
            element: heart,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + Math.random() * 500,
            size: 18 + Math.random() * 26,
            opacity: 0.3 + Math.random() * 0.7,
            speed: 0.4 + Math.random() * 1.2,
            drift: -0.3 + Math.random() * 0.6,
            rotate: Math.random() * 360,
            rotateSpeed: -0.4 + Math.random() * 0.8,
            wave: Math.random() * 100
        });
    }

    function updateHearts(){
        const w = window.innerWidth;
        const h = window.innerHeight;
        hearts.forEach(hh => {
            hh.y -= hh.speed;
            hh.wave += 0.03;
            hh.rotate += hh.rotateSpeed;
            hh.x += hh.drift + Math.sin(hh.wave) * 0.4;
            if(hh.y < -80){
                hh.y = h + 50;
                hh.x = Math.random() * w;
            }
            hh.element.style.left = hh.x + "px";
            hh.element.style.top = hh.y + "px";
            hh.element.style.fontSize = hh.size + "px";
            hh.element.style.opacity = hh.opacity;
            hh.element.style.transform = `rotate(${hh.rotate}deg)`;
        });
        requestAnimationFrame(updateHearts);
    }

    updateHearts();

    window.addEventListener("resize", () => {
        hearts.forEach(h => {
            h.x = Math.random() * window.innerWidth;
            h.y = Math.random() * window.innerHeight;
        });
    });
}

// Initialize immediately when script loads
initHearts();