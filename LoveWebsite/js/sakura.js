/* ==========================================================
   Sakura Animation Engine
========================================================== */

function initSakura() {

    const sakuraContainer = document.getElementById("sakura-container");

    if (!sakuraContainer) {
        return;
    }

    const PETAL_COUNT = 60;
    const petals = [];
    const icons = ["🌸", "🌸", "🌸", "🌸"];

    for(let i = 0; i < PETAL_COUNT; i++){
        const petal = document.createElement("div");
        petal.className = "sakura";
        petal.textContent = icons[Math.floor(Math.random() * icons.length)];
        sakuraContainer.appendChild(petal);
        petals.push({
            element: petal,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: 16 + Math.random() * 20,
            speedY: 0.4 + Math.random() * 1.4,
            speedX: -0.3 + Math.random() * 0.6,
            rotate: Math.random() * 360,
            rotateSpeed: -1 + Math.random() * 2,
            swing: Math.random() * 100,
            opacity: 0.4 + Math.random() * 0.6
        });
    }

    function updatePetals(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        petals.forEach(p => {
            p.y += p.speedY;
            p.rotate += p.rotateSpeed;
            p.swing += 0.02;
            p.x += p.speedX + Math.sin(p.swing) * 0.6;
            p.x += Math.sin(Date.now() / 2500) * 0.15;
            
            if(p.y > height + 50){
                p.y = -50;
                p.x = Math.random() * width;
            }
            if(p.x < -50){
                p.x = width + 30;
            }
            if(p.x > width + 50){
                p.x = -30;
            }
            
            p.element.style.left = p.x + "px";
            p.element.style.top = p.y + "px";
            p.element.style.fontSize = p.size + "px";
            p.element.style.opacity = p.opacity;
            p.element.style.transform = `rotate(${p.rotate}deg)`;
        });
        requestAnimationFrame(updatePetals);
    }

    updatePetals();

    window.addEventListener("resize", () => {
        petals.forEach(p => {
            p.x = Math.random() * window.innerWidth;
            p.y = Math.random() * window.innerHeight;
        });
    });
}

// Initialize immediately when script loads
initSakura();