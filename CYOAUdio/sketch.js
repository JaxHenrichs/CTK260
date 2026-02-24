let s1;
let masterVolume = 0.5;
let rate = 1;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  s1 = await loadSound('assets/LOD.wav');
}

function draw() {
  background(0);
  fill(255);
  ellipse(width/2, height/2, 100);
  text(int(mouseX) + ", " + int(mouseY), 100, 100);
  text(masterVolume, 100,200);
  soundOut.setVolume(masterVolume);
  text (rate, 300,200);
}

function mousePressed() {
if (mouseX > 400 && mouseY > 400 && !s1.isPlaying()) {
  s1.rate(rate);
  s1.play();
}
else if (mouseX > 400 && mouseY > 400 && s1.isPlaying()) {
s1.stop();
}
}

// function keyPressed() {
//   if (key === 'P' || key === "p") {
//     masterVolume =masterVolume + 0.1;
//       text(P, 200,200);

//   }
//   if (key === 'L' || key === "l") {
//     masterVolume = masterVolume - 0.1;
//   }
//   return false;
// }

function keyPressed() {
  if (keyCode = 105){
  rate += 0.1;
  background(green);
  }
if (keycode = 102){
  rate -=0.1;
  background(red);
}
}

