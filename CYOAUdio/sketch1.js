let pianoSounds = [];
let guitarSounds = [];
let drumSounds = [];

let pianoUI = [];
let drumUI = [];
let guitarUI = [];

let nextButton;
let backButton;

let state = 0;
// 0 = title
// 1 = piano
// 2 = drums
// 3 = guitar
// 4 = final

function preload() {
  pianoSounds[0] = loadSound("assets/piano1.mp3");
  guitarSounds[0] = loadSound("assets/guitar1.mp3");
  drumSounds[0] = loadSound("assets/drums1.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  nextButton = createButton("Next");
  nextButton.size(160, 45);
  nextButton.mousePressed(nextScreen);

  backButton = createButton("Back");
  backButton.size(160, 45);
  backButton.mousePressed(prevScreen);

  createStemRows(pianoUI, pianoSounds, "Piano");
  createStemRows(drumUI, drumSounds, "Drum");
  createStemRows(guitarUI, guitarSounds, "Guitar");

  updateUI();
}

function draw() {
  background(199,199,218);

  if (state === 0) {
    textSize(40);
    text("Welcome to Auditorial Differential!", width / 2, height / 2);
  }

  if (state === 1) {
    drawInstrumentPage("Piano", pianoUI);
  }

  if (state === 2) {
    drawInstrumentPage("Drums", drumUI);
  }

  if (state === 3) {
    drawInstrumentPage("Guitar", guitarUI);
  }

  if (state === 4) {
    textSize(36);
    text("Your Selected Stems", width / 2, 100);

    let selected = getSelectedStems();

    textSize(24);

    if (selected.length === 0) {
      text("No stems selected.", width / 2, height / 2);
    } else {
      for (let i = 0; i < selected.length; i++) {
        text(selected[i], width / 2, 180 + i * 50);
      }
    }
  }
}

function createStemRows(uiArray, soundArray, label) {
  for (let i = 0; i < 3; i++) {
    let row = {};

    row.playing = false;

    row.playButton = createButton("Play");
    row.playButton.size(70, 40);
    row.playButton.mousePressed(() => toggleStem(row, soundArray, i));

    row.label = createSpan(label + " Stem " + (i + 1));
    row.label.addClass("label");

    row.checkbox = createCheckbox("");
    row.checkbox.addClass("checkbox");

    uiArray.push(row);
  }
}

function drawInstrumentPage(title, uiArray) {
  textSize(32);
  text(title, width / 2, 80);

  let startX = 120;
  let startY = 150;

  for (let i = 0; i < uiArray.length; i++) {
    let row = uiArray[i];

    row.playButton.position(startX, startY + i * 80);
    row.label.position(startX + 90, startY + 10 + i * 80);
    row.checkbox.position(startX + 290, startY + 10 + i * 80);
  }

  backButton.position(120, height - 100);
  nextButton.position(300, height - 100);
}

function toggleStem(row, soundArray, index) {
  userStartAudio();

  if (!soundArray[index]) return;

  if (!row.playing) {
    soundArray[index].play();
    row.playButton.html("Stop");
    row.playing = true;
  } else {
    soundArray[index].stop();
    row.playButton.html("Play");
    row.playing = false;
  }
}

function getSelectedStems() {
  let selected = [];

  collectSelected(pianoUI, "Piano", selected);
  collectSelected(drumUI, "Drum", selected);
  collectSelected(guitarUI, "Guitar", selected);

  return selected;
}

function collectSelected(uiArray, label, selectedArray) {
  for (let i = 0; i < uiArray.length; i++) {
    if (uiArray[i].checkbox.checked()) {
      selectedArray.push(label + " Stem " + (i + 1));
    }
  }
}

function stopAllSounds() {
  for (let s of pianoSounds) {
    if (s && s.isPlaying()) s.stop();
  }

  for (let s of drumSounds) {
    if (s && s.isPlaying()) s.stop();
  }

  for (let s of guitarSounds) {
    if (s && s.isPlaying()) s.stop();
  }

  resetButtons(pianoUI);
  resetButtons(drumUI);
  resetButtons(guitarUI);
}

function resetButtons(uiArray) {
  for (let row of uiArray) {
    row.playing = false;
    row.playButton.html("Play");
  }
}

function hideAllUI() {
  nextButton.hide();
  backButton.hide();

  hideGroup(pianoUI);
  hideGroup(drumUI);
  hideGroup(guitarUI);
}

function hideGroup(uiArray) {
  for (let row of uiArray) {
    row.playButton.hide();
    row.label.hide();
    row.checkbox.hide();
  }
}

function showGroup(uiArray) {
  for (let row of uiArray) {
    row.playButton.show();
    row.label.show();
    row.checkbox.show();
  }
}

function nextScreen() {
  stopAllSounds();
  if (state < 4) state++;
  updateUI();
}

function prevScreen() {
  stopAllSounds();
  if (state > 0) state--;
  updateUI();
}

function updateUI() {
  hideAllUI();

  if (state === 0) {
    nextButton.position(150, height - 100);
    nextButton.show();
  }

  if (state === 1) {
    showGroup(pianoUI);
    nextButton.position(300, height - 100);
    backButton.position(120, height - 100);
    nextButton.show();
    backButton.show();
  }

  if (state === 2) {
    showGroup(drumUI);
    nextButton.position(300, height - 100);
    backButton.position(120, height - 100);
    nextButton.show();
    backButton.show();
  }

  if (state === 3) {
    showGroup(guitarUI);
    nextButton.position(300, height - 100);
    backButton.position(120, height - 100);
    nextButton.show();
    backButton.show();
  }

  if (state === 4) {
    backButton.position(120, height - 100);
    backButton.show();
  }
}