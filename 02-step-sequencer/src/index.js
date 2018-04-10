import * as loaders from 'waves-loaders';
import * as audio from 'waves-audio';
import SequenceEngine from './SequenceEngine';

const audioFiles = [
  'assets/clack.wav'
];
const loader = new loaders.AudioBufferLoader();

const numSteps = 8;
const score = new Array(numSteps);
// [[], [], []];

score.fill(0);

const updateScore = ($checkbox, index) => {
  return e => { score[index] = $checkbox.checked ? 1 : 0 };
}

const buildGui = () => {
  const $container = document.querySelector('#steps');

  for (let i = 0; i < numSteps; i++) {
    const $checkbox = document.createElement('input');
    $checkbox.type = 'checkbox';
    $container.appendChild($checkbox);

    $checkbox.addEventListener('change', updateScore($checkbox, i));
  }
}

// create gui
async function init() {
  const buffers = await loader.load(audioFiles);
  buildGui();
  //
  const sequenceEngine = new SequenceEngine(buffers[0], score);
  const scheduler = audio.getScheduler();

  const $bpm = document.querySelector('#bpm');
  $bpm.addEventListener('change', e => {
    const bpm = parseInt($bpm.value);
    sequenceEngine.bpm = bpm;
  });

  const $start = document.querySelector('#start');

  // start audio on mobiles - required for iOS
  $start.addEventListener('touchend', e => {
    if (!sequenceEngine.master)
      scheduler.add(sequenceEngine);
  });

  // start audio on desktops
  $start.addEventListener('mouseup', e => {
    if (!sequenceEngine.master)
      scheduler.add(sequenceEngine);
  });
}

window.addEventListener('load', init);

