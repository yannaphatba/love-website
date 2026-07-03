/* ==========================================================
   Music Controller - music.js
========================================================== */

(function() {
    let bgMusic = null;
    let musicButton = null;
    let isPlaying = false;

    function initMusicElements() {
        bgMusic = document.getElementById("bgMusic");
        musicButton = document.getElementById("musicButton");
        return bgMusic !== null; // Only bgMusic is required
    }

    async function playMusic() {
        if (!initMusicElements()) return;
        try {
            await bgMusic.play();
            isPlaying = true;
            updateButton();
        } catch (err) {
            console.log("Autoplay blocked:", err);
        }
    }

    function pauseMusic() {
        if (!initMusicElements()) return;
        bgMusic.pause();
        isPlaying = false;
        updateButton();
    }

    function toggleMusic() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    function updateButton() {
        if (!musicButton) return;
        if (isPlaying) {
            musicButton.textContent = "🔊 Playing...";
        } else {
            musicButton.textContent = "🎵 Play Music";
        }
    }

    function setupMusicControls() {
        if (!initMusicElements()) return;
        
        updateButton();
        
        if (musicButton) {
            musicButton.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleMusic();
            });
        }
        
        document.addEventListener("click", () => {
            if (!isPlaying) {
                playMusic();
            }
        }, { once: true });
        
        const shouldAutoPlay = localStorage.getItem("shouldAutoPlayMusic");
        if (shouldAutoPlay === "true") {
            setTimeout(() => {
                playMusic();
            }, 100);
            localStorage.removeItem("shouldAutoPlayMusic");
        }
    }

    // Setup when this script is loaded (placed before closing body tag)
    setupMusicControls();
})();
