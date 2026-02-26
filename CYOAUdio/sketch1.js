let pianoSounds = [];
let guitarSounds = [];
let drumSounds = [];
let playButton;
let stopButton;
let pianoNext;

let pianovar;
let guitarvar;
let drumvar;

function preload() {
  pianoSounds[0] = loadSound("assets/piano1.mp3");
  pianoSounds[1] = loadSound("assets/LOD.wav");

  guitarSounds[0] = loadSound("assets/guitar1.mp3");
  
  drumSounds[0] = loadSound("assets/drums1.mp3");
}

function setup() {
  pianovar = 1;
  guitarvar = 1;
  drumvar = 1;
  createCanvas(windowWidth, windowHeight);

  playButton = createButton("Play Guitar");
  playButton.position(width/2 - 20, height/2);
  playButton.mousePressed(playGuitar);

  playButton = createButton("Play Drums");
  playButton.position(width/2 - 20, height/2 - 100);
  playButton.mousePressed(playDrums);

  playButton = createButton("Play Piano");
  playButton.position(width/2 - 20, height/2 - 50);
  playButton.mousePressed(playPiano);

  playButton = createButton("Play All");
  playButton.position(width/2, height/2 - 150);
  playButton.mousePressed(playAll);

  stopButton = createButton("Stop");
  stopButton.position(width/2, height/2 + 50);
  stopButton.mousePressed(stopMusic);

  pianoNext = createButton("Next Piano Sound");
  pianoNext.position(width/2, height/2 + 200);
  pianoNext.mousePressed(pianovar++);

  text(pianovar, width/2, height/2 + 350);
}

function playGuitar() {
  userStartAudio();

  let currentGuitar = guitarSounds[guitarvar - 1];
  if (currentGuitar && !currentGuitar.isPlaying()) {
    currentGuitar.play();
  }
}

function playDrums() {
  userStartAudio();

  let currentDrums = drumSounds[drumvar - 1];
  if (currentDrums && !currentDrums.isPlaying()) {
    currentDrums.play();
  }
}

function playPiano() {
  userStartAudio();

  let currentPiano = pianoSounds[pianovar - 1];
  if (currentPiano && !currentPiano.isPlaying()) {
    currentPiano.play();
  }
}

function playAll() {
  userStartAudio();

  let currentPiano = pianoSounds[pianovar - 1];
  if (currentPiano && !currentPiano.isPlaying()) {
    currentPiano.play();
  }
  
  let currentDrums = drumSounds[drumvar - 1];
  if (currentDrums && !currentDrums.isPlaying()) {
    currentDrums.play();
  }
  
  let currentGuitar = guitarSounds[guitarvar - 1];
  if (currentGuitar && !currentGuitar.isPlaying()) {
    currentGuitar.play();
  }
}

function stopMusic() {
  let currentGuitar = guitarSounds[guitarvar - 1];
  if (currentGuitar) {
    currentGuitar.stop();
  }
  
  let currentPiano = pianoSounds[pianovar - 1];
  if (currentPiano) {
    currentPiano.stop();
  }
  
  let currentDrums = drumSounds[drumvar - 1];
  if (currentDrums) {
    currentDrums.stop();
  }
}
