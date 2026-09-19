const padNames = {
  "Heater-1": "Heater 1",
  "Heater-2": "Heater 2",
  "Heater-3": "Heater 3",
  "Heater-4": "Heater 4",
  "Clap": "Clap",
  "Open-HH": "Open-HH",
  "Kick-n-Hat": "Kick-n'-Hat",
  "Kick": "Kick",
  "Closed-HH": "Closed-HH"
};

const display = document.getElementById("display");
const pads = document.querySelectorAll(".drum-pad");

function triggerPad(pad) {
  const audio = pad.querySelector(".clip");
  if (!audio) return;
  
  audio.currentTime = 0;
  audio.play().catch(err => console.log(err));
  
  display.innerText = padNames[pad.id] || pad.id;
  pad.classList.add("pad-hit");
  setTimeout(() => pad.classList.remove("pad-hit"), 100);
}

// Handle Click Events
pads.forEach(pad => {
  pad.addEventListener("click", () => triggerPad(pad));
});

// Handle Keydown Events
document.addEventListener("keydown", (e) => {
  // Convert key to uppercase to match audio element IDs (Q, W, E, etc.)
  const key = e.key.toUpperCase();
  const audio = document.getElementById(key);

  if (audio) {
    const pad = audio.parentElement;
    triggerPad(pad);
  }
});