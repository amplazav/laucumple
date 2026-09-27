const giftButtons = document.querySelectorAll(".gift");
const giftMessage = document.getElementById("giftMessage");
const giftMessageText = document.getElementById("giftMessageText");

function openVideo(videoUrl) {
  window.open(videoUrl, "_blank", "noopener,noreferrer");
}

function showGiftMessage(text, onDone) {
  if (!giftMessage || !giftMessageText) {
    onDone();
    return;
  }

  giftMessageText.textContent = text;
  giftMessage.classList.add("show");
  giftMessage.setAttribute("aria-hidden", "false");

  setTimeout(() => {
    giftMessage.classList.remove("show");
    giftMessage.setAttribute("aria-hidden", "true");
    onDone();
  }, 2000);
}

giftButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const videoUrl = button.dataset.video;
    const preMessage = button.dataset.message;
    if (!videoUrl) {
      return;
    }

    button.classList.add("opening");
    setTimeout(() => {
      button.classList.remove("opening");
    }, 220);

    if (preMessage) {
      showGiftMessage(preMessage, () => openVideo(videoUrl));
    } else {
      openVideo(videoUrl);
    }
  });
});

const emojiFall = document.getElementById("emojiFall");
const fallingEmojis = ["💗", "💖", "✨", "🎂", "🎉", "🌸", "💕", "🎈"];

function spawnEmoji() {
  if (!emojiFall) {
    return;
  }

  const span = document.createElement("span");
  span.textContent = fallingEmojis[Math.floor(Math.random() * fallingEmojis.length)];
  span.style.left = `${Math.random() * 100}%`;
  span.style.fontSize = `${1 + Math.random() * 1.2}rem`;
  span.style.animationDuration = `${5 + Math.random() * 5}s`;
  span.style.animationDelay = `${Math.random() * 0.6}s`;
  emojiFall.appendChild(span);

  setTimeout(() => span.remove(), 11000);
}

for (let i = 0; i < 10; i += 1) {
  setTimeout(spawnEmoji, i * 250);
}

setInterval(spawnEmoji, 600);

const soundToggle = document.getElementById("soundToggle");

let ytPlayer = null;
let soundRequested = false;

function loadYouTubeApi() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("bgMusic", {
    videoId: "k4MyopavOsE",
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: "k4MyopavOsE",
      controls: 0,
    },
    events: {
      onReady(event) {
        event.target.playVideo();
        if (soundRequested) {
          event.target.unMute();
          event.target.setVolume(100);
        }
      },
    },
  });
};

function enableSound() {
  soundRequested = true;
  if (ytPlayer && typeof ytPlayer.unMute === "function") {
    ytPlayer.unMute();
    ytPlayer.setVolume(100);
    ytPlayer.playVideo();
  }
  if (soundToggle) {
    soundToggle.classList.add("is-hidden");
  }
}

loadYouTubeApi();

if (soundToggle) {
  soundToggle.addEventListener("click", enableSound);
}

// Autoplay only allows sound after a user gesture, so unmute on first interaction.
["click", "keydown", "touchstart"].forEach((eventName) => {
  document.addEventListener(eventName, enableSound, { once: true });
});
