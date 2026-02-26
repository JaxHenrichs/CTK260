let s1;
let masterVolume = 0.5;
let rate = 1;
let pianoStems = [];
let guitarStems = [];
let drumStems = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  s1 = await loadSound('assets/LOD.wav');
}

async function preload() {
  // pianoStems[0] = await loadSound("assets/piano1.mp3");
  // guitarStems[0] = await loadSound("assets/guitar1.mp3");
  // drumStems[0] = await loadSound("assets/drums1.mp3");
}


function draw() {
  background(255);
  fill(0);
}

function mousePressed() {

  if (mouseX > 400 && mouseY > 400 && !s1.isPlaying()) {
  s1.rate(rate);
  s1.play();
}
else if (mouseX > 400 && mouseY > 400 && s1.isPlaying()) {
s1.pause();
}

}

