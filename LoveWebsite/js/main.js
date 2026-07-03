/* ==========================================================
   Love Website
   main.js
========================================================== */

let bgMusic = null;
let yesButton = null;
let noButton = null;
let musicButton = null;
let musicStarted = false;

function initMainElements() {
    bgMusic = document.getElementById("bgMusic");
    yesButton = document.getElementById("yesButton");
    noButton = document.getElementById("noButton");
    musicButton = document.getElementById("musicButton");
    
    if (!yesButton || !noButton) {
        return false;
    }
    return true;
}

// ==========================================================
// เล่นเพลง
// ==========================================================

async function playMusic() {
    if (!bgMusic || musicStarted) return;
    try {
        await bgMusic.play();
        musicStarted = true;
        if (musicButton) {
            musicButton.textContent = "🔊 กำลังเล่นเพลง";
        }
    } catch (err) {
        console.log("Browser blocked autoplay.");
    }
}

// ==========================================================
// สุ่มตำแหน่งปุ่ม
// ==========================================================

function moveNoButton() {
    if (!noButton) return;
    const padding = 20;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const x = Math.random() * (width - buttonWidth - padding * 2);
    const y = Math.random() * (height - buttonHeight - padding * 2);
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
}

// ==========================================================
// Yes Button Handler
// ==========================================================

function handleYesClick() {
    console.log("Redirecting to success.html");
    localStorage.setItem("shouldAutoPlayMusic", "true");
    // Direct navigation - simple and works with file://
    location.href = "./success.html";
}

// ==========================================================
// Setup All Buttons
// ==========================================================

function setupMainButtons() {
    console.log("setupMainButtons called");
    if (!initMainElements()) {
        console.error("Failed to init main elements");
        return;
    }
    
    console.log("yesButton:", yesButton);
    console.log("noButton:", noButton);
    console.log("musicButton:", musicButton);
    console.log("bgMusic:", bgMusic);
    
    // Music button
    if (musicButton) {
        musicButton.addEventListener("click", playMusic);
        console.log("Music button listener added");
    }
    
    // Yes button
    yesButton.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Yes button clicked!");
        yesButton.disabled = true;
        yesButton.classList.add("clicked");
        yesButton.textContent = "⏳ กำลังโหลด...";
        try {
            await playMusic();
            if (typeof startFireworks === "function") {
                console.log("Starting fireworks...");
                startFireworks();
            }
        } catch (error) {
            console.error("Error during animation:", error);
        }
        console.log("Setting timeout for redirect...");
        setTimeout(() => {
            console.log("Timeout done, calling handleYesClick");
            handleYesClick();
        }, 3000);
    }, false);
    
    // No button - escape
    noButton.addEventListener("mouseenter", () => {
        moveNoButton();
    });

    // No button - mobile
    noButton.addEventListener("touchstart", (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // No button - click message
    noButton.addEventListener("click", () => {
        const messages = [
            "ห้ามกดยกเลิกนะ ❤️",
            "ลองใหม่อีกที 😆",
            "กดตกลงเถอะน้า 🥺",
            "ปุ่มนี้กดไม่ได้นะ 😂",
            "เค้าตั้งใจทำเว็บนี้เลยนะ ❤️"
        ];
        const random = Math.floor(Math.random() * messages.length);
        alert(messages[random]);
        moveNoButton();
    });
    
    console.log("All button listeners added successfully");
}

// ==========================================================
// Initialize
// ==========================================================

window.addEventListener("load", () => {
    moveNoButton();
});

window.addEventListener("resize", () => {
    moveNoButton();
});

// Setup buttons
setupMainButtons();