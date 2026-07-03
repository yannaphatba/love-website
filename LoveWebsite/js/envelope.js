/* ==========================================================
   Envelope
========================================================== */

function initEnvelope() {
    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter");

    if (!envelope || !letter) {
        return;
    }

    let opened = false;

    envelope.addEventListener("click", () => {
        if(opened) return;
        opened = true;
        envelope.classList.add("open");
        setTimeout(() => {
            letter.classList.remove("hidden");
            requestAnimationFrame(() => {
                letter.classList.add("show");
            });
        }, 700);
    });

    setInterval(() => {
        if(opened) return;
        envelope.animate([
            { transform: "rotate(-2deg)" },
            { transform: "rotate(2deg)" },
            { transform: "rotate(-2deg)" }
        ], {
            duration: 1500
        });
    }, 3000);
}

// Initialize immediately when script loads
initEnvelope();