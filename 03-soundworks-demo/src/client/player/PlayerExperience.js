import * as soundworks from 'soundworks/client';

const audioContext = soundworks.audioContext;
const client = soundworks.client;

const template = `
  <div id="click-zone" class="fit-container flex-middle">
    <p><%= click %></p>
  </div>
`;

const model = {
  click: 'Click Me!'
};

class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain) {
    super();

    this.platform = this.require('platform', { features: ['web-audio'] });
    this.checkin = this.require('checkin', { showDialog: false });
    this.audioBufferManager = this.require('audio-buffer-manager', {
      assetsDomain: assetsDomain,
      directories: { path: 'sounds', recursive: true },
    });
    this.sync = this.require('sync');

    this.triggerEcho = this.triggerEcho.bind(this);
  }

  start() {
    super.start();

    const eventName = client.platform.isMobile ? 'touchstart' : 'mousedown';
    // 'touchstart #click-zone' || 'mousedown #click-zone'
    const str = `${eventName} #click-zone`;

    this.view = new soundworks.View(template, model, {
      [str]: this.triggerEcho,
    }, {
      id: 'player-experience',
    });

    this.receive('echo', echoParams => {
      this.playSound(echoParams);
      this.forwardEcho(echoParams);
    });

    this.show();
  }

  triggerEcho() {
    const echoParams = {
      index: 0,
      source: client.index,
      gain: 1,
      time: this.sync.getSyncTime(),
    };

    this.playSound(echoParams);
    this.forwardEcho(echoParams);
  }

  playSound(echoParams) {
    const buffer = this.audioBufferManager.data.clicks[echoParams.source];

    const volume = audioContext.createGain();
    volume.connect(audioContext.destination);
    volume.gain.value = echoParams.gain;

    const source = audioContext.createBufferSource();
    source.connect(volume);
    source.buffer = buffer;
    source.playbackRate.value = 1 + echoParams.index / 10;

    const audioTime = this.sync.getAudioTime(echoParams.time);
    source.start(audioTime);
  }

  forwardEcho(echoParams) {
    // update params
    echoParams.index = echoParams.index + 1;
    echoParams.gain = echoParams.gain * 0.9;
    echoParams.time = echoParams.time + 0.05;

    // send to peers
    if (echoParams.gain > 0.001) // -60dB
      this.send('echo', echoParams);
  }
}

export default PlayerExperience;
