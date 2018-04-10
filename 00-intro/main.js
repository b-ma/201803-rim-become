const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

function init() {
  const $frequency = document.querySelector('#frequency');
  const $gain = document.querySelector('#gain');

  const now = audioContext.currentTime;

  const env = audioContext.createGain();
  env.connect(audioContext.destination);
  env.gain.value = parseFloat($gain.value);

  const osc = audioContext.createOscillator();
  osc.connect(env);
  osc.frequency.value = parseFloat($frequency.value);
  osc.start(now);

  $frequency.addEventListener('input', function(event) {
    const now = audioContext.currentTime;
    const value = parseFloat($frequency.value);

    osc.frequency.cancelScheduledValues(now);
    osc.frequency.setValueAtTime(osc.frequency.value, now);
    osc.frequency.linearRampToValueAtTime(value, now + 0.01);
  });

  $gain.addEventListener('input', (event) => {
    const now = audioContext.currentTime;
    const value = parseFloat($gain.value);

    env.gain.cancelScheduledValues(now);
    env.gain.setValueAtTime(env.gain.value, now);
    env.gain.linearRampToValueAtTime(value, now + 0.01);
  });
}

window.addEventListener('load', init);


































