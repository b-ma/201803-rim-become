import * as loaders from 'waves-loaders';
import * as blocks from 'waves-blocks';
import TriggerSynth from './TriggerSynth';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const files = [
  './assets/clack.wav',
  './assets/click.wav',
  './assets/cluck.wav',
];

const loader = new loaders.AudioBufferLoader();
const buffersPromise = loader.load(files);

console.log('there');

buffersPromise.then(buffers => {
  console.log('here');
  const synth = new TriggerSynth(audioContext, buffers);

  // display the currently played audio buffer
  const block = new blocks.core.Block({
    player: blocks.player.SimplePlayer,
    container: '#waveform',
    sizing: 'manual',
    width: 300,
    height: 100,
  });

  const waveform = new blocks.module.Waveform();
  const zoom = new blocks.module.Zoom();

  block.add(waveform, 1);
  block.add(zoom, 2);

  // button for each soundfile
  files.forEach((filename, index) => {
    const $btn = document.createElement('button');
    $btn.textContent = filename;
    document.body.appendChild($btn);

    $btn.addEventListener('click', e => {
      synth.trigger(index);

      block.setTrack(buffers[index], {});
    });
  });

  // button that triggers a random soundfile
  const $btn = document.createElement('button');
  $btn.textContent = 'random';
  document.body.appendChild($btn);

  $btn.addEventListener('click', e => {
    const index = Math.floor(Math.random() * buffers.length);
    synth.trigger(index);

    block.setTrack(buffers[index], {});
  });

}).catch(err => console.error(err.stack));
