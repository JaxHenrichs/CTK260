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
let startOverButton;
let recordButton;
let mixUI = [];

let customDialogOverlay;
let customDialogMessage;
let customDialogCloseButton;

let masterVolumeSlider;
let masterPitchSlider;
let masterGain;

let recorder, soundFile;
let isRecording = false;
let recordStartTime;

let font;
let boombox;
let boombox2;
let titleBg;
let instrumentBg;
let state = 0; // 0: Title, 1: Instructions, 2: Guitar, 3: Drums, 4: Piano, 5: Mix
let bbpiano, bbdrums, bbguitar,bbmaster,bbintro;

let totalMovement = 100;

const refWidth = 1536;
const refHeight = 703;

function scaleX(x) {
  return (x / refWidth) * width;
}

function scaleY(y) {
  return (y / refHeight) * height;
}

function preload() {
  pianoSounds[0] = loadSound("music/piano1.mp3");
  guitarSounds[0] = loadSound("music/guitar1.mp3");
  drumSounds[0] = loadSound("music/drums1.mp3");
  pianoSounds[1] = loadSound("music/piano2.wav");
  guitarSounds[1] = loadSound("music/guitar2.wav");
  drumSounds[1] = loadSound("music/drums2.wav");
  pianoSounds[2] = loadSound("music/piano3.wav");
  guitarSounds[2] = loadSound("music/guitar3.wav");
  drumSounds[2] = loadSound("music/drums3.wav");
  pianoSounds[3] = loadSound("music/piano4.mp3");
  guitarSounds[3] = loadSound("music/guitar4.mp3");
  drumSounds[3] = loadSound("music/drums4.mp3");
  pianoSounds[4] = loadSound("music/piano5.wav");
  guitarSounds[4] = loadSound("music/guitar5.wav");
  drumSounds[4] = loadSound("music/drums5.wav");
  pianoSounds[5] = loadSound("music/piano6.wav");
  guitarSounds[5] = loadSound("music/guitar6.wav");
  drumSounds[5] = loadSound("music/drums6.wav");

  font = loadFont("assets/Showpop.ttf");
  titleBg = loadImage("assets/testerfrontbg.jpg");
  instrumentBg = loadImage("assets/instrumentpage.jpg")
  masterbg = loadImage("assets/mastering.jpg");
  bbdrums = loadImage("assets/BBDrums.png");
  bbmaster = loadImage("assets/BBMaster.png");
  bbpiano = loadImage("assets/BBPiano.png");
  bbguitar = loadImage("assets/BBGuitar.png");
  bbintro = loadImage("assets/BBIntro.png")

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  nextButton = createButton("Begin");
  nextButton.size(160, 45);
  nextButton.mousePressed(nextScreen);

  backButton = createButton("Back");
  backButton.size(160, 45);
  backButton.mousePressed(prevScreen);

  playAllButton = createButton("Play All Stems");
  playAllButton.size(340, 45);
  playAllButton.mousePressed(playAllSelectedStems);

  stopAllButton = createButton("Stop All");
  stopAllButton.size(160, 45);
  stopAllButton.mousePressed(stopAllSounds);

  startOverButton = createButton("Start Over");
  startOverButton.size(160, 45);
  startOverButton.mousePressed(resetProject);

  recordButton = createButton("Record Mix");
  recordButton.size(160, 45);
  recordButton.mousePressed(toggleRecording);
  recordButton.hide();

  createStemRows(pianoUI, pianoSounds, "Piano");
  createStemRows(drumUI, drumSounds, "Drum");
  createStemRows(guitarUI, guitarSounds, "Guitar");

  masterGain = new p5.Gain();
  masterGain.connect();

  recorder = new p5.SoundRecorder();
  recorder.setInput(masterGain);
  soundFile = new p5.SoundFile();

  masterVolumeSlider = createSlider(0, 1, 0.7, 0.01);
  masterVolumeSlider.size(500);
  masterVolumeSlider.hide();

  masterPitchSlider = createSlider(0.5, 1.5, 1.0, 0.01);
  masterPitchSlider.size(180);
  masterPitchSlider.style('transform', 'rotate(-90deg)');
  masterPitchSlider.hide();

  textFont(font);
  createDialogElements();
  updateUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateUI();
}

