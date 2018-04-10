
class TriggerSynth {
  constructor(audioContext, buffers) {
    this.audioContext = audioContext;
    this.buffers = buffers;
  }

  trigger(index = 0) {
    const buffer = this.buffers[index];

    const delay = this.audioContext.createDelay();
    delay.delayTime.value = Math.random() * 0.3;

    const feedback = this.audioContext.createGain();
    feedback.gain.value = 0.9;

    const bufferSrc = this.audioContext.createBufferSource();
    bufferSrc.buffer = buffer;

    bufferSrc.connect(this.audioContext.destination);
    bufferSrc.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    feedback.connect(this.audioContext.destination);

    bufferSrc.start();
  }
}

export default TriggerSynth;
