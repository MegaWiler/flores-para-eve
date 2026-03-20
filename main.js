const audio = document.getElementById("miMusica");
const video = document.getElementById("video-fondo");
const container = document.getElementById("lyrics-container");
const lyricsData = [
    // Verso 1
    { text: "She told me that she loved me by the water fountain", time: 13.8 },
    { text: "She told me that she loved me and she didn't love him", time: 17.2 },
    { text: "And that was really lovely 'cause it was innocent", time: 20.8 },
    { text: "But now she's got a cup with something else in it", time: 24.2 },
    { text: "It's getting kind of blurry at a quarter past ten", time: 27.8 },
    { text: "And he was in a hurry to be touching her skin", time: 31.5 },
    { text: "She's feeling kind of dirty when she's dancing with him", time: 34.8 },
    { text: "Forgetting what she told me by the water fountain", time: 38.2 },

    // Coro 1
    { text: "Now he's grabbing her hips, and pulling her in", time: 42.1 },
    { text: "Kissing her lips, and whispering in her ear", time: 45.8 },
    { text: "And she knows that she shouldn't listen", time: 49.5 },
    { text: "And that she should be with me by the water fountain", time: 53.0 },

    // Puente 1
    { text: "She couldn't be at home in the night time because", time: 56.8 },
    { text: "It made her feel alone, but at that time she was too young", time: 60.5 },
    { text: "I was too young", time: 67.5 },
    { text: "I should've built a home with a fountain for us", time: 71.2 },
    { text: "The moment that she told me that she was in love too young", time: 74.8 },
    { text: "I was too young", time: 80.8 },
    { text: "Too young, too young, too young, young", time: 83.5 },

    // --- CORRECCIÓN DESDE AQUÍ (VERSO 2) ---
    { text: "And if she ever goes back to the water fountain", time: 96.5 },
    { text: "The handle will be broken and the rust set in", time: 100.5 },
    { text: "But my hand, it will be open and I'll try to fix it", time: 104.8 },
    { text: "My heart, it will be open and I'll try to give it", time: 109.0 },

    // Coro 2
    { text: "Now I'm grabbing her hips, and pulling her in", time: 112.8 },
    { text: "Kissing her lips, and whispering in her ear", time: 116.8 },
    { text: "And I know that it's only a wish", time: 120.5 },
    { text: "And that we're not standing by the water fountain", time: 124.5 },
    { text: "Too young, too young, too young, young", time: 129.0 },

    // Chorus Repeat
    { text: "She couldn't be at home in the night time because", time: 135.5 },
    { text: "It made her feel alone, but at that time she was too young", time: 139.5 },
    { text: "I was too young", time: 146.5 },
    { text: "I should've built a home with a fountain for us", time: 150.5 },
    { text: "The moment that she told me that she was in love too young", time: 154.0 },
    { text: "I was too young", time: 157.5 },
    { text: "Too young, too young, too young, young", time: 161.0 },

    // Outro
    { text: "(Too young) I should've built a home with a fountain for us", time: 181.0 },
    { text: "(Too young) The moment that she told me that she was in love", time: 185.0 },
    { text: "(Too young) Too young", time: 189.0 },
    { text: "(Young) I was too young ❤️", time: 192.0 }
];

function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (Math.random() * 3 + 5) + "s";
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 8000);
}

function updateLyrics() {
    const time = audio.currentTime;
    const index = lyricsData.findIndex((line, i) => {
        const nextLine = lyricsData[i + 1];
        return time >= line.time && (!nextLine || time < nextLine.time);
    });

    if (index !== -1) {
        const currentLine = lyricsData[index];
        const nextLine = lyricsData[index + 1];
        // Calculamos la duración para que la animación de llenado sea fluida
        const duration = nextLine ? (nextLine.time - currentLine.time) : 3.5;

        if (container.getAttribute("data-index") !== index.toString()) {
            container.innerHTML = `<p class="lyrics-line" style="animation-duration: ${duration}s">${currentLine.text}</p>`;
            container.setAttribute("data-index", index);
        }
    }
}

function start() {
    audio.play().catch(() => {});
    video.play();
    if (!window.petalInterval) window.petalInterval = setInterval(createPetal, 200);
}

window.onload = start;
window.addEventListener("click", start, { once: true });
audio.addEventListener("timeupdate", updateLyrics);
audio.addEventListener("ended", () => {
    document.getElementById("mensaje-despedida").style.opacity = "1";
    container.style.display = "none";
});