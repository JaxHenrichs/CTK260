let pianoSounds = [];
let guitarSounds = [];
let drumSounds = [];

let pianoUI = [];
let drumUI = [];
let guitarUI = [];

let nextButton;
let backButton;

let playAllButton;
let stopAllButton; 
let mixUI = [];

let font;

let boombox;

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
  pianoSounds[1] = loadSound("assets/piano2.wav");
  guitarSounds[1] = loadSound("assets/guitar2.wav");
  drumSounds[1] = loadSound("assets/drums2.wav");
  pianoSounds[2] = loadSound("assets/piano3.wav");
  guitarSounds[2] = loadSound("assets/guitar3b.wav");
  drumSounds[2] = loadSound("assets/drums3.wav");
  font = loadFont("assets/Showpop.ttf");
  boombox = loadImage("assets/bunnybox.png");
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

  playAllButton = createButton("Play All Selected Stems");
  playAllButton.size(200, 45);
  playAllButton.mousePressed(playAllSelectedStems);

  stopAllButton = createButton("Stop All");
  stopAllButton.size(160, 45);
  stopAllButton.mousePressed(stopAllSounds);

  createStemRows(pianoUI, pianoSounds, "Piano");
  createStemRows(drumUI, drumSounds, "Drum");
  createStemRows(guitarUI, guitarSounds, "Guitar");
  
  textFont(font);
  updateUI();
}

function draw() {
  background(199,199,218);
  background("#FFC6BD");

  if (state === 0) {
    textSize(64);
    text("Welcome to Auditorial Differential!", width / 2, height / 2);
  }

  if (state === 1) {
    drawInstrumentPage("Piano", pianoUI);
    drawBoombox();
  }

  if (state === 2) {
    drawInstrumentPage("Drums", drumUI);
  }

  if (state === 3) {
    drawInstrumentPage("Guitar", guitarUI);
  }

  if (state === 4) {
    drawMixingUI();
  }
}

function drawBoombox() {
  image(boombox, width / 2 + 50, height / 2 - 190, 400, 400);
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

    row.checkbox.changed(() => handleExclusiveCheck(uiArray, row));
  }
}

function drawInstrumentPage(title, uiArray) {
  textSize(64);
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

  collectSelected(pianoUI, pianoSounds, "Piano", selected);
  collectSelected(drumUI, drumSounds, "Drum", selected);
  collectSelected(guitarUI, guitarSounds, "Guitar", selected);

  return selected;
}

function collectSelected(uiArray, soundArray, label, selectedArray) {
  for (let i = 0; i < uiArray.length; i++) {
    if (uiArray[i].checkbox.checked()) {
      selectedArray.push({ label: label + " Stem " + (i + 1), sound: soundArray[i] });
    }
  }
}

function handleExclusiveCheck(uiArray, selectedRow) {
  if (selectedRow.checkbox.checked()) {
    for (let row of uiArray) {
      if (row !== selectedRow) {
        row.checkbox.checked(false);
      }
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
  resetButtons(mixUI);
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
  playAllButton.hide();
  stopAllButton.hide();

  hideGroup(pianoUI);
  hideGroup(drumUI);
  hideGroup(guitarUI);

  for (let row of mixUI) {
    row.playButton.hide();
    row.label.hide();
  }
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

  if (!selectionMade()) {
    alert("Please select one stem before continuing.");
    return;
  }
  stopAllSounds();
  if (state < 4) state++;
  updateUI();
}

function selectionMade() {
  if (state === 1) return isAnyChecked(pianoUI);
  if (state === 2) return isAnyChecked(drumUI);
  if (state === 3) return isAnyChecked(guitarUI);

  return true; 
}

function isAnyChecked(uiArray) {
  for (let row of uiArray) {
    if (row.checkbox.checked()) return true;
  }
  return false;
}

function prevScreen() {
  stopAllSounds();
  if (state > 0) state--;
  updateUI();
}


function playAllSelectedStems() {
  userStartAudio();

  for (let row of mixUI) {
    if (row.sound && !row.sound.isPlaying()) {
      row.sound.play();
      row.playButton.html("Stop");
      row.playing = true;
    }
  }
}

function drawMixingUI() {
  textSize(36);
  text("Your Selected Stems", width / 2, 100);

  let selected = getSelectedStems();
  let startX = width / 2 - 150;
  let startY = 180;

  for (let i = 0; i < mixUI.length; i++) {
    mixUI[i].playButton.remove();
    mixUI[i].label.remove();
  }
  mixUI = [];

  if (selected.length === 0) {
    textSize(36);
    text("No stems selected.", width / 2, height / 2);
  } else {
    for (let i = 0; i < selected.length; i++) {
      let row = {};
      row.playing = false;
      row.sound = selected[i].sound; // Store the sound object in the row

      row.playButton = createButton("Play");
      row.playButton.size(70, 40);
      row.playButton.position(startX, startY + i * 50);
      let currentSound = selected[i].sound;
      row.playButton.mousePressed(() => toggleIndividualStem(row, currentSound));

      row.label = createSpan(selected[i].label);
      row.label.addClass("label");
      row.label.position(startX + 90, startY + 10 + i * 50);

      mixUI.push(row);
    }
  }

  playAllButton.position(width / 2 - 100, height - 100);
}

function toggleIndividualStem(row, sound) {
  userStartAudio();

  if (!sound) return;

  if (!row.playing) {
    sound.play();
    row.playButton.html("Stop");
    row.playing = true;
  } else {
    sound.stop();
    row.playButton.html("Play");
    row.playing = false;
  }
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
    playAllButton.position(480, height - 100);
    stopAllButton.position(700, height - 100);

    nextButton.show();
    backButton.show();
    playAllButton.show();
    stopAllButton.show();
  }

  if (state === 2) {
    showGroup(drumUI);
    nextButton.position(300, height - 100);
    backButton.position(120, height - 100);
    playAllButton.position(480, height - 100);
    stopAllButton.position(700, height - 100);


    nextButton.show();
    backButton.show();
    playAllButton.show();
    stopAllButton.show();

  }

  if (state === 3) {
    showGroup(guitarUI);
    nextButton.position(300, height - 100);
    backButton.position(120, height - 100);
    playAllButton.position(480, height - 100);
    stopAllButton.position(700, height - 100);


    nextButton.show();
    backButton.show();
    playAllButton.show();
    stopAllButton.show();
  }

  if (state === 4) {
    backButton.position(120, height - 100);
    stopAllButton.position(width / 2 + 120, height - 100);
    backButton.show();
    playAllButton.show();
    stopAllButton.show();
  }
}

