import * as audio from 'waves-audio';

const audioContext = audio.audioContext;

class SequenceEngine extends audio.TimeEngine {
  constructor(buffer, score, bpm = 180) {
    super();

    this.buffer = buffer;
    this.score = score;

    this._period;
    this._step = 0;

    // initialize period
    this.bpm = bpm;
  }

  set bpm(bpm) {
    this._period = 60 / bpm;
    console.log('period', this._period);
  }

  advanceTime(audioTime) {
    if (this.score[this._step] === 1) {
      const src = audioContext.createBufferSource();

      src.connect(audioContext.destination);
      src.buffer = this.buffer;
      src.start(audioTime); // start at scheduled time
    }

    this._step = (this._step + 1) % this.score.length;

    return audioTime + this._period;
  }
}

export default SequenceEngine;
