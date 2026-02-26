let piano;
let guitar;
let drums;
let playButton;
let stopButton;

function preload() {
  piano = loadSound("piano1.mp3");
  guitar = loadSound("guitar1.mp3");
  drums = loadSound("drums1.mp3");
}

function setup() {
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

  stopButton = createButton("Stop");
  stopButton.position(width/2, height/2 + 50);
  stopButton.mousePressed(stopMusic);
}

function playGuitar() {
  userStartAudio();

  if (!guitar.isPlaying()) { 
    guitar.play();
  }
}

function playDrums() {
  userStartAudio();

  if (!drums.isPlaying()) { 
    drums.play();
  }
}

function playPiano() {
  userStartAudio();

  if (!piano.isPlaying()) { 
    piano.play();
  }
}

function stopMusic() {
  guitar.stop();
  piano.stop();
  drums.stop();
}