function createDialogElements() {
  customDialogOverlay = createDiv();
  customDialogOverlay.id('customDialog');
  customDialogOverlay.addClass('custom-dialog-overlay');

  let dialogBox = createDiv();
  dialogBox.addClass('custom-dialog-box');
  dialogBox.parent(customDialogOverlay);

  let titleElement = createElement('h2', 'Bunny Box Studio');
  titleElement.parent(dialogBox);

  customDialogMessage = createP('');
  customDialogMessage.parent(dialogBox);
  customDialogMessage.addClass('custom-dialog-text');

  customDialogCloseButton = createButton('OK');
  customDialogCloseButton.addClass('custom-dialog-button');
  customDialogCloseButton.mousePressed(hideDialog);
  customDialogCloseButton.parent(dialogBox);

  customDialogOverlay.hide();
}

function showDialog(message) {
  if (!customDialogOverlay) return;
  customDialogMessage.html(message);
  customDialogOverlay.show();
}

function hideDialog() {
  if (!customDialogOverlay) return;
  customDialogOverlay.hide();
}

function draw() {
  if (state === 0) {
    image(titleBg, 0, 0, width, height);
    textSize(110);
    fill(255);
    text("Bunnybox\nStudio", width / 2, scaleY(200));
    textSize(18);
    text("Move your mouse or press any key to begin", width / 2, scaleY(370));
  }

  if (state === 1) {
    background("#333333");
    fill(255);
    textSize(64);
    text("Instructions", width / 2, scaleY(100));
    image(bbintro, scaleX(400), scaleY(100), scaleX(700), scaleY(700));

  }

  if (state === 2) {
    drawInstrumentPage("Drums", drumUI);
    image(bbdrums, scaleX(525), scaleY(50), scaleX(900), scaleY(900));
  }

  if (state === 3) {
    drawInstrumentPage("Piano", pianoUI);
    image(bbpiano, scaleX(525), scaleY(50), scaleX(900), scaleY(900));

  }

  if (state === 4) {
    drawInstrumentPage("Guitar", guitarUI);
    image(bbguitar, scaleX(525), scaleY(50), scaleX(900), scaleY(900));

  }

  if (state === 5) {
    image(masterbg, 0, 0, width, height);
    textSize(64);
    fill(255);
    text("Mixing Booth", width / 2, scaleY(80));
    image(bbmaster, scaleX(800), scaleY(-25), scaleX(651), scaleY(932));

    masterGain.amp(masterVolumeSlider.value());

    textSize(16);
    fill(255);
    text("Master Vol", masterVolumeSlider.x + masterVolumeSlider.width / 2, masterVolumeSlider.y - scaleY(15));
    text("Master Pitch", masterPitchSlider.x + scaleX(100), masterPitchSlider.y - scaleY(120));
    text("Track Vol", scaleX(415), scaleY(200));

    for (let row of mixUI) {
      row.gainNode.amp(row.volSlider.value());
      row.sound.rate(masterPitchSlider.value());
    }

    if (isRecording) {
      let duration = (millis() - recordStartTime) / 1000;
      fill(255);
      textSize(36);
      text("RECORDING: " + nf(duration, 0, 1) + "s", scaleX(400), height - scaleY(195));
    }

    if (getSelectedStems().length === 0) {
      textSize(36);
      text("No stems selected.", width / 2, height / 2);
    }
  }

  fill(255);
  textSize(14);
  textAlign(RIGHT, BOTTOM);
  // text("Browser size: " + windowWidth + " x " + windowHeight, width - 15, height - 15);
  textAlign(CENTER, CENTER);
}


