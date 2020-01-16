

export default class Sound {
  constructor(audioFile) {
    this.audio = new Audio(audioFile);
  }

  play() {
      this.audio.play();
  }
}

export const Sounds = {
    crash500ms: new Sound('assets/audio/crash_500ms.mp3'),
    crash250ms: new Sound('assets/audio/crash_250ms.mp3')
};

Object.freeze(Sounds);