function createStemRows(uiArray, soundArray, label) {
  for (let i = 0; i < 6; i++) {
    let row = { playing: false };
    row.playButton = createButton("Play");
    row.playButton.size(70, 40);
    row.playButton.mousePressed(() => toggleStem(row, soundArray, i));

    let names = ["Epic", "Funky", "Chill", "Jazzy", "Groovy", "Rock"];
    let name = names[i];

    row.label = createSpan(name + " " + label);
    row.label.addClass("label");

    row.checkbox = createCheckbox("");
    row.checkbox.addClass("checkbox");
    row.checkbox.changed(() => handleExclusiveCheck(uiArray, row));

    uiArray.push(row);
  }
}

function drawInstrumentPage(title, uiArray) {
  background("#333333");
  image(instrumentBg, 0, 0, width, height);
  textSize(64);
  fill(255);
  text(title, width / 2, scaleY(80));

  let startX = scaleX(120);
  let startY = scaleY(150);
  let spacing = scaleY(81);

  for (let i = 0; i < uiArray.length; i++) {
    let row = uiArray[i];
    row.playButton.position(startX, startY + i * spacing);
    row.label.position(startX + scaleX(90), startY + scaleY(10) + i * scaleY(79.5));
    row.checkbox.position(startX + scaleX(290), startY + scaleY(10) + i * scaleY(80));
  }
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
      let actualName = uiArray[i].label.html();
      selectedArray.push({ label: actualName, sound: soundArray[i] });
    }
  }
}

function handleExclusiveCheck(uiArray, selectedRow) {
  if (selectedRow.checkbox.checked()) {
    for (let row of uiArray) {
      if (row !== selectedRow) row.checkbox.checked(false);
    }
  }
}

function stopAllSounds() {
  let allSounds = [...pianoSounds, ...drumSounds, ...guitarSounds];
  allSounds.forEach(s => { if (s && s.isPlaying()) s.stop(); });
  [pianoUI, drumUI, guitarUI, mixUI].forEach(resetButtons);
}

function resetButtons(uiArray) {
  for (let row of uiArray) {
    row.playing = false;
    if (row.playButton) row.playButton.html("Play");
  }
}

function hideAllUI() {
  [nextButton, backButton, playAllButton, stopAllButton, startOverButton, masterVolumeSlider, masterPitchSlider, recordButton].forEach(b => b.hide());
  [pianoUI, drumUI, guitarUI].forEach(ui => ui.forEach(row => {
    row.playButton.hide(); row.label.hide(); row.checkbox.hide();
  }));
  mixUI.forEach(row => {
    row.playButton.hide();
    row.volSlider.hide();
    row.label.hide();
  });
  fill(255);
}

function nextScreen() {
  if (!selectionMade()) {
    showDialog("Please select one stem before continuing.");
    return;
  }
  stopAllSounds();
  if (state < 5) state++;
  updateUI();
}

function prevScreen() {
  stopAllSounds();
  if (state > 0) state--;
  updateUI();
}

function selectionMade() {
  if (state === 0 || state === 1) return true;
  if (state === 2) return isAnyChecked(drumUI);
  if (state === 3) return isAnyChecked(pianoUI);
  if (state === 4) return isAnyChecked(guitarUI);
  return true;
}

function isAnyChecked(uiArray) {
  return uiArray.some(row => row.checkbox.checked());
}

function playAllSelectedStems() {
  userStartAudio();
  for (let row of mixUI) {
    if (row.sound) {
      row.sound.stop();
      row.sound.play();
      row.playButton.html("Stop");
      row.playing = true;
    }
  }
}

function updateUI() {
  hideAllUI();

  if (state === 1) {
    nextButton.html("Next");
    nextButton.position(scaleX(300), height - scaleY(75));
    backButton.position(scaleX(120), height - scaleY(75));
    nextButton.show();
    backButton.show();
  }

  if (state === 2 || state === 3 || state === 4) {
    let currentUI = (state === 2) ? drumUI : (state === 3) ? pianoUI : guitarUI;
    currentUI.forEach(row => { row.playButton.show(); row.label.show(); row.checkbox.show(); });
    
    nextButton.html("Next");
    nextButton.position(scaleX(300), height - scaleY(75));
    backButton.position(scaleX(120), height - scaleY(75));
    stopAllButton.position(scaleX(480), height - scaleY(75));
    nextButton.show();
    backButton.show();
    stopAllButton.show();
  }

  if (state === 5) {
    buildMixingUI();
    backButton.position(scaleX(120), height - scaleY(75));
    nextButton.hide();
    playAllButton.position(scaleX(120), height - scaleY(160));
    stopAllButton.position(scaleX(480), height - scaleY(75));
    startOverButton.position(scaleX(300), height - scaleY(75));
    recordButton.position(scaleX(480), height - scaleY(160));

    masterVolumeSlider.position(scaleX(120), scaleY(475));
    masterPitchSlider.position(scaleX(500), scaleY(320));

    backButton.show();
    playAllButton.show();
    stopAllButton.show();
    startOverButton.show();
    recordButton.show();
    masterVolumeSlider.show();
    masterPitchSlider.show();
  }
}

function buildMixingUI() {
  mixUI.forEach(row => {
    row.playButton.remove();
    row.volSlider.remove();
    row.label.remove();
  });
  mixUI = [];

  let selected = getSelectedStems();
  let startX = scaleX(120);
  let startY = scaleY(220);
  let spacing = scaleY(80);

  for (let i = 0; i < selected.length; i++) {
    let row = { playing: false, sound: selected[i].sound };

    row.gainNode = new p5.Gain();
    row.gainNode.connect(masterGain);
    row.sound.disconnect();
    row.sound.connect(row.gainNode);

    row.playButton = createButton("Play");
    row.playButton.size(70, 40);
    row.playButton.position(startX, startY + i * spacing);
    row.playButton.mousePressed(() => toggleIndividualStem(row, row.sound));

    row.label = createSpan(selected[i].label);
    row.label.position(startX + scaleX(90), startY + scaleY(10) + i * spacing);
    row.label.style('font-family', 'Montserrat, sans-serif');
    row.label.style('font-weight', 'bold');

    row.volSlider = createSlider(0, 1, 0.8, 0.01);
    row.volSlider.position(startX + scaleX(240), startY + scaleY(10) + i * spacing);
    row.volSlider.size(scaleX(120));

    mixUI.push(row);
  }
}

function toggleRecording() {
  userStartAudio();
  if (!isRecording) {
    soundFile = new p5.SoundFile();
    recorder.record(soundFile);
    recordStartTime = millis();
    recordButton.html("Stop & Save");
    recordButton.style('background-color', '#ff4d4d');
    isRecording = true;
  } else {
    recorder.stop();
    recordButton.html("Record Mix");
    recordButton.style('background-color', '');
    isRecording = false;

    setTimeout(() => {
      if (soundFile.duration() > 0) {
        saveSound(soundFile, 'MyMix.wav');
      } else {
        showDialog("No audio was recorded. Please make sure to jam out and play some stems while recording.");
      }
    }, 100);
  }
}

function resetProject() {
  stopAllSounds();
  [pianoUI, drumUI, guitarUI].forEach(ui => ui.forEach(row => row.checkbox.checked(false)));
  state = 0;
  updateUI();
}

function mouseMoved() {
  if (state === 0) {
    let d = dist(mouseX, mouseY, pmouseX, pmouseY);
    totalMovement += d;
    if (totalMovement > 1000) {
      nextScreen();
      totalMovement = 0;
    }
  }
}

// function mouseClicked(){
// if (state === 0) {
//   nextScreen();  
// }


  function keyPressed() {
  if (state === 0) {
    nextScreen();
  }

  if (key === 'd' || key === 'D') {
    [pianoUI, drumUI, guitarUI].forEach(ui => ui.forEach(row => row.checkbox.checked(false)));
    if (pianoUI[1]) pianoUI[1].checkbox.checked(true);
    if (drumUI[1]) drumUI[1].checkbox.checked(true);
    if (guitarUI[1]) guitarUI[1].checkbox.checked(true);
    state = 5;
    updateUI();
  }

  if (key === 'r' || key === 'R') {
    location.reload();
  }
}